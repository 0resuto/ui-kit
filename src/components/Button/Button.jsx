import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Standard UI Kit Universal Button Component
 * 
 * @param {'primary' | 'glass' | 'minimal' | 'secondary' | 'ghost' | 'danger'} [variant='primary']
 * @param {'sm' | 'md' | 'lg' | 'icon'} [size='md'] Standard size: 'md' = 32px (h-8)
 * @param {boolean} [isLoading=false]
 * @param {React.ReactNode} [leftIcon]
 * @param {React.ReactNode} [rightIcon]
 * @param {boolean} [disabled=false]
 * @param {boolean} [fullWidth=false]
 * @param {string} [className='']
 * @param {React.ReactNode} children
 */
export const Button = React.forwardRef(function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  children,
  ...props
}, ref) {
  // Base structural classes
  const baseStyles = 'inline-flex items-center justify-center font-bold select-none cursor-pointer outline-none transition-all duration-150 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50';

  // Size variants (Standard md = 32px / h-8)
  const sizeStyles = {
    sm: 'h-7 px-2.5 text-[11px] rounded-lg gap-1.5',
    md: 'h-8 px-3.5 text-xs rounded-xl gap-2',
    lg: 'h-[38px] px-4.5 text-sm rounded-xl gap-2.5',
    icon: 'w-8 h-8 p-0 text-xs rounded-xl justify-center shrink-0',
  };

  // Official Variant Styles
  const variantStyles = {
    // 1. Primary Action (Brand Crimson with top specular highlight & glow)
    primary: 'bg-brand-30 text-brand-10 hover:brightness-110 shadow-lg shadow-brand-30/25 border border-brand-30/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]',

    // 2. Optical Glass Lens (Apple VisionOS / macOS: 190% saturation lift + optical refraction)
    glass: 'bg-white/[0.08] hover:bg-white/[0.16] text-brand-10 border border-white/15 hover:border-white/30 backdrop-blur-2xl backdrop-saturate-[190%] backdrop-brightness-110 shadow-sm',

    // 3. Dark Minimal Glass (Linear / Supabase: Flat matte graphite tint + ambient hover glow)
    minimal: 'bg-white/[0.05] hover:bg-white/[0.1] text-brand-10/90 hover:text-white border border-white/[0.07] hover:border-white/[0.18] backdrop-blur-lg hover:shadow-[0_0_16px_rgba(255,255,255,0.08)] shadow-sm',

    // 4. Secondary Solid (Opaque slate anchor for forms and modals)
    secondary: 'bg-brand-60/90 text-brand-10/90 hover:bg-brand-60 hover:text-white border border-brand-10/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] shadow-sm',

    // 5. Ghost Link (Clean transparent hover button)
    ghost: 'bg-transparent text-brand-10/70 hover:text-brand-10 hover:bg-white/5 border border-transparent',

    // 6. Danger Alert (Critical action with specular highlight)
    danger: 'bg-accent-red/20 text-red-400 hover:bg-accent-red/30 hover:text-red-300 border border-accent-red/40 shadow-[0_0_12px_rgba(239,68,68,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]',
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;
  const currentVariant = variantStyles[variant] || variantStyles.primary;
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${currentSize} ${currentVariant} ${widthClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
          {children && <span>{children}</span>}
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
