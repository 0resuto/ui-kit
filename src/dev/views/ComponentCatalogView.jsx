import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  RefreshCw, 
  Sparkles, 
  Layers, 
  Sliders, 
  ExternalLink, 
  ShieldAlert, 
  Check,
  Cpu,
  HardDrive,
  Wifi,
  Activity
} from 'lucide-react';
import { 
  Card,
  Button, 
  Input, 
  NumberStepper, 
  Select, 
  Checkbox, 
  ProgressBar, 
  Slider, 
  SlidingPill, 
  SegmentedTabs, 
  Badge, 
  StatPill,
  Tooltip, 
  useToast 
} from '../../index.js';
import { colorOptions, serviceOptions, clusterNodesData } from '../data/mockData.js';

/**
 * Official UI Component Explorer & Reference Catalog
 * Renders live interactive test matrices for all components in the library.
 */
export function ComponentCatalogView({
  selectedService,
  setSelectedService,
  onOpenConfirmModal,
  onOpenFormModal,
}) {
  const toast = useToast();

  // Component Catalog Interactive States
  const [btnLoading, setBtnLoading] = useState(false);
  const [kitBarVal, setKitBarVal] = useState(72);
  const [kitBarColor, setKitBarColor] = useState('brand-30');
  const [kitBarSize, setKitBarSize] = useState('md');
  const [kitGlow, setKitGlow] = useState(true);
  const [kitPulse, setKitPulse] = useState(false);
  const [demoCheckbox1, setDemoCheckbox1] = useState(true);
  const [demoCheckbox2, setDemoCheckbox2] = useState(false);
  const [demoPillVal, setDemoPillVal] = useState('daily');
  const [demoActiveTab, setDemoActiveTab] = useState('security');

  return (
    <div className="space-y-8">
      {/* SECTION 1: Universal Action Buttons Matrix */}
      <div className="glass border border-brand-10/10 rounded-2xl p-6 space-y-5">
        <div className="border-b border-brand-60/60 pb-3 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-brand-30 uppercase tracking-widest">
              Interactive Actions
            </span>
            <h3 className="text-base font-bold text-brand-10">
              Button Component (5 Variants & 3 Sizes)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="glass"
              onClick={() => {
                setBtnLoading(true);
                setTimeout(() => setBtnLoading(false), 1500);
              }}
            >
              <RefreshCw className="w-3 h-3" />
              Test Loading
            </Button>
            <span className="text-xs font-mono text-accent-green">&lt;Button /&gt;</span>
          </div>
        </div>

        {/* Variants Row */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-brand-10/80 block">Official Variants Matrix:</label>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" isLoading={btnLoading} leftIcon={<Sparkles className="w-4 h-4" />}>
              Primary Action
            </Button>
            <Button variant="glass" isLoading={btnLoading} leftIcon={<Sparkles className="w-4 h-4 text-sky-400" />}>
              Glass Lens
            </Button>
            <Button variant="minimal" isLoading={btnLoading} leftIcon={<Layers className="w-4 h-4 text-white/70" />}>
              Dark Minimal
            </Button>
            <Button variant="secondary" isLoading={btnLoading} leftIcon={<Sliders className="w-4 h-4" />}>
              Secondary Solid
            </Button>
            <Button variant="ghost" isLoading={btnLoading} leftIcon={<ExternalLink className="w-4 h-4" />}>
              Ghost Link
            </Button>
            <Button variant="danger" isLoading={btnLoading} leftIcon={<Trash2 className="w-4 h-4" />}>
              Danger Action
            </Button>
            <Button variant="primary" size="icon" title="Quick Add">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Sizes Row */}
        <div className="pt-2 border-t border-brand-60/40 space-y-2">
          <label className="text-xs font-semibold text-brand-10/80 block">Control Heights & Sizes:</label>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" variant="glass">Small (28px)</Button>
            <Button size="md" variant="glass">Medium (32px Standard)</Button>
            <Button size="lg" variant="glass">Large (38px)</Button>
          </div>
        </div>
      </div>

      {/* SECTION 2: Overlay Dialogs (Modal) & Floating Toasts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Modal Dialog Sandbox */}
        <div className="glass border border-brand-10/10 rounded-2xl p-6 space-y-4">
          <div className="border-b border-brand-60/60 pb-3 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-accent-purple uppercase tracking-widest">
                Overlay Dialogs
              </span>
              <h3 className="text-base font-bold text-brand-10">
                Modal / Dialog Windows
              </h3>
            </div>
            <span className="text-xs font-mono text-accent-purple">&lt;Modal /&gt;</span>
          </div>

          <p className="text-xs text-brand-10/70 leading-relaxed">
            Accessible, keyboard-aware dialogs rendered via <code className="text-brand-30 font-mono">createPortal</code> with dark blur backdrop and escape listener.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              variant="primary"
              onClick={onOpenFormModal}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Open Form Modal
            </Button>
            <Button
              variant="danger"
              onClick={onOpenConfirmModal}
              leftIcon={<ShieldAlert className="w-4 h-4" />}
            >
              Open Danger Prompt
            </Button>
          </div>
        </div>

        {/* Toast Notifications Sandbox */}
        <div className="glass border border-brand-10/10 rounded-2xl p-6 space-y-4">
          <div className="border-b border-brand-60/60 pb-3 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-accent-green uppercase tracking-widest">
                Feedback Stack
              </span>
              <h3 className="text-base font-bold text-brand-10">
                Toast Notifications
              </h3>
            </div>
            <span className="text-xs font-mono text-accent-green">useToast()</span>
          </div>

          <p className="text-xs text-brand-10/70 leading-relaxed">
            Stackable frosted acrylic toasts with auto-dismiss timers, status beacons, and hover pause.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <Button
              variant="glass"
              size="sm"
              className="text-accent-green border-accent-green/30 hover:border-accent-green"
              onClick={() => toast.success('Node Deployed', 'Cluster node us-east-srv-05 is online and healthy.')}
            >
              Success
            </Button>
            <Button
              variant="glass"
              size="sm"
              className="text-accent-red border-accent-red/30 hover:border-accent-red"
              onClick={() => toast.error('Ingest Gateway Failed', 'HTTP 503 Service Unavailable.')}
            >
              Error
            </Button>
            <Button
              variant="glass"
              size="sm"
              className="text-accent-yellow border-accent-yellow/30 hover:border-accent-yellow"
              onClick={() => toast.warning('High Load Warning', 'CPU load reached 92% threshold.')}
            >
              Warning
            </Button>
            <Button
              variant="glass"
              size="sm"
              className="text-accent-blue border-accent-blue/30 hover:border-accent-blue"
              onClick={() => toast.info('Snapshot Saved', 'Background sync finished.', {
                action: { label: 'View File', onClick: () => alert('Viewing snapshot file') }
              })}
            >
              Info
            </Button>
          </div>
        </div>
      </div>

      {/* SECTION 3: Interactive ProgressBar Component Sandbox */}
      <div className="glass border border-brand-10/10 rounded-2xl p-6 space-y-4">
        <div className="border-b border-brand-60/60 pb-3 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-brand-30 uppercase tracking-widest">
              Data Visualization
            </span>
            <h3 className="text-base font-bold text-brand-10">
              ProgressBar Component with Dynamic Matching Glow
            </h3>
          </div>
          <span className="text-xs font-mono text-accent-green">&lt;ProgressBar /&gt;</span>
        </div>

        <div className="space-y-3">
          <ProgressBar
            value={kitBarVal}
            max={100}
            color={kitBarColor}
            glow={kitGlow}
            pulse={kitPulse}
            size={kitBarSize}
          />

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-10/80">Preset Color & Glow:</label>
              <Select
                value={kitBarColor}
                onChange={setKitBarColor}
                options={colorOptions}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-10/80">
                Value ({kitBarVal}%):
              </label>
              <Slider value={kitBarVal} onChange={setKitBarVal} min={0} max={100} />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-10/80">Bar Height:</label>
              <div className="flex gap-1 pt-0.5">
                {['sm', 'md', 'lg'].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setKitBarSize(sz)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                      kitBarSize === sz
                        ? 'bg-brand-30/20 text-brand-10 border-brand-30/50'
                        : 'bg-brand-60 text-brand-10/60 border-brand-60 hover:text-brand-10'
                    }`}
                  >
                    {sz.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Checkbox
                checked={kitGlow}
                onChange={setKitGlow}
                label="Glow"
              />
              <Checkbox
                checked={kitPulse}
                onChange={setKitPulse}
                label="Pulse"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Input & Form Controls Matrix */}
      <div className="glass border border-brand-10/10 rounded-2xl p-6 space-y-4">
        <div className="border-b border-brand-60/60 pb-3">
          <span className="text-[10px] font-bold text-accent-blue uppercase tracking-widest">
            Form Controls (Inputs, Steppers & Checkboxes)
          </span>
          <h3 className="text-base font-bold text-brand-10">
            Input, NumberStepper & Checkbox Components
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-10/80">Text Input with Clear (X):</label>
            <Input placeholder="Type something..." defaultValue="Sample text value" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-10/80">NumberStepper with Custom +/-:</label>
            <NumberStepper value={42} step={1} min={0} max={100} unit="units" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-10/80">Frosted Glass Select:</label>
            <Select
              value={selectedService}
              onChange={setSelectedService}
              options={serviceOptions}
            />
          </div>
        </div>

        {/* Dedicated Checkbox Test Grid */}
        <div className="pt-3 border-t border-brand-60/40">
          <label className="text-xs font-semibold text-brand-10/80 block mb-2">Branded Checkbox States:</label>
          <div className="flex flex-wrap items-center gap-6">
            <Checkbox
              checked={demoCheckbox1}
              onChange={setDemoCheckbox1}
              label="Checked Option"
              description="With active brand glow"
            />
            <Checkbox
              checked={demoCheckbox2}
              onChange={setDemoCheckbox2}
              label="Unchecked Option"
              description="Default glass border"
            />
            <Checkbox
              checked={true}
              disabled={true}
              label="Disabled Active"
            />
            <Checkbox
              checked={false}
              disabled={true}
              label="Disabled Inactive"
            />
          </div>
        </div>
      </div>

      {/* SECTION 5: Switches & Multi-Tab Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass border border-brand-10/10 rounded-2xl p-6 space-y-4">
          <div className="border-b border-brand-60/60 pb-3">
            <span className="text-[10px] font-bold text-accent-yellow uppercase tracking-widest">
              2-Position Switch
            </span>
            <h3 className="text-base font-bold text-brand-10">
              SlidingPill Capsule Switcher
            </h3>
          </div>

          <div className="space-y-3">
            <SlidingPill
              value={demoPillVal}
              onChange={setDemoPillVal}
              options={[
                { value: 'daily', label: 'Daily Rollup' },
                { value: 'hourly', label: 'Hourly Ticks' },
              ]}
              width="w-full"
            />
            <p className="text-xs text-brand-10/60">
              Active Value: <code className="text-brand-30 font-mono font-bold">{demoPillVal}</code>
            </p>
          </div>
        </div>

        <div className="glass border border-brand-10/10 rounded-2xl p-6 space-y-4">
          <div className="border-b border-brand-60/60 pb-3">
            <span className="text-[10px] font-bold text-accent-green uppercase tracking-widest">
              Multi-Tab Segmented Control
            </span>
            <h3 className="text-base font-bold text-brand-10">
              SegmentedTabs (3+ Items)
            </h3>
          </div>

          <div className="space-y-3">
            <SegmentedTabs
              value={demoActiveTab}
              onChange={setDemoActiveTab}
              tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'security', label: 'Security' },
                { id: 'audit', label: 'Audit Log' },
              ]}
            />
            <p className="text-xs text-brand-10/60">
              Active Segment: <code className="text-accent-green font-mono font-bold">{demoActiveTab}</code>
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 6: Status Indicators, Badges & StatPills */}
      <div className="glass border border-brand-10/10 rounded-2xl p-6 space-y-6">
        <div className="border-b border-brand-60/60 pb-3 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-brand-30 uppercase tracking-widest">
              Indicators & Metric Badges
            </span>
            <h3 className="text-base font-bold text-brand-10">
              Badge & StatPill Components (Contextual Signals & Micro-Metrics)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-accent-green">&lt;StatPill /&gt;</span>
            <span className="text-xs font-mono text-brand-30">&lt;Badge /&gt;</span>
          </div>
        </div>

        {/* 1. Standard Status Badges */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-brand-10/80 block">Status Badges (Pulsing Beacon & Static):</label>
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip content="All operational services operating within parameters" position="top">
              <Badge color="green" beacon={true}>SYSTEM ONLINE</Badge>
            </Tooltip>
            <Tooltip content="Critical kernel memory pressure detected on node" position="top">
              <Badge color="red" beacon={true}>CRITICAL ALERT</Badge>
            </Tooltip>
            <Tooltip content="Node is operating at baseline efficiency" position="top">
              <Badge color="purple">OPTIMAL STATE</Badge>
            </Tooltip>
            <Tooltip content="3 tasks waiting in queue" position="top">
              <Badge color="yellow">QUEUED TASK</Badge>
            </Tooltip>
            <Tooltip content="Database replica in sync" position="top">
              <Badge color="blue">SYNCED</Badge>
            </Tooltip>
            <Tooltip content="Primary election leader node" position="top">
              <Badge color="brand">PRIMARY LEADER</Badge>
            </Tooltip>
            <Tooltip content="Instance is decommissioned" position="top">
              <Badge color="neutral" active={false}>OFFLINE DORMANT</Badge>
            </Tooltip>
          </div>
        </div>

        {/* 2. Atomic StatPill Component Matrix */}
        <div className="pt-4 border-t border-brand-60/40 space-y-2.5">
          <div className="flex justify-between items-baseline">
            <label className="text-xs font-semibold text-brand-10/80">
              Compact StatPill Metric Capsules (Height 28px standard):
            </label>
            <span className="text-[11px] text-white/50">Combines icon + label + tabular value + progress bar</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <StatPill
              icon={Cpu}
              label="Compute"
              value={42.4}
              unit="%"
              progress={42}
              color="brand"
              beacon={true}
            />
            <StatPill
              icon={HardDrive}
              label="Memory"
              value={68.2}
              unit="%"
              progress={68}
              color="purple"
            />
            <StatPill
              icon={Wifi}
              label="Throughput"
              value={840}
              unit="MB/s"
              color="blue"
            />
            <StatPill
              icon={Activity}
              label="P99 Latency"
              value={14.2}
              unit="ms"
              color="green"
            />
            <StatPill
              label="Nodes Online"
              value="12 / 12"
              color="neutral"
            />
            <StatPill
              label="Compact Size"
              value="24px"
              size="sm"
              color="yellow"
            />
          </div>
        </div>
      </div>

      {/* SECTION 7: Universal Card Containers with Action Slots */}
      <div className="space-y-4">
        <div className="border-b border-brand-60/60 pb-3 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-accent-purple uppercase tracking-widest">
              Layout Surfaces
            </span>
            <h3 className="text-base font-bold text-brand-10">
              Card Component (Standard 16px Padding & Header Actions Slot)
            </h3>
          </div>
          <span className="text-xs font-mono text-accent-purple">&lt;Card /&gt;</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card
            title="Service Cluster Overview"
            subtitle="Live monitoring metrics"
            icon={Cpu}
            actions={
              <div className="flex items-center gap-2">
                <Input placeholder="Filter..." size="sm" className="w-32" />
                <Button size="sm" variant="primary" leftIcon={<Plus className="w-3 h-3" />}>
                  Add Node
                </Button>
              </div>
            }
          >
            <div className="p-4 rounded-xl bg-white/[0.02] border border-brand-60/40 text-xs text-brand-10/70 space-y-2">
              <p>Card container automatically handles single-line title + actions layout, saving ~40px of vertical space.</p>
              <div className="flex gap-2">
                <StatPill label="State" value="Optimal" color="green" size="sm" />
                <StatPill label="Replicas" value="4" color="blue" size="sm" />
              </div>
            </div>
          </Card>

          <Card
            title="Sub-Container Card"
            subtitle="Secondary acrylic variant"
            variant="card"
            padding="sm"
            actions={<Badge color="purple">VARIANT: CARD</Badge>}
          >
            <div className="p-3 rounded-lg bg-black/20 text-xs text-brand-10/70">
              Nested compact container with tight 12px padding for high-density sidebars and dashboards.
            </div>
          </Card>
        </div>
      </div>

      {/* SECTION 8: Glass Table Utilities */}
      <div className="glass border border-brand-10/10 rounded-2xl p-6 space-y-4">
        <div className="border-b border-brand-60/60 pb-3 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-accent-blue uppercase tracking-widest">
              Data Density Utilities
            </span>
            <h3 className="text-base font-bold text-brand-10">
              Glass Table Utilities (.glass-table .table-compact)
            </h3>
          </div>
          <span className="text-xs font-mono text-accent-blue">.glass-table</span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="glass-table table-compact">
            <thead>
              <tr>
                <th className="pl-2">Node Identifier</th>
                <th>Region</th>
                <th>Status</th>
                <th>Compute Load</th>
                <th className="pr-2 text-right">Throughput</th>
              </tr>
            </thead>
            <tbody>
              {clusterNodesData.map((node) => (
                <tr key={node.id}>
                  <td className="pl-2 font-mono font-bold text-brand-10">{node.id}</td>
                  <td className="text-brand-10/70">{node.region}</td>
                  <td>
                    <Badge color={node.statusColor}>{node.status}</Badge>
                  </td>
                  <td>
                    <div className="w-24">
                      <ProgressBar value={node.load} max={100} color={node.statusColor === 'red' ? 'accent-red' : 'accent-green'} size="sm" />
                    </div>
                  </td>
                  <td className="pr-2 text-right font-mono text-brand-10/80">{node.traffic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ComponentCatalogView;
