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
  onBlur,
  onFocus,
  onKeyDown,
  ...props
}, ref) {
  const sz = stepperSizeMap[size] || stepperSizeMap.md;

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const currentValue = isControlled ? value : uncontrolledValue;

  const [inputString, setInputString] = React.useState(
    currentValue !== undefined && currentValue !== null ? String(currentValue) : ''
  );
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    if (!isFocused) {
      setInputString(currentValue !== undefined && currentValue !== null ? String(currentValue) : '');
    }
  }, [currentValue, isFocused]);

  const clampValue = (val) => {
    const num = typeof val === 'number' ? val : parseFloat(val);
    if (isNaN(num)) return typeof defaultValue === 'number' ? defaultValue : 0;
    return Math.min(max, Math.max(min, num));
  };

  const handleStep = (delta) => {
    if (disabled) return;
    const currentNum = typeof currentValue === 'number' ? currentValue : parseFloat(currentValue) || 0;
    const precision = Math.max(getStepPrecision(step), getStepPrecision(currentNum));
    const rawNext = clampValue(currentNum + delta);
    const nextVal = precision > 0 ? Number(rawNext.toFixed(precision)) : Math.round(rawNext);

    setInputString(String(nextVal));
    if (!isControlled) {
      setUncontrolledValue(nextVal);
    }
    if (onChange) {
      onChange(nextVal);
    }
  };

  const handleManualChange = (e) => {
    const raw = e.target.value;
    setInputString(raw);

    if (raw === '' || raw === '-' || raw === '.' || raw === '-.') {
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

  const handleBlur = (e) => {
    setIsFocused(false);
    if (inputString === '' || inputString === '-' || inputString === '.' || inputString === '-.') {
      const fallback = isFinite(min) && min > 0 ? min : 0;
      const finalVal = clampValue(fallback);
      setInputString(String(finalVal));
      if (!isControlled) setUncontrolledValue(finalVal);
      if (onChange) onChange(finalVal);
    } else {
      const parsed = parseFloat(inputString);
      if (!isNaN(parsed)) {
        const clamped = clampValue(parsed);
        const precision = Math.max(getStepPrecision(step), getStepPrecision(parsed));
        const formatted = precision > 0 ? Number(clamped.toFixed(precision)) : Math.round(clamped);
        setInputString(String(formatted));
        if (formatted !== currentValue) {
          if (!isControlled) setUncontrolledValue(formatted);
          if (onChange) onChange(formatted);
        }
      }
    }
    if (onBlur) onBlur(e);
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleStep(step);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleStep(-step);
    } else if (e.key === 'Enter') {
      handleBlur(e);
    }
    if (onKeyDown) onKeyDown(e);
  };

  const numericCurrent = typeof currentValue === 'number' ? currentValue : parseFloat(currentValue);
  const isAtMin = !isNaN(numericCurrent) && isFinite(min) && numericCurrent <= min;
  const isAtMax = !isNaN(numericCurrent) && isFinite(max) && numericCurrent >= max;

  return (
    <div
      className={`flex items-center glass-control border border-brand-10/15 focus-within:border-brand-30 focus-within:ring-1 focus-within:ring-brand-30 hover:border-brand-10/30 overflow-hidden transition-all ${
        sz.container
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <button
        type="button"
        aria-label="Decrease value"
        onClick={() => handleStep(-step)}
        disabled={disabled || isAtMin}
        className={`${sz.btn} h-full flex items-center justify-center text-brand-10/60 hover:text-brand-10 hover:bg-white/10 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer border-r border-brand-10/10 focus-visible:ring-1 focus-visible:ring-brand-30 focus-visible:outline-none`}
      >
        <Minus className={sz.iconSize} aria-hidden="true" />
      </button>

      <div className="flex-1 flex items-center justify-center px-1.5 min-w-0">
        <input
          ref={ref}
          type="text"
          inputMode="decimal"
          name={name}
          value={inputString}
          onChange={handleManualChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          role="spinbutton"
          aria-valuenow={!isNaN(numericCurrent) ? numericCurrent : undefined}
          aria-valuemin={isFinite(min) ? min : undefined}
          aria-valuemax={isFinite(max) ? max : undefined}
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
        aria-label="Increase value"
        onClick={() => handleStep(step)}
        disabled={disabled || isAtMax}
        className={`${sz.btn} h-full flex items-center justify-center text-brand-10/60 hover:text-brand-10 hover:bg-white/10 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer border-l border-brand-10/10 focus-visible:ring-1 focus-visible:ring-brand-30 focus-visible:outline-none`}
      >
        <Plus className={sz.iconSize} aria-hidden="true" />
      </button>
    </div>
  );
});

NumberStepper.displayName = 'NumberStepper';

export default NumberStepper;
