import React from 'react';

const colorStyles = {
  brand: {
    badge: 'border-brand-30/40 text-brand-10 bg-brand-30/10',
    icon: 'text-brand-30',
    bar: 'bg-brand-30',
    beacon: 'bg-brand-30',
  },
  green: {
    badge: 'border-accent-green/40 text-brand-10 bg-accent-green/10',
    icon: 'text-accent-green',
    bar: 'bg-accent-green',
    beacon: 'bg-accent-green',
  },
  purple: {
    badge: 'border-accent-purple/40 text-brand-10 bg-accent-purple/10',
    icon: 'text-accent-purple',
    bar: 'bg-accent-purple',
    beacon: 'bg-accent-purple',
  },
  blue: {
    badge: 'border-accent-blue/40 text-brand-10 bg-accent-blue/10',
    icon: 'text-accent-blue',
    bar: 'bg-accent-blue',
    beacon: 'bg-accent-blue',
  },
  yellow: {
    badge: 'border-accent-yellow/40 text-brand-10 bg-accent-yellow/10',
    icon: 'text-accent-yellow',
    bar: 'bg-accent-yellow',
    beacon: 'bg-accent-yellow',
  },
  red: {
    badge: 'border-accent-red/40 text-brand-10 bg-accent-red/10',
    icon: 'text-accent-red',
    bar: 'bg-accent-red',
    beacon: 'bg-accent-red',
  },
  neutral: {
    badge: 'border-white/15 text-brand-10 bg-white/5',
    icon: 'text-white/70',
    bar: 'bg-white/60',
    beacon: 'bg-white/60',
  },
};

/**
 * StatPill / MetricBadge Component
 * Compact, self-contained inline metric pill combining icon, label, tabular value,
 * and optional micro-progress bar or status beacon for high-density layouts.
 * 
 * @param {Object} props
 * @param {React.ElementType} [props.icon] Lucide icon component
 * @param {string} [props.label] Descriptive parameter label
 * @param {string|number} props.value Numeric or string value
 * @param {string} [props.unit] Value unit suffix (e.g. 'vCPU', 'GB', '%')
 * @param {number} [props.progress] Optional percentage value (0-100) to render an inline micro-bar
 * @param {'brand'|'green'|'purple'|'blue'|'yellow'|'red'|'neutral'} [props.color='neutral']
 * @param {boolean} [props.beacon=false] Whether to display a pulsing status beacon
 * @param {'sm'|'md'} [props.size='md'] Height density scale ('sm' = 24px, 'md' = 28px)
 * @param {string} [props.className='']
 */
export function StatPill({
  icon: Icon,
  label,
  value,
  unit,
  progress,
  color = 'neutral',
  beacon = false,
  size = 'md',
  className = '',
}) {
  const styles = colorStyles[color] || colorStyles.neutral;

  const sizeClass = size === 'sm' 
    ? 'h-6 px-2 text-[10px] gap-1.5' 
    : 'h-7 px-2.5 text-xs gap-2';

  return (
    <div
      className={`inline-flex items-center rounded-lg border font-sans select-none backdrop-blur-md transition-all shadow-sm ${styles.badge} ${sizeClass} ${className}`}
    >
      {/* Optional Pulsing Beacon */}
      {beacon && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${styles.beacon}`} />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${styles.beacon}`} />
        </span>
      )}

      {/* Optional Icon */}
      {Icon && <Icon className={`shrink-0 ${size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} ${styles.icon}`} />}

      {/* Label */}
      {label && (
        <span className="text-white/60 font-medium whitespace-nowrap">
          {label}:
        </span>
      )}

      {/* Value & Unit */}
      <span className="font-mono font-bold text-brand-10 tracking-tight whitespace-nowrap flex items-baseline gap-0.5">
        <span>{value}</span>
        {unit && <span className="text-[10px] text-white/50 font-normal">{unit}</span>}
      </span>

      {/* Optional Micro Progress Bar */}
      {typeof progress === 'number' && (
        <div className="w-10 h-1.5 bg-black/40 rounded-full overflow-hidden ml-0.5 shrink-0">
          <div
            className={`h-full rounded-full transition-all duration-300 ${styles.bar}`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default StatPill;
