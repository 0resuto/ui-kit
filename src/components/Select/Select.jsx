import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

const selectSizeMap = {
  sm: {
    trigger: 'h-7 text-[11px] px-2.5',
    roundedClosed: 'rounded-lg',
    roundedOpen: 'rounded-t-lg',
    iconSize: 'w-3 h-3',
    item: 'px-2.5 py-1.5 text-[11px] rounded-md',
    groupHeader: 'px-2.5 pt-1.5 pb-0.5 text-[9px]',
    menu: 'rounded-b-lg p-1',
  },
  md: {
    trigger: 'h-8 text-xs px-3',
    roundedClosed: 'rounded-xl',
    roundedOpen: 'rounded-t-xl',
    iconSize: 'w-3.5 h-3.5',
    item: 'px-3 py-1.5 text-xs rounded-lg',
    groupHeader: 'px-3 pt-2 pb-0.5 text-[10px]',
    menu: 'rounded-b-xl p-1.5',
  },
  lg: {
    trigger: 'h-[38px] text-sm px-3.5',
    roundedClosed: 'rounded-xl',
    roundedOpen: 'rounded-t-xl',
    iconSize: 'w-4 h-4',
    item: 'px-3.5 py-2 text-sm rounded-lg',
    groupHeader: 'px-3.5 pt-2.5 pb-1 text-[11px]',
    menu: 'rounded-b-xl p-1.5',
  },
};

/**
 * Helper to find matching option across flat lists and option groups
 */
function findOptionByValue(optionsList, val) {
  if (!Array.isArray(optionsList) || val === undefined || val === null) return null;
  for (const opt of optionsList) {
    if (opt == null) continue;
    if (typeof opt === 'string' || typeof opt === 'number') {
      if (opt === val) return { value: opt, label: String(opt) };
    } else if (Array.isArray(opt.items) || Array.isArray(opt.options)) {
      const nested = opt.items || opt.options;
      const found = findOptionByValue(nested, val);
      if (found) return found;
    } else if (opt.value === val) {
      return opt;
    }
  }
  return null;
}

/**
 * Standard Frosted Glass Select Dropdown Component
 * Features standardized 32px height rhythm (sm: 28px, md: 32px, lg: 38px),
 * option grouping (optgroup) support, and React Portal overlay rendering.
 * 
 * @param {Object} props
 * @param {any} props.value
 * @param {(value: any) => void} [props.onChange]
 * @param {Array<Object|string|number>} [props.options=[]] Supports flat list or grouped [{ group: string, items: [] }]
 * @param {string} [props.placeholder='Select option...']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className='']
 */
export function Select({
  value,
  onChange,
  options = [],
  placeholder = 'Select option...',
  size = 'md',
  disabled = false,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const sz = selectSizeMap[size] || selectSizeMap.md;
  const selectedOption = findOptionByValue(options, value);

  // Recalculate screen position to attach seamlessly in viewport coordinates
  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom - 1, // Flush attached in-place (viewport fixed coordinates)
        left: rect.left,
        width: rect.width,
      });
    }
  };

  const toggleOpen = () => {
    if (disabled) return;
    if (!isOpen) {
      updatePosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Close on outside click or window resize / scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      const inTrigger = triggerRef.current && triggerRef.current.contains(e.target);
      const inMenu = menuRef.current && menuRef.current.contains(e.target);
      if (!inTrigger && !inMenu) {
        setIsOpen(false);
      }
    };

    const handleWindowChange = () => {
      updatePosition();
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleWindowChange, true);
    window.addEventListener('resize', handleWindowChange);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleWindowChange, true);
      window.removeEventListener('resize', handleWindowChange);
    };
  }, [isOpen]);

  const handleSelect = (val) => {
    if (onChange) {
      onChange(val);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full select-none ${className}`}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={toggleOpen}
        className={`w-full text-brand-10 flex items-center justify-between outline-none transition-all cursor-pointer font-medium ${sz.trigger} ${
          isOpen
            ? `bg-brand-bg/95 border border-brand-30 border-b-transparent shadow-[0_0_8px_rgba(230,57,70,0.15)] ${sz.roundedOpen}`
            : `glass-control hover:border-brand-10/30 ${sz.roundedClosed}`
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className="truncate font-semibold">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`${sz.iconSize} text-brand-10/60 transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? 'rotate-180 text-brand-30' : ''
          }`}
        />
      </button>

      {/* Portaled Attached Frosted Glass Menu (Mounted in document.body) */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            width: `${coords.width}px`,
            zIndex: 99999,
          }}
          className={`glass-dropdown border-x border-b border-brand-30 border-t-0 space-y-0.5 dropdown-unroll max-h-60 overflow-y-auto custom-scrollbar font-sans text-brand-10 text-left box-border antialiased ${sz.menu}`}
        >

          {options.map((entry, idx) => {
            if (entry == null) return null;

            // Group structure check: { group / label, items / options }
            const isGroup = typeof entry === 'object' && (Array.isArray(entry.items) || Array.isArray(entry.options));

            if (isGroup) {
              const groupTitle = entry.group || entry.label;
              const groupItems = entry.items || entry.options || [];

              return (
                <div key={`group-${idx}`} className={idx > 0 ? 'border-t border-white/5 mt-1 pt-1' : ''}>
                  {groupTitle && (
                    <div className={`${sz.groupHeader} font-bold text-brand-10/40 uppercase tracking-wider select-none`}>
                      {groupTitle}
                    </div>
                  )}
                  <div className="space-y-0.5">
                    {groupItems.map((opt, itemIdx) => {
                      const item = typeof opt === 'string' || typeof opt === 'number'
                        ? { value: opt, label: String(opt) }
                        : opt;
                      const isSelected = item.value === value;

                      return (
                        <div
                          key={item.value ?? `${idx}-${itemIdx}`}
                          onClick={() => handleSelect(item.value)}
                          className={`cursor-pointer flex items-center justify-between transition-colors font-medium ${sz.item} ${
                            isSelected
                              ? 'bg-brand-30/25 text-brand-10 font-bold border border-brand-30/40'
                              : 'text-brand-10/85 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{item.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-brand-30 shrink-0 ml-2" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // Flat option item
            const item = typeof entry === 'string' || typeof entry === 'number'
              ? { value: entry, label: String(entry) }
              : entry;
            const isSelected = item.value === value;

            return (
              <div
                key={item.value ?? idx}
                onClick={() => handleSelect(item.value)}
                className={`cursor-pointer flex items-center justify-between transition-colors font-medium ${sz.item} ${
                  isSelected
                    ? 'bg-brand-30/25 text-brand-10 font-bold border border-brand-30/40'
                    : 'text-brand-10/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="truncate">{item.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-brand-30 shrink-0 ml-2" />}
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
}

export default Select;

