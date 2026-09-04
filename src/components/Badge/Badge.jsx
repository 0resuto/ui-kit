import React from 'react';

const COLOR_STYLES = {
  brand: {
    active: 'bg-brand-30/20 text-brand-10 border-brand-30/50 shadow-sm',
    beacon: 'bg-brand-30',
  },
  green: {
    active: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/50 shadow-sm',
    beacon: 'bg-emerald-500',
  },
  purple: {
    active: 'bg-purple-500/20 text-purple-200 border-purple-500/50 shadow-sm',
    beacon: 'bg-purple-500',
  },
  red: {
    active: 'bg-red-500/15 text-brand-10 border-red-500/30 shadow-sm',
    beacon: 'bg-red-500',
  },
  yellow: {
    active: 'bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-sm',
    beacon: 'bg-amber-500',
  },
  blue: {
    active: 'bg-sky-500/20 text-sky-200 border-sky-500/50 shadow-sm',
    beacon: 'bg-sky-500',
  },
  neutral: {
    active: 'bg-brand-60 border-brand-60 text-brand-10/80',
    beacon: 'bg-brand-10/40',
  },
};

/**
 * Unified Cold Mirror Status Badge Component
 * Text is always brand-white on active states. Clean design with optional beacon dot.
 */
export function Badge({
  color = 'brand',
  active = true,
  beacon = false,
  children,
  className = '',
  ...props
}) {
  const palette = COLOR_STYLES[color] || COLOR_STYLES.brand;

  const styleClass = active
    ? palette.active
    : 'bg-brand-60/50 text-brand-10/40 border-brand-60/80';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border transition-colors ${styleClass} ${className}`}
      {...props}
    >
      {beacon && active && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${palette.beacon}`} />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${palette.beacon}`} />
        </span>
      )}
      {children}
    </span>
  );
}

export default Badge;
