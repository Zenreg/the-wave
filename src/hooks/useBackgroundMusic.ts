import { useEffect, useRef, useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../types';

const VOLUME = 0.12;

export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(() =>
    localStorage.getItem(STORAGE_KEYS.AUDIO_MUTED) === '1'
  );
  const [playing, setPlaying] = useState(false);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio('/audio/background.mp3');
    audio.loop = true;
    audio.volume = VOLUME;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Try to start on every user interaction until it works
    const tryStart = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setPlaying(true);
          cleanup();
        }).catch(() => {});
      }
    };

    const cleanup = () => {
      document.removeEventListener('click', tryStart, true);
      document.removeEventListener('touchstart', tryStart, true);
      document.removeEventListener('keydown', tryStart, true);
    };

    // Listen on capture phase to catch clicks before anything else
    document.addEventListener('click', tryStart, true);
    document.addEventListener('touchstart', tryStart, true);
    document.addEventListener('keydown', tryStart, true);

    // Also try immediately (won't work without gesture, but worth trying)
    tryStart();

    return () => {
      cleanup();
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Sync muted state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
    localStorage.setItem(STORAGE_KEYS.AUDIO_MUTED, muted ? '1' : '0');
  }, [muted]);

  const toggleMute = useCallback(() => {
    setMuted(m => !m);
  }, []);

  return { muted, toggleMute, playing };
}
