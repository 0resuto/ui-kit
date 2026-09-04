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

function getStepPrecision(stepVal) {
  const stepStr = String(stepVal);
  if (stepStr.includes('.')) {
    return stepStr.split('.')[1].length;
  }
  return 0;
}

/**
 * Standard Number Stepper Component
 * Features standardized 32px height rhythm (sm: 28px, md: 32px, lg: 38px),
 * glass-control acrylic token, tabular numbers, and custom +/- triggers.
 */
export const NumberStepper = React.forwardRef(function NumberStepper({
  value,
  defaultValue = 0,
  onChange,
  step = 1,
  min = -Infinity,
  max = Infinity,
  unit = '',
  size = 'md',
  disabled = false,
  className = '',
  name,
  ...props
}, ref) {
  const sz = stepperSizeMap[size] || stepperSizeMap.md;

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const currentValue = isControlled ? value : uncontrolledValue;

  const handleStep = (delta) => {
    if (disabled) return;
    const currentVal = typeof currentValue === 'number' ? currentValue : parseFloat(currentValue) || 0;
    const precision = Math.max(getStepPrecision(step), getStepPrecision(currentVal));
    const rawNext = Math.min(max, Math.max(min, currentVal + delta));
    const nextVal = precision > 0 ? Number(rawNext.toFixed(precision)) : Math.round(rawNext);

    if (!isControlled) {
      setUncontrolledValue(nextVal);
    }
    if (onChange) {
      onChange(nextVal);
    }
  };

  const handleManualChange = (e) => {
    const raw = e.target.value;
    if (raw === '') {
      if (!isControlled) setUncontrolledValue('');
      if (onChange) onChange('');
      return;
    }
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      if (!isControlled) setUncontrolledValue(num);
      if (onChange) onChange(num);
    }
  };

  const isAtMin = typeof currentValue === 'number' && currentValue <= min;
  const isAtMax = typeof currentValue === 'number' && currentValue >= max;

  return (
    <div
      className={`flex items-center glass-control border border-brand-10/15 focus-within:border-brand-30 hover:border-brand-10/30 overflow-hidden transition-all ${
        sz.container
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <button
        type="button"
        onClick={() => handleStep(-step)}
        disabled={disabled || isAtMin}
        className={`${sz.btn} h-full flex items-center justify-center text-brand-10/60 hover:text-brand-10 hover:bg-white/10 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer border-r border-brand-10/10`}
      >
        <Minus className={sz.iconSize} />
      </button>

      <div className="flex-1 flex items-center justify-center px-1.5 min-w-0">
        <input
          ref={ref}
          type="number"
          name={name}
          value={currentValue}
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
        disabled={disabled || isAtMax}
        className={`${sz.btn} h-full flex items-center justify-center text-brand-10/60 hover:text-brand-10 hover:bg-white/10 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer border-l border-brand-10/10`}
      >
        <Plus className={sz.iconSize} />
      </button>
    </div>
  );
});

NumberStepper.displayName = 'NumberStepper';

export default NumberStepper;
