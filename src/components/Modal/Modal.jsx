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
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full'} [size='md']
 * @param {boolean} [fixedHeight=false] Fixes modal to full available viewport height
 * @param {boolean} [fill=false] Alias for fixedHeight
 * @param {boolean} [scrollable=true] Whether the body container should have vertical scroll
 * @param {boolean} [noPadding=false] Removes default px-6 py-4 padding for edge-to-edge content (tables, editors)
 * @param {string} [bodyClassName=''] Custom className for the modal body container
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
  fixedHeight = false,
  fill = false,
  scrollable = true,
  noPadding = false,
  bodyClassName = '',
  showClose = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  footer,
  className = '',
  children,
  ...props
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
    '4xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const isFixed = fixedHeight || fill;
  const heightClass = isFixed
    ? 'h-[calc(100dvh-2rem)] sm:h-[calc(100dvh-3.5rem)]'
    : 'max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3.5rem)]';

  const paddingClasses = noPadding
    ? 'p-0'
    : `px-6 ${title || showClose ? 'py-4' : 'pt-6 pb-4'} ${!footer ? 'pb-6' : ''}`;

  const overflowClasses = scrollable
    ? 'overflow-y-auto custom-scrollbar overscroll-contain'
    : 'overflow-hidden';

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdropClick && onClose) {
      onClose();
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={typeof title === 'string' ? title : 'Modal'}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[99990] bg-black/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain animate-fade-in"
    >
      {/* Modal Dialog Window */}
      <div
        className={`w-full ${currentSize} ${heightClass} flex flex-col glass-dropdown rounded-2xl border border-brand-10/15 shadow-2xl dropdown-unroll select-none font-sans text-brand-10 text-left antialiased overflow-hidden overscroll-contain ${className}`}
        {...props}
      >
        {/* Modal Header */}
        {(title || showClose) && (
          <div className="flex items-start justify-between gap-4 border-b border-brand-60/60 px-6 pt-6 pb-3.5 shrink-0">
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
        <div
          className={`text-xs text-brand-10/85 font-medium leading-relaxed flex flex-col flex-1 min-h-0 ${overflowClasses} ${paddingClasses} ${bodyClassName}`}
        >
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="border-t border-brand-60/60 px-6 py-4 flex items-center justify-end gap-2.5 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
