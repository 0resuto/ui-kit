import React from 'react';

const paddingStyles = {
  none: '',
  sm: 'p-3',       // 12px - High-density nested tile
  md: 'p-4',       // 16px - Standard Golden Mean (Linear / Raycast / macOS standard)
  lg: 'p-5',       // 20px - Spacious presentation card
};

const variantStyles = {
  glass: 'glass border border-brand-10/10 rounded-2xl',
  card: 'glass-card border border-brand-10/10 rounded-xl',
  ghost: 'bg-transparent border border-brand-60/60 rounded-xl',
};

/**
 * Universal Card Container Component
 * Features modular header with icon, title, subtitle, and right-aligned actions slot.
 * 
 * @param {Object} props
 * @param {string|React.ReactNode} [props.title]
 * @param {string|React.ReactNode} [props.subtitle]
 * @param {React.ElementType} [props.icon]
 * @param {React.ReactNode} [props.actions] Header actions slot (Buttons, Sliders, Badges, etc.)
 * @param {'glass' | 'card' | 'ghost'} [props.variant='glass']
 * @param {'none' | 'sm' | 'md' | 'lg'} [props.padding='md'] Padding scale: 'md' = 16px standard
 * @param {React.ReactNode} [props.footer]
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export function Card({
  title,
  subtitle,
  icon: Icon,
  actions,
  variant = 'glass',
  padding = 'md',
  footer,
  className = '',
  children,
  ...props
}) {
  const hasHeader = title || subtitle || Icon || actions;
  const baseVariant = variantStyles[variant] || variantStyles.glass;
  const padClass = paddingStyles[padding] ?? paddingStyles.md;

  return (
    <div className={`${baseVariant} ${padClass} ${className}`} {...props}>
      {/* Header with Title and Actions Slot */}
      {hasHeader && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-60/60 pb-3 mb-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            {Icon && <Icon className="w-4 h-4 text-brand-30 shrink-0" />}
            <div className="min-w-0">
              {title && (
                <h4 className="text-xs font-bold text-brand-10 uppercase tracking-wide truncate">
                  {title}
                </h4>
              )}
              {subtitle && (
                <p className="text-[11px] text-brand-10/60 truncate">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Right-aligned Actions Slot */}
          {actions && (
            <div className="flex items-center gap-2 shrink-0 ml-auto">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Main Card Body */}
      <div>{children}</div>

      {/* Optional Card Footer */}
      {footer && (
        <div className="mt-3.5 pt-3 border-t border-brand-60/40 text-xs text-brand-10/70 flex items-center justify-between">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;
