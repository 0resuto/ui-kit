import React from 'react';

/**
 * Universal Cold Mirror Range Slider
 * Supports gradient filled track (fill=true) and neutral track (fill=false for center/bipolar adjust).
 */
export const Slider = React.forwardRef(function Slider({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  fill = true,
  fillColor = '#e63946',
  disabled = false,
  className = '',
  name,
  ...props
}, ref) {
  const isControlled = value !== undefined;
  const [uncontrolledVal, setUncontrolledVal] = React.useState(defaultValue !== undefined ? defaultValue : min);
  const currentVal = isControlled ? value : uncontrolledVal;

  const range = max - min;
  const percentage = range <= 0 ? 0 : Math.min(100, Math.max(0, ((currentVal - min) / range) * 100));

  const trackStyle = fill && !disabled
    ? {
        background: `linear-gradient(to right, ${fillColor} ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`,
      }
    : {
        background: 'var(--color-brand-60)',
      };

  const handleChange = (e) => {
    const val = parseFloat(e.target.value);
    if (!isControlled) {
      setUncontrolledVal(val);
    }
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <input
      ref={ref}
      type="range"
      name={name}
      min={min}
      max={max}
      step={step}
      value={currentVal}
      onChange={handleChange}
      disabled={disabled}
      style={trackStyle}
      className={`w-full h-2 rounded-full appearance-none cursor-pointer accent-brand-30 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
});

Slider.displayName = 'Slider';

export default Slider;
