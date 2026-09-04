import React, { useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

/**
 * Slide-Out Settings & Navigation Drawer (w-[340px])
 * Layers beneath the fixed Rail (z-40 under z-50), sliding smoothly out from under it.
 */
export function Drawer({
  isOpen = false,
  onClose,
  title = 'Settings',
  subtitle = 'Controls & Parameters',
  footerText = 'UI Kit Engine',
  children,
  className = '',
}) {
  const drawerRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop (mobile z-55, desktop z-35 below Drawer z-40 and Rail z-50) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-55 sm:z-35 bg-black/50 backdrop-blur-[2px] transition-opacity"
        />
      )}

      {/* Drawer Panel: Anchored at left-0 on mobile, left-14 on desktop, sliding out from under Rail */}
      <div
        ref={drawerRef}
        className={`fixed top-0 bottom-0 left-0 sm:left-14 w-full sm:w-[320px] max-w-full sm:max-w-[calc(100vw-3.5rem)] z-60 sm:z-40 bg-brand-bg/98 backdrop-blur-2xl border-r border-brand-60 flex flex-col font-sans transition-transform duration-300 ease-in-out will-change-transform text-brand-10 h-dvh ${
          isOpen 
            ? 'translate-x-0 pointer-events-auto shadow-[12px_0_28px_-6px_rgba(0,0,0,0.32),4px_0_10px_-2px_rgba(0,0,0,0.22)]' 
            : '-translate-x-full pointer-events-none shadow-none'
        } ${className}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-brand-60/60 py-3.5 px-4.5 bg-white/[0.02]">
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold tracking-wide uppercase text-brand-10 truncate">
              {title}
            </h4>
            {subtitle && (
              <p className="text-[10px] text-white/40 truncate">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all cursor-pointer shrink-0 ml-2"
            title="Close Drawer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          {children}
        </div>

        {/* Drawer Footer */}
        {footerText && (
          <div className="px-5 py-2.5 border-t border-brand-60/40 text-[11px] text-white/30 font-mono flex justify-between items-center bg-white/[0.02]">
            <span>{footerText}</span>
            <span className="text-brand-30 font-bold">v0.1.0</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Drawer;
