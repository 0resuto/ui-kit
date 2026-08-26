import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

const selectSizeMap = {
  sm: {
    trigger: 'h-7 text-[11px] px-2.5 rounded-lg',
    triggerOpen: 'rounded-t-lg rounded-b-none',
    iconSize: 'w-3 h-3',
    item: 'px-2.5 py-1.5 text-[11px] rounded-md',
    menu: 'rounded-b-lg p-1',
  },
  md: {
    trigger: 'h-8 text-xs px-3 rounded-xl',
    triggerOpen: 'rounded-t-xl rounded-b-none',
    iconSize: 'w-3.5 h-3.5',
    item: 'px-3 py-1.5 text-xs rounded-lg',
    menu: 'rounded-b-xl p-1.5',
  },
  lg: {
    trigger: 'h-[38px] text-sm px-3.5 rounded-xl',
    triggerOpen: 'rounded-t-xl rounded-b-none',
    iconSize: 'w-4 h-4',
    item: 'px-3.5 py-2 text-sm rounded-lg',
    menu: 'rounded-b-xl p-1.5',
  },
};

/**
 * Standard Frosted Glass Select Dropdown Component
 * Features standardized 32px height rhythm (sm: 28px, md: 32px, lg: 38px),
 * and uses React Portal pattern for reliable high-density overlay rendering.
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

  // Normalize options to [{ value, label }]
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: opt, label: String(opt) };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Recalculate screen position to attach seamlessly
  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY - 1, // Flush attached in-place
        left: rect.left + window.scrollX,
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
            ? `bg-brand-bg/95 border border-brand-30 border-b-transparent shadow-[0_0_8px_rgba(230,57,70,0.15)] ${sz.triggerOpen}`
            : 'glass-control hover:border-brand-10/30'
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
            position: 'absolute',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            width: `${coords.width}px`,
            zIndex: 99999,
          }}
          className={`glass-dropdown border-x border-b border-brand-30 border-t-0 space-y-0.5 dropdown-unroll max-h-60 overflow-y-auto custom-scrollbar ${sz.menu}`}
        >
          {normalizedOptions.map((opt, idx) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value ?? idx}
                onClick={() => handleSelect(opt.value)}
                className={`cursor-pointer flex items-center justify-between transition-colors font-medium ${sz.item} ${
                  isSelected
                    ? 'bg-brand-30/25 text-brand-10 font-bold border border-brand-30/40'
                    : 'text-brand-10/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="truncate">{opt.label}</span>
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
