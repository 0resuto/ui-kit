import React from 'react';
import { Search, X } from 'lucide-react';

const sizeMap = {
  sm: {
    container: 'h-7',
    input: 'text-[11px] rounded-lg',
    iconLeft: 'left-2.5',
    iconSize: 'w-3 h-3',
    plIcon: 'pl-7',
    plNoIcon: 'pl-2.5',
    prClear: 'pr-7',
    prNoClear: 'pr-2.5',
    clearBtn: 'right-1.5',
    clearIcon: 'w-3 h-3',
  },
  md: {
    container: 'h-8',
    input: 'text-xs rounded-xl',
    iconLeft: 'left-2.5',
    iconSize: 'w-3.5 h-3.5',
    plIcon: 'pl-8',
    plNoIcon: 'pl-3',
    prClear: 'pr-7.5',
    prNoClear: 'pr-3',
    clearBtn: 'right-2',
    clearIcon: 'w-3.5 h-3.5',
  },
  lg: {
    container: 'h-[38px]',
    input: 'text-sm rounded-xl',
    iconLeft: 'left-3',
    iconSize: 'w-4 h-4',
    plIcon: 'pl-9',
    plNoIcon: 'pl-3.5',
    prClear: 'pr-8',
    prNoClear: 'pr-3.5',
    clearBtn: 'right-2.5',
    clearIcon: 'w-4 h-4',
  },
};

/**
 * Standard Form Input Component
 * Features standardized 32px height rhythm (sm: 28px, md: 32px, lg: 38px),
 * glass-control acrylic token, optional icon, and clear trigger.
 */
export const Input = React.forwardRef(function Input({
  value,
  defaultValue,
  onChange,
  onClear,
  placeholder = '',
  icon: Icon = null,
  showClear = true,
  size = 'md',
  type = 'text',
  disabled = false,
  className = '',
  inputClassName = '',
  ...props
}, ref) {
  const sz = sizeMap[size] || sizeMap.md;
  const innerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => innerRef.current, []);

  const isControlled = value !== undefined;
  const [uncontrolledVal, setUncontrolledVal] = React.useState(
    defaultValue !== undefined && defaultValue !== null ? defaultValue : ''
  );
  const hasValue = Boolean(isControlled ? value : uncontrolledVal);

  const handleChange = (e) => {
    if (!isControlled) {
      setUncontrolledVal(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleClear = () => {
    if (disabled || props.readOnly) return;

    if (innerRef.current) {
      innerRef.current.value = '';
      innerRef.current.focus();
    }
    if (!isControlled) {
      setUncontrolledVal('');
    }
    if (onChange) {
      const syntheticEvent = {
        target: {
          ...(innerRef.current || {}),
          name: props.name || '',
          value: '',
        },
        currentTarget: {
          ...(innerRef.current || {}),
          name: props.name || '',
          value: '',
        },
        preventDefault: () => {},
        stopPropagation: () => {},
        persist: () => {},
      };
      onChange(syntheticEvent);
    }
    if (onClear) {
      onClear();
    }
  };

  const valueProps = isControlled 
    ? { value } 
    : (defaultValue !== undefined ? { defaultValue } : {});

  const canClear = showClear && hasValue && !disabled && !props.readOnly;

  return (
    <div className={`relative flex items-center w-full ${sz.container} ${className}`}>
      {Icon && (
        <Icon className={`${sz.iconSize} text-brand-10/40 absolute ${sz.iconLeft} pointer-events-none`} aria-hidden="true" />
      )}
      
      <input
        ref={innerRef}
        type={type}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full h-full glass-control border border-brand-10/15 focus:border-brand-30 focus:ring-1 focus:ring-brand-30 hover:border-brand-10/30 text-brand-10 outline-none transition-all font-medium placeholder:text-brand-10/40 disabled:opacity-50 disabled:cursor-not-allowed ${sz.input} ${
          Icon ? sz.plIcon : sz.plNoIcon
        } ${canClear ? sz.prClear : sz.prNoClear} ${inputClassName}`}
        {...valueProps}
        {...props}
      />

      {canClear && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear input"
          onClick={handleClear}
          title="Clear"
          className={`absolute ${sz.clearBtn} text-brand-10/60 hover:text-brand-10 p-1 cursor-pointer transition-colors focus:outline-none`}
        >
          <X className={sz.clearIcon} aria-hidden="true" />
        </button>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
