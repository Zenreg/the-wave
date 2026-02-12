interface BreathingOrbProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'indigo' | 'amber';
}

const sizes = {
  sm: 'w-48 h-48',
  md: 'w-72 h-72',
  lg: 'w-96 h-96',
};

const colors = {
  indigo: 'from-indigo-500/30 via-indigo-400/10 to-transparent',
  amber: 'from-amber-400/30 via-amber-300/10 to-transparent',
};

export default function BreathingOrb({ size = 'md', color = 'indigo' }: BreathingOrbProps) {
  return (
    <div
      className={`absolute rounded-full bg-gradient-radial ${sizes[size]} ${colors[color]} animate-breathe blur-3xl pointer-events-none`}
      style={{
        background: `radial-gradient(circle, ${color === 'indigo' ? 'rgba(129,140,248,0.3)' : 'rgba(251,191,36,0.3)'}, transparent)`,
      }}
      aria-hidden="true"
    />
  );
}
