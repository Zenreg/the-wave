# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# The Wave — Application de synchronisation humaine mondiale

## Concept
Chaque jour à 20h locale, tous les utilisateurs reçoivent UNE seule action de 60 secondes. Après participation, l'app montre combien de personnes l'ont fait + une carte monde avec une vague lumineuse. Pas de profil, pas de like, pas de commentaire.

## Stack
- **Frontend** : React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS 3
- **Backend** : Supabase (PostgreSQL, Realtime Broadcast)
- **Tests** : Vitest (23 tests)
- **Pas de React Router** — machine à états linéaire (5 écrans)

## Commandes
```bash
npm run dev          # Serveur dev avec HMR
npm run build        # tsc -b && vite build
npm test             # vitest run
npm run test:watch   # vitest en mode watch
npm run lint         # eslint .
npm run type-check   # tsc --noEmit

# Un seul fichier de test :
npx vitest run src/__tests__/useCountdown.test.ts
```

## Architecture : Machine à états (5 écrans)
```
landing → countdown → action → participating → result
```

- **LandingScreen** : Hero + tagline + bouton Entrer
- **CountdownScreen** : Timer vers 20h locale + teaser action du jour
- **ActionScreen** : Action + bouton "Je le fais" + timer 60s (CircularTimer)
- **Participating** : Même composant, état visuel différent (orbe ambré)
- **ResultScreen** : Compteur animé + carte monde avec vague timezone

`App.tsx` orchestre via `useNowState()` — pas de routeur.

## Fichiers clés
```
src/
├── App.tsx                     # Orchestrateur machine à états
├── types.ts                    # Types + STORAGE_KEYS
├── lib/supabase.ts             # Client Supabase (nullable si pas de .env)
├── data/fallbackActions.ts     # Actions de secours si Supabase down
├── hooks/
│   ├── useNowState.ts          # Quel écran afficher (localStorage-aware)
│   ├── useCountdown.ts         # Countdown jusqu'à 20h locale
│   ├── useActionTimer.ts       # Timer 60 secondes
│   ├── useTimezoneWave.ts      # Calcul état des 27 bandes timezone
│   ├── useDailyAction.ts       # Fetch action du jour (Supabase RPC)
│   └── useParticipation.ts     # Insert + Broadcast + subscribe
└── components/
    ├── WorldMap.tsx             # SVG carte + TimezoneWave overlay
    ├── TimezoneWave.tsx         # 27 bandes animées (UTC-12 à +14)
    ├── ParticipantCounter.tsx   # Compteur animé (ease-out-cubic via rAF)
    ├── CircularTimer.tsx        # Ring SVG progress 60s
    └── BreathingOrb.tsx         # Orbe ambiant pulsant (CSS-only)
```

## Patterns clés

### Synchronisation : 20h locale (rolling)
L'action se déclenche à 20h dans chaque fuseau horaire → crée une vague physique. `useTimezoneWave` calcule l'état de 27 bandes (UTC-12 à +14) : `future`, `active`, ou `done`.

### Participation anonyme
Pas d'auth. Insert anonyme dans Supabase + `localStorage` flag. Compteur realtime via Supabase Broadcast (pas Postgres CDC — plus léger à grande échelle).

### Supabase nullable
`lib/supabase.ts` retourne `null` si les vars d'env ne sont pas définies. Tous les hooks gèrent gracieusement `supabase === null` avec des fallbacks locaux.

### localStorage
Toutes les clés dans `STORAGE_KEYS` (`types.ts`). Préfixe `now_participated_YYYY-MM-DD` pour la participation quotidienne.

## Supabase Schema
- `daily_actions` (date TEXT PK format 'MM-DD', action_text, action_text_en)
- `participations` (id, participated_at, date 'YYYY-MM-DD', tz_offset)
- RPC : `get_participation_count(date, tz?)`, `get_participation_by_timezone(date)`, `get_today_action(mm-dd)`
- RLS : SELECT public sur actions, INSERT-only sur participations

## Variables d'environnement
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

## Conventions
- **Langue** : app en français, commits en français
- **Commits** : style descriptif court, ex: `Fix: description`
- **Design** : ultra-minimaliste, méditatif, fond slate-950, accents indigo/amber
- **A11y** : ARIA, focus-visible, prefers-reduced-motion
- **Pas de console.log** en production (strippé par Vite)
