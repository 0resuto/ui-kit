import React from 'react';

/**
 * Option A Group Card for Sidebar & Settings Panels
 * Uses centralized .glass-card token with uppercase title and brand icon.
 */
export function SidebarCard({
  title,
  icon: Icon,
  badge,
  children,
  className = '',
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {(title || Icon || badge) && (
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-10">
          <div className="flex items-center gap-1.5">
            {Icon && <Icon className="w-3.5 h-3.5 text-brand-30" />}
            {title && <span>{title}</span>}
          </div>
          {badge && <div>{badge}</div>}
        </div>
      )}

      <div className="glass-card border border-brand-10/10 rounded-xl p-3.5 space-y-3 shadow-sm">
        {children}
      </div>
    </div>
  );
}

export default SidebarCard;
