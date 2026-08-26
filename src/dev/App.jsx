import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  LayoutDashboard, 
  LayoutGrid, 
  FlaskConical, 
  Sliders, 
  Activity, 
  Image as ImageIcon 
} from 'lucide-react';

import { 
  ToastProvider, 
  Rail, 
  Drawer, 
  SidebarCard, 
  Checkbox, 
  Slider, 
  NumberStepper, 
  SlidingPill 
} from '../index.js';

import { useTelemetry } from './hooks/useTelemetry.js';
import { HeaderBar } from './components/HeaderBar.jsx';
import { DevModals } from './components/DevModals.jsx';
import { DashboardView } from './views/DashboardView.jsx';
import { ComponentCatalogView } from './views/ComponentCatalogView.jsx';
import { DevSandboxView } from './views/DevSandboxView.jsx';
import { TokensSpecView } from './views/TokensSpecView.jsx';

/**
 * Root Developer Showcase & Sandbox Application
 * Clean declarative coordinator orchestrating modular views and the OOP telemetry engine.
 */
function DashboardApp() {
  // Navigation & Primary View Mode
  const [viewMode, setViewMode] = useState('dashboard'); // 'dashboard' | 'components' | 'sandbox' | 'tokens'

  // Global Settings & Sidebar Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [bgImageOpacity, setBgImageOpacity] = useState(45);

  // Live Telemetry Loop Configuration
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(500);
  const telemetry = useTelemetry(autoRefresh, refreshInterval);

  // Dashboard Filters & Table Mode
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('Production Cluster (US-East)');
  const [tableMode, setTableMode] = useState('overview');

  // Modal Dialog States
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalNodeName, setModalNodeName] = useState('us-east-srv-09');
  const [modalReplicas, setModalReplicas] = useState(4);
  const [modalTier, setModalTier] = useState('Compute Gateway (EU-Central)');
  const [modalAutoScaling, setModalAutoScaling] = useState(true);

  // Navigation Rail Top Actions Configuration
  const railTopActions = [
    {
      icon: SlidersHorizontal,
      title: 'Open Settings Drawer',
      active: isDrawerOpen,
      onClick: () => setIsDrawerOpen((prev) => !prev),
    },
    {
      icon: ImageIcon,
      title: showBackground ? 'Hide Wallpaper' : 'Show Wallpaper',
      active: showBackground,
      divider: true,
      onClick: () => setShowBackground((prev) => !prev),
    },
    {
      icon: LayoutDashboard,
      title: 'Dashboard Overview',
      active: viewMode === 'dashboard',
      onClick: () => setViewMode('dashboard'),
    },
    {
      icon: LayoutGrid,
      title: 'Component Explorer',
      active: viewMode === 'components',
      onClick: () => setViewMode('components'),
    },
    {
      icon: FlaskConical,
      title: 'Dev Sandbox / Lab',
      active: viewMode === 'sandbox',
      onClick: () => setViewMode('sandbox'),
    },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-10 font-exo font-light select-none relative overflow-x-hidden">
      {/* Background Image Wallpaper Layer */}
      {showBackground && (
        <div
          className="fixed inset-0 z-0 pointer-events-none bg-cover bg-center transition-opacity duration-300"
          style={{
            backgroundImage: "url('/bg.webp')",
            opacity: bgImageOpacity / 100,
          }}
        />
      )}
      
      {/* Fixed Left Navigation Rail (z-50) */}
      <Rail topActions={railTopActions} isDrawerOpen={isDrawerOpen} />

      {/* Slide-Out Settings & Parameters Drawer (z-40) */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Settings"
        subtitle="Global Playground Controls"
        footerText="UI Kit Core Engine"
      >
        {/* Card 1: Background Wallpaper Controls */}
        <SidebarCard title="Wallpaper Background" icon={ImageIcon}>
          <div className="space-y-3.5">
            <Checkbox
              checked={showBackground}
              onChange={setShowBackground}
              label="Show Background Image"
              description="Toggle /bg.webp wallpaper layer"
              className="w-full justify-between flex-row-reverse"
            />

            {showBackground && (
              <div className="pt-2 space-y-1.5 border-t border-brand-60/40">
                <div className="flex justify-between text-xs text-white/80">
                  <span>Wallpaper Opacity</span>
                  <span className="tabular-nums text-brand-30 font-bold">{bgImageOpacity}%</span>
                </div>
                <Slider
                  value={bgImageOpacity}
                  onChange={setBgImageOpacity}
                  min={10}
                  max={100}
                />
              </div>
            )}
          </div>
        </SidebarCard>

        {/* Card 2: Live Stream Polling Rate */}
        <SidebarCard title="Stream Telemetry" icon={Activity}>
          <div className="space-y-3.5">
            <Checkbox
              checked={autoRefresh}
              onChange={setAutoRefresh}
              label="Live Tick Loop"
              description="Real-time live telemetry stream"
              className="w-full justify-between flex-row-reverse"
            />

            {autoRefresh && (
              <div className="pt-2 border-t border-brand-60/40 flex items-center justify-between">
                <span className="text-xs text-white/80 font-medium">Tick Interval:</span>
                <NumberStepper
                  value={refreshInterval}
                  onChange={setRefreshInterval}
                  step={50}
                  min={50}
                  max={2000}
                  unit="ms"
                  className="w-32"
                />
              </div>
            )}
          </div>
        </SidebarCard>

        {/* Card 3: Table Mode Switcher */}
        <SidebarCard title="Data Visualization" icon={Sliders}>
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-white/80">Table View Mode:</span>
            <SlidingPill
              value={tableMode}
              onChange={setTableMode}
              options={[
                { value: 'overview', label: 'Overview' },
                { value: 'metrics', label: 'Metrics' },
              ]}
              width="w-full"
            />
          </div>
        </SidebarCard>
      </Drawer>

      {/* Main Workspace Stage (Layered at z-10 above background shadow) */}
      <main className="pl-14 sm:pl-16 pr-4 sm:pr-8 py-5 transition-all duration-300 relative z-10">
        {/* Top Header & View Navigation Bar */}
        <HeaderBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedService={selectedService}
          showBackground={showBackground}
          setShowBackground={setShowBackground}
        />

        {/* View 1: Production Telemetry Dashboard */}
        {viewMode === 'dashboard' && (
          <DashboardView
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            tableMode={tableMode}
            setTableMode={setTableMode}
            telemetry={telemetry}
          />
        )}

        {/* View 2: Official UI Component Catalog */}
        {viewMode === 'components' && (
          <ComponentCatalogView
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            onOpenConfirmModal={() => setIsConfirmModalOpen(true)}
            onOpenFormModal={() => setIsFormModalOpen(true)}
          />
        )}

        {/* View 3: Dev Sandbox & Evaluation Lab */}
        {viewMode === 'sandbox' && (
          <DevSandboxView
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            refreshInterval={refreshInterval}
            setRefreshInterval={setRefreshInterval}
            telemetry={telemetry}
          />
        )}

        {/* View 4: Tokens Specification */}
        {viewMode === 'tokens' && <TokensSpecView />}
      </main>

      {/* Dev Playground Dialogs */}
      <DevModals
        isConfirmModalOpen={isConfirmModalOpen}
        setIsConfirmModalOpen={setIsConfirmModalOpen}
        isFormModalOpen={isFormModalOpen}
        setIsFormModalOpen={setIsFormModalOpen}
        modalNodeName={modalNodeName}
        setModalNodeName={setModalNodeName}
        modalReplicas={modalReplicas}
        setModalReplicas={setModalReplicas}
        modalTier={modalTier}
        setModalTier={setModalTier}
        modalAutoScaling={modalAutoScaling}
        setModalAutoScaling={setModalAutoScaling}
      />
    </div>
  );
}

export function App() {
  return (
    <ToastProvider position="bottom-right">
      <DashboardApp />
    </ToastProvider>
  );
}

export default App;
