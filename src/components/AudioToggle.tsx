interface AudioToggleProps {
  muted: boolean;
  onToggle: () => void;
}

export default function AudioToggle({ muted, onToggle }: AudioToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="text-sm transition-colors text-white/30 hover:text-white/50"
      aria-label={muted ? 'Activer la musique' : 'Couper la musique'}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}
