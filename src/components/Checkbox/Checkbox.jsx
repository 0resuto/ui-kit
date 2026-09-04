import React from 'react';
import { Check } from 'lucide-react';

/**
 * Standard Branded Checkbox Component
 * Custom frosted container, brand red fill on active, subtle glow, and full accessibility.
 */
export const Checkbox = React.forwardRef(function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
  ...props
}, ref) {
  const isControlled = checked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(Boolean(defaultChecked));
  const isChecked = isControlled ? Boolean(checked) : uncontrolledChecked;

  const handleChange = (e) => {
    if (disabled) return;
    if (!isControlled) {
      setUncontrolledChecked(e.target.checked);
    }
    if (onChange) {
      onChange(e.target.checked, e);
    }
  };

  const checkedProps = isControlled
    ? { checked: isChecked }
    : (defaultChecked !== undefined ? { defaultChecked } : {});

  return (
    <label
      className={`inline-flex items-start gap-2.5 cursor-pointer group select-none ${
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
    >
      <div className="relative flex items-center justify-center flex-none mt-0.5">
        <input
          ref={ref}
          type="checkbox"
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          {...checkedProps}
          {...props}
        />
        <div
          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all duration-150 ${
            isChecked
              ? 'bg-brand-30 border-brand-30 shadow-[0_0_8px_rgba(230,57,70,0.45)]'
              : 'bg-brand-60/80 border-brand-60/90 group-hover:border-brand-30/60'
          }`}
        >
          {isChecked && (
            <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
          )}
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && (
            <span className="text-xs font-semibold text-brand-10/90 group-hover:text-brand-10 transition-colors">
              {label}
            </span>
          )}
          {description && (
            <span className="text-[10px] text-white/40 leading-tight">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
