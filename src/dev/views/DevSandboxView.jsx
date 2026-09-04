import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Sliders, 
  ExternalLink, 
  Trash2,
  Cpu,
  HardDrive,
  Wifi,
  Activity,
  Server,
  Plus,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutTemplate,
  Columns3,
  Maximize2,
  Search
} from 'lucide-react';

import { 
  Button, 
  Input, 
  NumberStepper, 
  Select, 
  Checkbox, 
  ProgressBar, 
  Slider, 
  SlidingPill, 
  Badge, 
  StatPill,
  Card,
  Tooltip,
  useToast 
} from '../../index.js';
import { serviceOptions, clusterNodesData } from '../data/mockData.js';

const DENSITY_PRESETS = [
  {
    id: 'apple',
    name: 'Apple / macOS',
    category: 'Spacious Breathing Room',
    desc: '24px padding, 38px control height, 48px table rows, 16px gaps. Airy & luxurious.',
    cardPad: 'p-6 space-y-5',
    headerPad: 'pb-4 mb-4',
    titleSize: 'text-sm font-bold',
    controlSize: 'lg', // 38px
    controlGap: 'gap-4',
    statGap: 'gap-3 p-3.5',
    statSize: 'md',
    tableThPad: 'py-3.5 pl-3',
    tableTdPad: 'py-3.5 pl-3',
    tableRowHeight: 'h-12 (48px)',
    totalHeightEst: '~580px',
    rowsVisibleEst: '6 rows / screen',
    tagColor: 'blue',
  },
  {
    id: 'vercel',
    name: 'Vercel / Supabase',
    category: 'SaaS Golden Mean (Current Kit Default)',
    desc: '16px padding, 32px standard controls, 32px table rows, 10px gaps. Balanced ergonomic efficiency.',
    cardPad: 'p-4 space-y-3.5',
    headerPad: 'pb-3 mb-3',
    titleSize: 'text-xs font-bold',
    controlSize: 'md', // 32px
    controlGap: 'gap-2.5',
    statGap: 'gap-2 p-2.5',
    statSize: 'md',
    tableThPad: 'py-2 pl-2.5',
    tableTdPad: 'py-2 pl-2.5',
    tableRowHeight: 'h-8 (32px)',
    totalHeightEst: '~410px (-29%)',
    rowsVisibleEst: '12 rows / screen',
    tagColor: 'brand',
  },
  {
    id: 'linear',
    name: 'Linear / Raycast',
    category: 'Developer-First High Density',
    desc: '12px padding, 28px compact controls, 28px table rows, 6px gaps. Precision hairline aesthetics.',
    cardPad: 'p-3 space-y-2.5',
    headerPad: 'pb-2 mb-2',
    titleSize: 'text-[11px] font-bold',
    controlSize: 'sm', // 28px
    controlGap: 'gap-2',
    statGap: 'gap-1.5 p-2',
    statSize: 'sm',
    tableThPad: 'py-1 pl-2',
    tableTdPad: 'py-1 pl-2',
    tableRowHeight: 'h-7 (28px)',
    totalHeightEst: '~320px (-45%)',
    rowsVisibleEst: '18 rows / screen',
    tagColor: 'purple',
  },
  {
    id: 'bloomberg',
    name: 'Grafana / Bloomberg',
    category: 'Ultra-High Density Data Grid',
    desc: '8px padding, 24px micro-controls, 24px table rows, 4px gaps. Maximum data throughput.',
    cardPad: 'p-2 space-y-2',
    headerPad: 'pb-1.5 mb-1.5',
    titleSize: 'text-[10px] font-bold',
    controlSize: 'sm',
    controlGap: 'gap-1.5',
    statGap: 'gap-1 p-1.5',
    statSize: 'sm',
    tableThPad: 'py-0.5 pl-1.5 text-[9px]',
    tableTdPad: 'py-0.5 pl-1.5 text-[11px]',
    tableRowHeight: 'h-6 (24px)',
    totalHeightEst: '~250px (-57%)',
    rowsVisibleEst: '25+ rows / screen',
    tagColor: 'yellow',
  },
];

/**
 * Dev Sandbox: Interactive 4-School Density Comparison Lab
 * Allows testing and comparing Apple, Vercel, Linear, and Bloomberg design densities live.
 */
export function DevSandboxView({
  selectedService,
  setSelectedService,
  refreshInterval,
  setRefreshInterval,
  telemetry,
}) {
  const { cpu, memory, throughput, latency } = telemetry;

  // Active Density School Preset
  const [activePresetId, setActivePresetId] = useState('vercel'); // 'apple' | 'vercel' | 'linear' | 'bloomberg' | 'compare_all'
  const [sandboxSurface, setSandboxSurface] = useState('wallpaper');
  const [sandboxMotion, setSandboxMotion] = useState(true);

  const activePreset = DENSITY_PRESETS.find((p) => p.id === activePresetId) || DENSITY_PRESETS[1];

  // Render a live composable operational node for a given density preset
  const renderDensityModule = (preset) => {
    return (
      <div className={`glass border border-brand-10/10 rounded-xl transition-all ${preset.cardPad}`}>
        {/* Module Header */}
        <div className={`flex flex-wrap items-center justify-between gap-2 border-b border-brand-60/60 ${preset.headerPad}`}>
          <div className="flex items-center gap-2 min-w-0">
            <Server className="w-3.5 h-3.5 text-brand-30 shrink-0" />
            <div className="min-w-0">
              <h4 className={`${preset.titleSize} text-brand-10 uppercase tracking-wide truncate`}>
                Cluster Node Management
              </h4>
              <span className="text-[10px] text-brand-10/50 block truncate">
                {preset.name} Standard &bull; {preset.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Input placeholder="Filter..." size={preset.controlSize} className="w-28 sm:w-36" icon={Search} />
            <Button size={preset.controlSize} variant="glass">Export</Button>
            <Button size={preset.controlSize} variant="primary" leftIcon={<Plus className="w-3 h-3" />}>
              Add
            </Button>
          </div>
        </div>

        {/* Form Controls Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 ${preset.controlGap}`}>
          <Input placeholder="Search endpoint..." size={preset.controlSize} icon={Search} />
          <Select 
            value={selectedService} 
            onChange={setSelectedService} 
            options={serviceOptions} 
            size={preset.controlSize} 
          />
          <NumberStepper 
            value={refreshInterval} 
            onChange={setRefreshInterval} 
            step={50} 
            min={50} 
            max={2000} 
            unit="ms" 
            size={preset.controlSize} 
          />
        </div>

        {/* Realtime StatPills Ribbon */}
        <div className={`flex flex-wrap items-center ${preset.statGap} rounded-lg bg-black/30 border border-white/10`}>
          <StatPill icon={Cpu} label="Compute" value={cpu} unit="%" progress={cpu} color="brand" size={preset.statSize} />
          <StatPill icon={HardDrive} label="RAM" value={memory} unit="%" progress={memory} color="purple" size={preset.statSize} />
          <StatPill icon={Wifi} label="Network" value={throughput} unit="M" color="blue" size={preset.statSize} />
          <StatPill icon={Activity} label="Latency" value={latency} unit="ms" color="green" size={preset.statSize} />
        </div>

        {/* Compact Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="glass-table w-full">
            <thead>
              <tr>
                <th className={preset.tableThPad}>Node ID</th>
                <th className={preset.tableThPad}>Region</th>
                <th className={preset.tableThPad}>Status</th>
                <th className={preset.tableThPad}>Load</th>
                <th className={`${preset.tableThPad} pr-2 text-right`}>Traffic</th>
              </tr>
            </thead>
            <tbody>
              {clusterNodesData.slice(0, activePresetId === 'compare_all' ? 3 : 5).map((node) => (
                <tr key={node.id}>
                  <td className={`${preset.tableTdPad} font-mono font-bold text-brand-10`}>{node.id}</td>
                  <td className={`${preset.tableTdPad} text-brand-10/70`}>{node.region}</td>
                  <td className={preset.tableTdPad}>
                    <Badge color={node.statusColor}>{node.status}</Badge>
                  </td>
                  <td className={preset.tableTdPad}>
                    <div className="w-20">
                      <ProgressBar value={node.load} max={100} color={node.statusColor === 'red' ? 'accent-red' : 'accent-green'} size="sm" />
                    </div>
                  </td>
                  <td className={`${preset.tableTdPad} pr-2 text-right font-mono text-brand-10/80`}>{node.traffic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Architectural Specs Tag */}
        <div className="pt-2 border-t border-brand-60/40 text-[11px] text-brand-10/70 flex flex-wrap justify-between items-center gap-2">
          <span>{preset.desc}</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-brand-10/50 text-[10px]">Height: {preset.totalHeightEst}</span>
            <Badge color={preset.tagColor}>{preset.rowsVisibleEst}</Badge>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. DENSITY PARADIGMS SWITCHER TOOLBAR                                     */}
      {/* ========================================================================= */}
      <div className="glass border border-accent-yellow/40 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-60/60 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-accent-yellow bg-accent-yellow/10 border border-accent-yellow/30 px-2 py-0.5 rounded uppercase tracking-widest">
                Density Paradigms Lab
              </span>
              <span className="text-[10px] font-mono text-brand-10/50">4 INDUSTRY BENCHMARKS</span>
            </div>
            <h3 className="text-base font-bold text-brand-10 mt-1">
              Industry Compactness Benchmark Arena
            </h3>
            <p className="text-xs text-brand-10/70">
              Compare how Apple, Vercel (our standard), Linear, and Bloomberg calibrate whitespace, height, and data density.
            </p>
          </div>

          {/* Density Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-brand-60/80 p-1 rounded-xl border border-brand-60">
            {DENSITY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setActivePresetId(preset.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activePresetId === preset.id
                    ? 'bg-accent-yellow text-brand-bg font-bold shadow-sm'
                    : 'text-brand-10/70 hover:text-brand-10'
                }`}
              >
                {preset.name}
              </button>
            ))}
            <span className="text-brand-10/30 px-1">|</span>
            <button
              type="button"
              onClick={() => setActivePresetId('compare_all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activePresetId === 'compare_all'
                  ? 'bg-brand-30 text-white font-bold shadow-sm'
                  : 'text-brand-10/70 hover:text-brand-10'
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
              Compare All (4-Way Split)
            </button>
          </div>
        </div>

        {/* Dynamic Surface Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-0.5 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-brand-10/60 font-semibold">Test Surface:</span>
            <SlidingPill
              value={sandboxSurface}
              onChange={setSandboxSurface}
              options={[
                { value: 'wallpaper', label: 'Photo' },
                { value: 'gradient', label: 'Gradient' },
                { value: 'light', label: 'Light' },
                { value: 'midnight', label: 'Midnight' },
              ]}
              width="w-72"
            />
          </div>

          <div className="flex items-center gap-4">
            <Checkbox
              checked={sandboxMotion}
              onChange={setSandboxMotion}
              label="Background Motion"
            />
            <span className="text-brand-10/40">|</span>
            <span className="text-brand-10/60 font-mono">
              Live Telemetry: <strong className="text-accent-green">{cpu}% CPU</strong>
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DEMO ARENA (SINGLE VIEW OR 4-WAY SPLIT)                                */}
      {/* ========================================================================= */}
      <div 
        className={`relative rounded-2xl overflow-hidden border border-white/15 p-6 min-h-[480px] transition-all duration-300 ${
          sandboxSurface === 'wallpaper'
            ? 'bg-black/50'
            : sandboxSurface === 'gradient'
            ? (sandboxMotion ? 'animate-sandbox-gradient' : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900')
            : sandboxSurface === 'light'
            ? 'bg-slate-200 text-slate-900 border-slate-300'
            : 'bg-zinc-950 text-white border-zinc-800'
        }`}
      >
        {/* Wallpaper Background Layer */}
        {sandboxSurface === 'wallpaper' && (
          <div 
            className={`absolute inset-0 bg-cover bg-center -z-10 brightness-75 ${sandboxMotion ? 'animate-sandbox-drift scale-110' : ''}`}
            style={{ backgroundImage: "url('/bg.webp')", backgroundPosition: 'center top' }}
          />
        )}

        {/* Mode A: Single Focused Preset */}
        {activePresetId !== 'compare_all' && (
          <div className="space-y-4">
            {/* Header Specs Banner */}
            <div className="glass border border-brand-10/10 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge color={activePreset.tagColor}>{activePreset.name.toUpperCase()}</Badge>
                  <h4 className="text-sm font-bold text-brand-10">{activePreset.category}</h4>
                </div>
                <p className="text-xs text-brand-10/70 mt-1">{activePreset.desc}</p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-brand-10/80">
                <div className="p-2 bg-white/[0.03] border border-white/10 rounded-lg">
                  <span className="text-brand-10/50 block text-[10px]">CONTROLS</span>
                  <strong>{activePreset.controlSize === 'lg' ? '38px' : activePreset.controlSize === 'md' ? '32px' : '28px'}</strong>
                </div>
                <div className="p-2 bg-white/[0.03] border border-white/10 rounded-lg">
                  <span className="text-brand-10/50 block text-[10px]">CARD PAD</span>
                  <strong>{activePreset.id === 'apple' ? '24px' : activePreset.id === 'vercel' ? '16px' : activePreset.id === 'linear' ? '12px' : '8px'}</strong>
                </div>
                <div className="p-2 bg-white/[0.03] border border-white/10 rounded-lg">
                  <span className="text-brand-10/50 block text-[10px]">TABLE ROW</span>
                  <strong>{activePreset.tableRowHeight}</strong>
                </div>
              </div>
            </div>

            {/* Live Rendered Module */}
            {renderDensityModule(activePreset)}
          </div>
        )}

        {/* Mode B: 4-Way Multi-Grid Comparison Side-by-Side */}
        {activePresetId === 'compare_all' && (
          <div className="space-y-4">
            <div className="glass border border-brand-30/40 rounded-xl p-3.5 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-brand-10 uppercase tracking-wide">
                  4-Way Synchronized Density Comparison
                </h4>
                <p className="text-[11px] text-brand-10/60">
                  Inspect the physical height and density footprint difference across all 4 schools simultaneously.
                </p>
              </div>
              <span className="text-xs font-mono text-accent-green font-bold">
                From 580px (Apple) down to 250px (Bloomberg)
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {DENSITY_PRESETS.map((preset) => (
                <div key={preset.id} className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-bold text-brand-10 flex items-center gap-1.5">
                      <Badge color={preset.tagColor}>{preset.name}</Badge>
                      <span className="text-[11px] text-brand-10/60 font-normal">({preset.category})</span>
                    </span>
                    <span className="text-[10px] font-mono text-brand-10/50">
                      Height: {preset.totalHeightEst}
                    </span>
                  </div>
                  {renderDensityModule(preset)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DevSandboxView;
