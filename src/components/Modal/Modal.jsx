import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

/**
 * Standard UI Kit Modal / Dialog Component
 * 
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {React.ReactNode} [title]
 * @param {React.ReactNode} [description]
 * @param {React.ElementType} [icon]
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'} [size='md']
 * @param {boolean} [showClose=true]
 * @param {boolean} [closeOnBackdropClick=true]
 * @param {boolean} [closeOnEscape=true]
 * @param {React.ReactNode} [footer]
 * @param {string} [className='']
 * @param {React.ReactNode} children
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  icon: Icon,
  size = 'md',
  showClose = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  footer,
  className = '',
  children,
}) {
  // Lock body scrolling when modal is active
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (closeOnEscape && e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  // Size mappings
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
    '2xl': 'max-w-4xl',
    '3xl': 'max-w-6xl',
    full: 'max-w-7xl',
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdropClick && onClose) {
      onClose();
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[99990] bg-black/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
    >
      {/* Modal Dialog Window */}
      <div
        className={`w-full ${currentSize} glass-dropdown rounded-2xl border border-brand-10/15 p-6 shadow-2xl space-y-4 dropdown-unroll select-none font-sans text-brand-10 text-left antialiased ${className}`}
      >

        {/* Modal Header */}
        {(title || showClose) && (
          <div className="flex items-start justify-between gap-4 border-b border-brand-60/60 pb-3.5">
            <div className="space-y-1">
              {title && (
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="w-5 h-5 text-brand-30 shrink-0" />}
                  <h3 className="text-base font-bold text-brand-10 tracking-tight">
                    {title}
                  </h3>
                </div>
              )}
              {description && (
                <p className="text-xs text-brand-10/60 font-medium leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {showClose && onClose && (
              <button
                type="button"
                onClick={onClose}
                title="Close modal"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-10/60 hover:text-brand-10 hover:bg-white/10 active:scale-95 transition-all cursor-pointer shrink-0 -mr-1.5 -mt-1.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div className="text-xs text-brand-10/85 font-medium leading-relaxed">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="border-t border-brand-60/60 pt-4 flex items-center justify-end gap-2.5">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
