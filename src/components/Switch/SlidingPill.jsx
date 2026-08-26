import React from 'react';

/**
 * N-Position Sliding Capsule Switch (Sliding Pill)
 * Supports 2 or more options with fluid animated capsule thumb indicator.
 * 
 * @param {Object} props
 * @param {Array<{value: any, label: string}>|Array<string>} [props.options]
 * @param {any} props.value
 * @param {(value: any) => void} [props.onChange]
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.size='md'] - 'sm' (28px), 'md' (34px)
 * @param {string} [props.width='']
 * @param {string} [props.className='']
 */
export function SlidingPill({
  options = [
    { value: 'before', label: 'Before' },
    { value: 'after', label: 'After' },
  ],
  value,
  onChange,
  disabled = false,
  size = 'md',
  width = '',
  className = '',
}) {
  const normalizedOptions = options.map((opt) =>
    typeof opt === 'string' || typeof opt === 'number' ? { value: opt, label: String(opt) } : opt
  );

  const activeIndex = Math.max(0, normalizedOptions.findIndex((opt) => opt.value === value));
  const count = normalizedOptions.length || 1;

  const heightClass = size === 'sm' ? 'h-7 text-[11px]' : 'h-[34px] text-xs';

  return (
    <div
      className={`relative ${heightClass} bg-black/60 border border-brand-60/90 rounded-full p-0.5 flex items-center select-none shadow-inner ${width} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {/* Sliding Active Red Capsule Thumb */}
      <div
        className="absolute top-0.5 bottom-0.5 bg-brand-30 rounded-full shadow-md transition-all duration-200 ease-out"
        style={{
          width: `calc((100% - 4px) / ${count})`,
          left: `calc(2px + ${activeIndex} * ((100% - 4px) / ${count}))`,
        }}
      />

      {/* Option Buttons */}
      {normalizedOptions.map((opt, idx) => {
        const isActive = idx === activeIndex;
        return (
          <button
            key={opt.value ?? idx}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onChange && onChange(opt.value)}
            className={`relative z-10 flex-1 px-3 py-1 text-center whitespace-nowrap transition-colors font-sans cursor-pointer truncate ${
              isActive ? 'font-bold text-white' : 'font-semibold text-brand-10/50 hover:text-brand-10/70'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default SlidingPill;
