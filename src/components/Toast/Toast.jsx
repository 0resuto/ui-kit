import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

/**
 * Individual Toast Item Component with auto-dismiss timer and frosted acrylic surface
 */
export function ToastItem({ toast, onDismiss }) {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!toast.duration || toast.duration <= 0 || isPaused) return;

    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, isPaused, onDismiss]);

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      colorClass: 'text-accent-green',
      beaconClass: 'bg-accent-green',
    },
    error: {
      icon: AlertCircle,
      colorClass: 'text-accent-red',
      beaconClass: 'bg-accent-red',
    },
    warning: {
      icon: AlertTriangle,
      colorClass: 'text-accent-yellow',
      beaconClass: 'bg-accent-yellow',
    },
    info: {
      icon: Info,
      colorClass: 'text-accent-blue',
      beaconClass: 'bg-accent-blue',
    },
  };

  const currentConfig = typeConfig[toast.type] || typeConfig.info;
  const Icon = currentConfig.icon;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="pointer-events-auto w-full glass-dropdown rounded-xl border border-brand-10/15 p-3.5 shadow-2xl space-y-1.5 dropdown-unroll select-none transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-start gap-2.5 min-w-0">
          <div className="relative mt-0.5 shrink-0">
            <Icon className={`w-4 h-4 ${currentConfig.colorClass}`} />
            <span
              className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${currentConfig.beaconClass} animate-ping`}
            />
          </div>

          <div className="space-y-0.5 min-w-0">
            {toast.title && (
              <h4 className="text-xs font-bold text-brand-10 truncate leading-tight">
                {toast.title}
              </h4>
            )}
            {toast.message && (
              <p className="text-[11px] text-brand-10/70 font-medium leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          title="Dismiss notification"
          className="w-5 h-5 rounded flex items-center justify-center text-brand-10/40 hover:text-brand-10 hover:bg-white/10 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {toast.action && (
        <div className="pt-1.5 flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (toast.action.onClick) toast.action.onClick();
              onDismiss(toast.id);
            }}
            className="text-[11px] font-bold text-brand-30 hover:underline cursor-pointer"
          >
            {toast.action.label}
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Toast Container portaled to document.body
 */
export function ToastContainer({ toasts = [], onDismiss, position = 'bottom-right' }) {
  if (typeof document === 'undefined' || toasts.length === 0) {
    return null;
  }

  const positionClasses = {
    'top-right': 'top-5 right-5',
    'top-left': 'top-5 left-5',
    'bottom-right': 'bottom-5 right-5',
    'bottom-left': 'bottom-5 left-5',
  };

  const pos = positionClasses[position] || positionClasses['bottom-right'];

  return createPortal(
    <div
      aria-live="polite"
      className={`fixed ${pos} z-[99999] flex flex-col gap-2 max-w-sm w-full pointer-events-none`}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body
  );
}

export default ToastContainer;
