import React from 'react';

/**
 * Universal Cold Mirror Range Slider
 * Supports gradient filled track (fill=true) and neutral track (fill=false for center/bipolar adjust).
 */
export function Slider({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  fill = true,
  fillColor = '#e63946',
  disabled = false,
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const trackStyle = fill && !disabled
    ? {
        background: `linear-gradient(to right, ${fillColor} ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`,
      }
    : {
        background: 'var(--color-brand-60)',
      };

  const handleChange = (e) => {
    const val = parseFloat(e.target.value);
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      style={trackStyle}
      className={`w-full h-2 rounded-full appearance-none cursor-pointer accent-brand-30 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    />
  );
}

export default Slider;
