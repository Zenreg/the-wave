import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { STORAGE_KEYS } from '../types';
import type { GeoPoint, MapDot, ParticipationBroadcast } from '../types';

function getTodayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getLocalTzOffset(): number {
  return -Math.round(new Date().getTimezoneOffset() / 60);
}

let dotCounter = 0;

export function useParticipation() {
  const todayKey = getTodayKey();
  const tzOffset = getLocalTzOffset();

  const [totalCount, setTotalCount] = useState(0);
  const [myTzCount, setMyTzCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasParticipatedToday] = useState(() =>
    localStorage.getItem(STORAGE_KEYS.PARTICIPATED_PREFIX + todayKey) === '1'
  );
  const [dots, setDots] = useState<MapDot[]>([]);

  const addDot = useCallback((point: GeoPoint) => {
    const dot: MapDot = {
      id: `dot-${++dotCounter}`,
      point,
      timestamp: Date.now(),
    };
    setDots(prev => [...prev, dot]);
  }, []);

  // Fetch initial counts
  useEffect(() => {
    async function fetchCounts() {
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const [totalRes, tzRes] = await Promise.all([
          supabase.rpc('get_participation_count', { target_date: todayKey }),
          supabase.rpc('get_participation_count', { target_date: todayKey, target_tz: tzOffset }),
        ]);

        if (totalRes.data != null) setTotalCount(Number(totalRes.data));
        if (tzRes.data != null) setMyTzCount(Number(tzRes.data));
      } catch {
        // Silently fail — counts stay at 0
      }
      setIsLoading(false);
    }

    fetchCounts();
  }, [todayKey, tzOffset]);

  // Subscribe to realtime broadcast
  useEffect(() => {
    if (!supabase) return;

    const channel = supabase.channel('now:participations')
      .on('broadcast', { event: 'participation' }, (payload) => {
        const data = payload.payload as ParticipationBroadcast;
        setTotalCount(prev => prev + 1);
        if (data.tzOffset === tzOffset) {
          setMyTzCount(prev => prev + 1);
        }
        // Add dot to map if coordinates are present
        if (data.point) {
          addDot(data.point);
        }
      })
      .subscribe();

    return () => {
      supabase!.removeChannel(channel);
    };
  }, [todayKey, tzOffset, addDot]);

  // Submit participation
  const submit = useCallback(async (point?: GeoPoint | null) => {
    localStorage.setItem(STORAGE_KEYS.PARTICIPATED_PREFIX + todayKey, '1');

    // Add own dot immediately
    if (point) {
      addDot(point);
    }

    if (!supabase) {
      setTotalCount(prev => prev + 1);
      setMyTzCount(prev => prev + 1);
      return;
    }

    try {
      await supabase.from('participations').insert({
        date: todayKey,
        tz_offset: tzOffset,
      });

      // Broadcast to other clients (with coordinates)
      const channel = supabase.channel('now:participations');
      await channel.send({
        type: 'broadcast',
        event: 'participation',
        payload: { tzOffset, date: todayKey, point: point ?? undefined } satisfies ParticipationBroadcast,
      });
      supabase.removeChannel(channel);
    } catch {
      // Silently fail — participation stored in localStorage
    }

    setTotalCount(prev => prev + 1);
    setMyTzCount(prev => prev + 1);
  }, [todayKey, tzOffset, addDot]);

  return { submit, totalCount, myTzCount, isLoading, hasParticipatedToday, dots };
}
