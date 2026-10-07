import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Standard UI Kit Modal / Dialog Component (Modern Native <dialog>)
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
  const dialogRef = useRef(null);

  // Sync isOpen prop with native dialog showModal/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

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
    if (!closeOnBackdropClick || !onClose) return;
    
    // Check if click was exactly on the dialog's backdrop.
    // When clicking the ::backdrop, the event target is the <dialog> itself.
    const dialog = e.currentTarget;
    if (e.target !== dialog) return;

    // Check if the click coordinates fall within the dialog's content box.
    // This distinguishes between a click on the backdrop vs a click on the dialog's padding (if any).
    const rect = dialog.getBoundingClientRect();
    const isDialogContent = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );

    if (!isDialogContent) {
      onClose();
    }
  };

  const handleCancel = (e) => {
    // Native escape key handler
    e.preventDefault(); // Prevent native close to let React state drive it
    if (closeOnEscape && onClose) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      closedby={closeOnBackdropClick ? "any" : "closerequest"}
      aria-label={typeof title === 'string' ? title : 'Modal'}
      className={`glass-modal p-0 m-auto bg-transparent border-none overflow-visible w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] ${currentSize} focus:outline-none`}
    >
      {/* Inner container providing the actual frosted glass aesthetic and layout constraints */}
      <div
        className={`w-full ${heightClass} flex flex-col glass-dropdown rounded-2xl border border-brand-10/15 shadow-2xl select-none font-sans text-brand-10 text-left antialiased overflow-hidden overscroll-contain ${className}`}
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
                aria-label="Close modal"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-10/60 hover:text-brand-10 hover:bg-white/10 active:scale-95 transition-all cursor-pointer shrink-0 -mr-1.5 -mt-1.5 focus-visible:ring-1 focus-visible:ring-brand-30 focus-visible:outline-none"
              >
                <X className="w-4 h-4" aria-hidden="true" />
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
    </dialog>
  );
}

export default Modal;
