import React from 'react';

/**
 * Cold Mirror Multi-Tab Navigation (Segmented Tabs on Frosted Glass Surface)
 * Matching the glass background of fields and group cards.
 */
export function SegmentedTabs({
  tabs = [],
  activeTab,
  onChange,
  className = '',
}) {
  return (
    <div
      className={`flex bg-brand-60/60 border border-brand-60 rounded-xl p-1 gap-1 w-full shadow-inner backdrop-blur-md ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange && onChange(tab.id)}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isActive
                ? 'bg-brand-30/20 text-brand-10 border border-brand-30/50 shadow-sm font-bold'
                : 'text-brand-10/60 hover:text-brand-10 hover:bg-brand-60/40 border border-transparent font-semibold'
            }`}
          >
            {Icon && (
              <Icon
                className={`w-3.5 h-3.5 ${
                  isActive ? 'text-brand-30' : 'text-brand-10/50'
                }`}
              />
            )}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedTabs;
