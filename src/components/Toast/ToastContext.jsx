import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastContainer } from './Toast.jsx';

const ToastContext = createContext(null);

let toastCount = 0;

/**
 * Toast Provider for managing application-wide toast notifications
 */
export function ToastProvider({ children, position = 'bottom-right' }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((options) => {
    const id = `toast-${++toastCount}-${Date.now()}`;
    const newToast = {
      id,
      type: options.type || 'info', // 'success' | 'error' | 'warning' | 'info'
      title: options.title || '',
      message: options.message || '',
      duration: typeof options.duration === 'number' ? options.duration : 4000,
      action: options.action, // { label, onClick }
      ...options,
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  // Standard shorthand methods
  const toast = useCallback(
    (message, options = {}) => addToast({ message, ...options }),
    [addToast]
  );

  toast.success = (title, message, options = {}) =>
    addToast({ type: 'success', title, message, ...options });

  toast.error = (title, message, options = {}) =>
    addToast({ type: 'error', title, message, ...options });

  toast.warning = (title, message, options = {}) =>
    addToast({ type: 'warning', title, message, ...options });

  toast.info = (title, message, options = {}) =>
    addToast({ type: 'info', title, message, ...options });

  toast.dismiss = removeToast;

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast, toasts }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} position={position} />
    </ToastContext.Provider>
  );
}

/**
 * Hook to access the toast notification trigger
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
}

export default ToastProvider;
