import React from 'react';
import { Minus, Plus } from 'lucide-react';

const stepperSizeMap = {
  sm: {
    container: 'h-7 rounded-lg text-[11px]',
    btn: 'w-7',
    iconSize: 'w-3 h-3',
    input: 'text-[11px]',
    unit: 'text-[9px]',
  },
  md: {
    container: 'h-8 rounded-xl text-xs',
    btn: 'w-7.5',
    iconSize: 'w-3.5 h-3.5',
    input: 'text-xs',
    unit: 'text-[10px]',
  },
  lg: {
    container: 'h-[38px] rounded-xl text-sm',
    btn: 'w-8.5',
    iconSize: 'w-4 h-4',
    input: 'text-sm',
    unit: 'text-xs',
  },
};

/**
 * Standard Number Stepper Component
 * Features standardized 32px height rhythm (sm: 28px, md: 32px, lg: 38px),
 * glass-control acrylic token, tabular numbers, and custom +/- triggers.
 */
export function NumberStepper({
  value = 0,
  onChange,
  step = 1,
  min = -Infinity,
  max = Infinity,
  unit = '',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) {
  const sz = stepperSizeMap[size] || stepperSizeMap.md;

  const handleStep = (delta) => {
    if (disabled) return;
    const currentVal = typeof value === 'number' ? value : parseFloat(value) || 0;
    const nextVal = Math.min(max, Math.max(min, currentVal + delta));
    if (onChange) {
      onChange(nextVal);
    }
  };

  const handleManualChange = (e) => {
    const raw = e.target.value;
    if (raw === '') {
      if (onChange) onChange('');
      return;
    }
    const num = parseFloat(raw);
    if (!isNaN(num) && onChange) {
      onChange(num);
    }
  };

  return (
    <div
      className={`flex items-center glass-control border border-brand-10/15 focus-within:border-brand-30 hover:border-brand-10/30 overflow-hidden transition-all ${
        sz.container
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <button
        type="button"
        onClick={() => handleStep(-step)}
        disabled={disabled || value <= min}
        className={`${sz.btn} h-full flex items-center justify-center text-brand-10/60 hover:text-brand-10 hover:bg-white/10 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer border-r border-brand-10/10`}
      >
        <Minus className={sz.iconSize} />
      </button>

      <div className="flex-1 flex items-center justify-center px-1.5 min-w-0">
        <input
          type="number"
          value={value}
          onChange={handleManualChange}
          disabled={disabled}
          step={step}
          min={min}
          max={max}
          className={`w-full bg-transparent text-brand-10 text-center font-bold outline-none tabular-nums truncate ${sz.input}`}
          {...props}
        />
        {unit && (
          <span className={`text-brand-10/40 ml-0.5 select-none font-medium truncate ${sz.unit}`}>
            {unit}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => handleStep(step)}
        disabled={disabled || value >= max}
        className={`${sz.btn} h-full flex items-center justify-center text-brand-10/60 hover:text-brand-10 hover:bg-white/10 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer border-l border-brand-10/10`}
      >
        <Plus className={sz.iconSize} />
      </button>
    </div>
  );
}

export default NumberStepper;
