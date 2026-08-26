import React from 'react';
import { 
  LayoutDashboard, 
  LayoutGrid, 
  FlaskConical, 
  Code, 
  Server, 
  Image as ImageIcon 
} from 'lucide-react';
import { Tooltip, Badge } from '../../index.js';

/**
 * Top Application Header Bar
 * Features status telemetry beacons, infrastructure breadcrumb, wallpaper toggle, and 4-way view switcher.
 */
export function HeaderBar({
  viewMode,
  setViewMode,
  selectedService,
  showBackground,
  setShowBackground,
}) {
  return (
    <header className="glass border border-brand-10/10 rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
      {/* Left Telemetry & Status Badges */}
      <div className="flex items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Tooltip content="All 12 cluster nodes active with 0% packet loss" position="bottom">
            <Badge color="green" beacon={true}>SYSTEM HEALTHY</Badge>
          </Tooltip>
          <Tooltip content="UI Kit Standalone Core Version" position="bottom">
            <Badge color="purple">BUILD v0.1.0</Badge>
          </Tooltip>
        </div>

        <div className="h-5 w-px bg-brand-60 hidden sm:block" />

        <div className="hidden md:flex items-center gap-2 text-xs text-brand-10/70 font-medium">
          <span className="text-brand-10 font-bold flex items-center gap-1">
            <Server className="w-3.5 h-3.5 text-brand-30" /> Infrastructure
          </span>
          <span>&bull;</span>
          <span>{selectedService}</span>
          <span>&bull;</span>
          <span className="text-sky-200">12 Nodes Online</span>
        </div>
      </div>

      {/* Right Controls & View Switcher */}
      <div className="flex items-center gap-2">
        {/* Quick Wallpaper Toggle */}
        <Tooltip content="Toggle Background Image" position="bottom">
          <button
            type="button"
            onClick={() => setShowBackground((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs transition-all border flex items-center gap-1.5 cursor-pointer ${
              showBackground
                ? 'bg-brand-30/20 text-brand-10 border-brand-30/50 shadow-[0_0_12px_rgba(230,57,70,0.2)] font-bold'
                : 'bg-brand-60/60 text-brand-10/50 hover:text-brand-10 border-brand-60'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Wallpaper</span>
          </button>
        </Tooltip>

        {/* 4-Way Primary View Switcher */}
        <nav className="flex items-center gap-1 bg-brand-60/60 border border-brand-60 p-1 rounded-xl shadow-inner backdrop-blur-md">
          <button
            type="button"
            onClick={() => setViewMode('dashboard')}
            className={`px-3.5 py-1.5 rounded-lg text-xs transition-all border flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'dashboard'
                ? 'bg-brand-30/20 text-brand-10 border-brand-30/60 shadow-[0_0_15px_rgba(230,57,70,0.2)] font-bold'
                : 'text-brand-10/70 hover:text-brand-10 border-transparent'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Live Dashboard
          </button>

          <button
            type="button"
            onClick={() => setViewMode('components')}
            className={`px-3.5 py-1.5 rounded-lg text-xs transition-all border flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'components'
                ? 'bg-brand-30/20 text-brand-10 border-brand-30/60 shadow-[0_0_15px_rgba(230,57,70,0.2)] font-bold'
                : 'text-brand-10/70 hover:text-brand-10 border-transparent'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            UI Components
          </button>

          <button
            type="button"
            onClick={() => setViewMode('sandbox')}
            className={`px-3.5 py-1.5 rounded-lg text-xs transition-all border flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'sandbox'
                ? 'bg-accent-yellow/20 text-accent-yellow border-accent-yellow/60 shadow-[0_0_15px_rgba(245,158,11,0.2)] font-bold'
                : 'text-brand-10/70 hover:text-brand-10 border-transparent'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5 text-accent-yellow" />
            Dev Sandbox
          </button>

          <button
            type="button"
            onClick={() => setViewMode('tokens')}
            className={`px-3.5 py-1.5 rounded-lg text-xs transition-all border flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'tokens'
                ? 'bg-brand-30/20 text-brand-10 border-brand-30/60 shadow-[0_0_15px_rgba(230,57,70,0.2)] font-bold'
                : 'text-brand-10/70 hover:text-brand-10 border-transparent'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Tokens Spec
          </button>
        </nav>
      </div>
    </header>
  );
}

export default HeaderBar;
