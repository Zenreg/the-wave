import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')!;
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Encode VAPID JWT pour Web Push
async function createVapidJwt(audience: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'ES256', typ: 'JWT' }))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  const now = Math.floor(Date.now() / 1000);
  const payload = btoa(JSON.stringify({
    aud: audience,
    exp: now + 86400,
    sub: 'mailto:contact@30jourspourchanger.com',
  })).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  const input = new TextEncoder().encode(`${header}.${payload}`);

  // Importer la clé privée VAPID
  const rawKey = Uint8Array.from(atob(VAPID_PRIVATE_KEY.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey('raw', rawKey, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, input);

  const signature = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  return `${header}.${payload}.${signature}`;
}

async function sendPush(sub: { endpoint: string; p256dh: string; auth: string }, payload: string): Promise<number> {
  const url = new URL(sub.endpoint);
  const jwt = await createVapidJwt(url.origin);

  const res = await fetch(sub.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Encoding': 'aes128gcm',
      'Authorization': `vapid t=${jwt}, k=${VAPID_PUBLIC_KEY}`,
      'TTL': '86400',
    },
    body: new TextEncoder().encode(payload),
  });

  return res.status;
}

Deno.serve(async (req) => {
  // Vérification d'auth : accepte service_role OU anon key (pour pg_cron)
  const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
  const authHeader = req.headers.get('Authorization');
  if (authHeader !== `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` && authHeader !== `Bearer ${SUPABASE_ANON_KEY}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Trouver les abonnements dans les fuseaux où il est ~19h30
  const nowUtcHour = new Date().getUTCHours();
  const nowUtcMin = new Date().getUTCMinutes();
  // On veut notifier à 19h30 locale → offset = 19.5 - heure UTC actuelle
  const targetOffset = 19.5 - nowUtcHour - nowUtcMin / 60;
  // Tolérance de +/- 0.5h (exécution toutes les heures)
  const minOffset = Math.floor(targetOffset - 0.5);
  const maxOffset = Math.ceil(targetOffset + 0.5);

  const { data: subscriptions, error } = await supabase
    .from('push_subscriptions')
    .select('id, endpoint, p256dh, auth')
    .gte('tz_offset', minOffset)
    .lte('tz_offset', maxOffset);

  if (error || !subscriptions?.length) {
    return new Response(JSON.stringify({ sent: 0, error: error?.message }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const payload = JSON.stringify({
    title: 'TheWave',
    body: 'La hola commence bientôt ! 🌊',
  });

  let sent = 0;
  const toDelete: string[] = [];

  for (const sub of subscriptions) {
    const status = await sendPush(sub, payload);
    if (status === 201 || status === 200) {
      sent++;
    } else if (status === 404 || status === 410) {
      toDelete.push(sub.id);
    }
  }

  // Supprimer les abonnements invalides
  if (toDelete.length > 0) {
    await supabase.from('push_subscriptions').delete().in('id', toDelete);
  }

  return new Response(JSON.stringify({ sent, deleted: toDelete.length, total: subscriptions.length }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
