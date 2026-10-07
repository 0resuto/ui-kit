import React from 'react';
import { ChevronDown, Check } from 'lucide-react';

const selectSizeMap = {
  sm: {
    trigger: 'h-7 text-[11px] px-2.5',
    rounded: 'rounded-lg',
    iconSize: 'w-3 h-3',
    item: 'px-2.5 py-1.5 text-[11px] rounded-md',
    groupHeader: 'px-2.5 pt-1.5 pb-0.5 text-[9px]',
  },
  md: {
    trigger: 'h-8 text-xs px-3',
    rounded: 'rounded-xl',
    iconSize: 'w-3.5 h-3.5',
    item: 'px-3 py-1.5 text-xs rounded-lg',
    groupHeader: 'px-3 pt-2 pb-0.5 text-[10px]',
  },
  lg: {
    trigger: 'h-[38px] text-sm px-3.5',
    rounded: 'rounded-xl',
    iconSize: 'w-4 h-4',
    item: 'px-3.5 py-2 text-sm rounded-lg',
    groupHeader: 'px-3.5 pt-2.5 pb-1 text-[11px]',
  },
};

/**
 * Standard Frosted Glass Select Dropdown Component
 * Uses modern appearance: base-select for native top-layer rendering,
 * while maintaining the exact visual aesthetic.
 * 
 * @param {Object} props
 * @param {any} props.value
 * @param {any} props.defaultValue
 * @param {(value: any) => void} [props.onChange]
 * @param {Array<Object|string|number>} [props.options=[]] Supports flat list or grouped [{ group: string, items: [] }]
 * @param {string} [props.placeholder='Select option...']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className='']
 */
export const Select = React.forwardRef(function Select({
  name,
  value,
  defaultValue,
  onChange,
  options = [],
  placeholder = 'Select option...',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}, ref) {
  const sz = selectSizeMap[size] || selectSizeMap.md;

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
  const currentValue = isControlled ? value : uncontrolledValue;

  const handleChange = (e) => {
    const val = e.target.value;
    if (!isControlled) {
      setUncontrolledValue(val);
    }
    if (onChange) {
      onChange(val);
    }
  };

  const renderOption = (item, idx) => {
    const opt = typeof item === 'string' || typeof item === 'number'
      ? { value: String(item), label: String(item) }
      : { value: String(item.value), label: String(item.label) };

    return (
      <option
        key={opt.value ?? idx}
        value={opt.value}
        className={`flex items-center justify-between transition-colors font-medium cursor-pointer ${sz.item} text-brand-10/85 hover:bg-white/10 hover:text-white checked:bg-brand-30/25 checked:text-brand-10 checked:font-bold checked:border checked:border-brand-30/40`}
      >
        <span className="truncate">{opt.label}</span>
        {/* Custom checkmark - visibility controlled via CSS based on :checked */}
        <Check className="w-3.5 h-3.5 text-brand-30 shrink-0 ml-2 check-icon" aria-hidden="true" />
      </option>
    );
  };

  return (
    <select
      ref={ref}
      name={name}
      value={currentValue}
      onChange={handleChange}
      disabled={disabled}
      className={`glass-select w-full text-brand-10 outline-none transition-all cursor-pointer font-medium glass-control hover:border-brand-10/30 ${sz.rounded} ${sz.trigger} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {/* The trigger button replacement for base-select browsers */}
      <button type="button" className="w-full h-full flex items-center justify-between bg-transparent border-none p-0 m-0 focus:outline-none">
        <selectedcontent className="truncate font-semibold text-left flex-1" />
        <ChevronDown className={`${sz.iconSize} text-brand-10/60 transition-transform duration-200 shrink-0 ml-2 select-icon`} aria-hidden="true" />
      </button>

      {/* Options & Optgroups */}
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}

      {options.map((entry, idx) => {
        if (entry == null) return null;

        const isGroup = typeof entry === 'object' && (Array.isArray(entry.items) || Array.isArray(entry.options));

        if (isGroup) {
          const groupTitle = entry.group || entry.label;
          const groupItems = entry.items || entry.options || [];

          return (
            <optgroup
              key={`group-${idx}`}
              label={groupTitle}
              className={`${sz.groupHeader} font-bold text-brand-10/40 uppercase tracking-wider select-none`}
            >
              {groupItems.map((item, itemIdx) => renderOption(item, `${idx}-${itemIdx}`))}
            </optgroup>
          );
        }

        return renderOption(entry, idx);
      })}
    </select>
  );
});

Select.displayName = 'Select';

export default Select;
