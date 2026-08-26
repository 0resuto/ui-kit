import React from 'react';

const GLOW_COLORS = {
  'brand-30': 'rgba(230, 57, 70, 0.9)',
  'accent-green': 'rgba(16, 185, 129, 0.9)',
  'accent-purple': 'rgba(168, 85, 247, 0.9)',
  'accent-red': 'rgba(239, 68, 68, 0.9)',
  'accent-yellow': 'rgba(245, 158, 11, 0.9)',
  'accent-blue': 'rgba(56, 189, 248, 0.9)',
};

const COLOR_BG_CLASSES = {
  'brand-30': 'bg-brand-30',
  'accent-green': 'bg-accent-green',
  'accent-purple': 'bg-accent-purple',
  'accent-red': 'bg-accent-red',
  'accent-yellow': 'bg-accent-yellow',
  'accent-blue': 'bg-accent-blue',
};

const SIZE_MAP = {
  sm: '5px',
  md: '10px',
  lg: '16px',
};

/**
 * Universal Cold Mirror ProgressBar Component
 * Supports dynamic matching glow, pulsing effect, horizontal/vertical modes, and custom thresholds.
 */
export function ProgressBar({
  value = 0,
  max = 100,
  color = 'brand-30',
  size = 'md',
  glow = false,
  pulse = false,
  orientation = 'horizontal',
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const heightPx = typeof size === 'number' ? `${size}px` : SIZE_MAP[size] || '10px';

  // Resolved background color class and glow RGBA
  const bgClass = COLOR_BG_CLASSES[color] || (color.startsWith('bg-') ? color : `bg-${color}`);
  const glowRgba = GLOW_COLORS[color] || GLOW_COLORS[color.replace('bg-', '')] || 'rgba(230, 57, 70, 0.9)';

  const fillStyle = {
    [orientation === 'horizontal' ? 'width' : 'height']: `${percentage}%`,
    boxShadow: glow ? `0 0 16px ${glowRgba}` : 'none',
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={`bg-brand-60/80 rounded-lg overflow-hidden border border-white/5 p-0 flex flex-col justify-end ${className}`}
        style={{ width: heightPx, height: '100%' }}
      >
        <div
          className={`w-full rounded transition-all duration-100 ${bgClass} ${
            pulse ? 'animate-pulse-glow' : ''
          }`}
          style={fillStyle}
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-brand-60/80 rounded-full overflow-hidden border border-white/5 p-0 ${className}`}
      style={{ height: heightPx }}
    >
      <div
        className={`h-full rounded-full transition-all duration-100 ${bgClass} ${
          pulse ? 'animate-pulse-glow' : ''
        }`}
        style={fillStyle}
      />
    </div>
  );
}

export default ProgressBar;
