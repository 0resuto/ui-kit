import React from 'react';

/**
 * Left Vertical Navigation Rail (w-14 / 56px)
 * Anchored to the left of the viewport for rapid tool switching.
 * Uses a dedicated background shadow layer (z-0) so the sidebar shadow falls
 * strictly onto the wallpaper background and never darkens content cards (z-10).
 * 
 * @param {Object} props
 * @param {Array} [props.topActions=[]]
 * @param {Array} [props.bottomActions=[]]
 * @param {boolean} [props.isDrawerOpen=false]
 * @param {string} [props.className='']
 */
export function Rail({
  topActions = [],
  bottomActions = [],
  isDrawerOpen = false,
  className = '',
}) {
  return (
    <>
      {/* 1. Dedicated Background Shadow Layer (Z-0) */}
      {/* Casts shadow strictly onto the wallpaper below content cards */}
      <div
        aria-hidden="true"
        className={`fixed top-0 left-0 bottom-0 w-14 z-0 pointer-events-none transition-opacity duration-300 ${
          isDrawerOpen 
            ? 'opacity-0' 
            : 'opacity-100 shadow-[14px_0_32px_-4px_rgba(0,0,0,0.42),6px_0_12px_-2px_rgba(0,0,0,0.25)]'
        }`}
      />

      {/* 2. Primary Navigation Rail (Z-50) */}
      {/* Sits above everything without projecting top-level overlay shadow onto cards */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-14 z-50 bg-brand-bg/95 backdrop-blur-2xl border-r border-brand-60/80 flex flex-col items-center py-3.5 select-none ${className}`}
      >
        {/* Top Action Controls */}
        <div className="flex flex-col items-center gap-2.5 w-full">
          {topActions.map((action, idx) => {
            const Icon = action.icon;
            const isActive = action.active;

            return (
              <React.Fragment key={idx}>
                {action.divider && <div className="w-7 h-px bg-brand-60/60 my-1" />}
                <button
                  type="button"
                  onClick={action.onClick}
                  title={action.title}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-brand-30/20 text-brand-30 border border-brand-30/40 shadow-sm'
                      : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom Actions (if any provided) */}
        {bottomActions.length > 0 && (
          <div className="mt-auto flex flex-col items-center gap-3">
            {bottomActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={action.onClick}
                  title={action.title}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        )}
      </aside>
    </>
  );
}

export default Rail;
