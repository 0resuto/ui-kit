import React from 'react';

/**
 * Universal Cold Mirror Range Slider
 * Supports gradient filled track (fill=true) and neutral track (fill=false for center/bipolar adjust).
 *
 * @param {Object} props
 * @param {number} [props.value]
 * @param {number} [props.defaultValue]
 * @param {(value: number, event?: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange]
 * @param {number} [props.min=0]
 * @param {number} [props.max=100]
 * @param {number} [props.step=1]
 * @param {boolean} [props.fill=true]
 * @param {string} [props.fillColor='var(--color-brand-30)']
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className='']
 * @param {string} [props.name]
 */
export const Slider = React.forwardRef(function Slider({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  fill = true,
  fillColor = 'var(--color-brand-30)',
  disabled = false,
  className = '',
  name,
  style,
  ...props
}, ref) {
  const isControlled = value !== undefined;
  const [uncontrolledVal, setUncontrolledVal] = React.useState(
    defaultValue !== undefined && !isNaN(defaultValue) ? defaultValue : min
  );
  const currentVal = isControlled ? value : uncontrolledVal;

  const numericVal = typeof currentVal === 'number' && !isNaN(currentVal)
    ? currentVal
    : (typeof defaultValue === 'number' && !isNaN(defaultValue) ? defaultValue : min);

  const range = max - min;
  const rawPercentage = range <= 0 ? 0 : ((numericVal - min) / range) * 100;
  const percentage = isNaN(rawPercentage) ? 0 : Math.min(100, Math.max(0, rawPercentage));

  const trackStyle = fill && !disabled
    ? {
        background: `linear-gradient(to right, ${fillColor} ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`,
      }
    : {
        background: 'var(--color-brand-60)',
      };

  const handleChange = (e) => {
    const val = parseFloat(e.target.value);
    const resolvedVal = isNaN(val) ? min : val;
    if (!isControlled) {
      setUncontrolledVal(resolvedVal);
    }
    if (onChange) {
      onChange(resolvedVal, e);
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
      value={numericVal}
      onChange={handleChange}
      disabled={disabled}
      role="slider"
      aria-valuenow={numericVal}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-orientation="horizontal"
      style={{ ...trackStyle, ...style }}
      className={`w-full h-2 rounded-full appearance-none cursor-pointer accent-brand-30 focus-visible:ring-2 focus-visible:ring-brand-30 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
});

Slider.displayName = 'Slider';

export default Slider;
