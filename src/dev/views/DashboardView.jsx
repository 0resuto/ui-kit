import React from 'react';
import { 
  Cpu, 
  HardDrive, 
  Wifi, 
  Activity, 
  ExternalLink,
  Server,
  Database,
  Radio,
  Search
} from 'lucide-react';
import { 
  Card,
  Input, 
  Select, 
  SlidingPill, 
  ProgressBar, 
  Badge,
  StatPill 
} from '../../index.js';
import { serviceOptions, clusterNodesData } from '../data/mockData.js';

/**
 * Production Telemetry Dashboard View
 * Standardized to the Vercel / Supabase Balanced Density Standard (16px padding, 32px controls, 32px table rows).
 */
export function DashboardView({
  searchQuery,
  setSearchQuery,
  selectedService,
  setSelectedService,
  tableMode,
  setTableMode,
  telemetry,
}) {
  const { cpu, memory, throughput, latency, ch1, ch2, ch3 } = telemetry;

  // Filter nodes based on active search query
  const filteredNodes = clusterNodesData.filter((node) => 
    node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Top Filter Controls (Standard 32px inputs + 16px padding) */}
      <Card padding="md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cluster, service, endpoint..."
            icon={Search}
          />

          <Select
            value={selectedService}
            onChange={setSelectedService}
            options={serviceOptions}
          />

          <div className="flex items-center justify-end gap-2.5">
            <span className="text-xs text-brand-10/70 font-semibold hidden lg:inline">
              Table Mode:
            </span>
            <SlidingPill
              value={tableMode}
              onChange={setTableMode}
              options={[
                { value: 'overview', label: 'Overview' },
                { value: 'metrics', label: 'Metrics' },
              ]}
              width="w-48"
            />
          </div>
        </div>
      </Card>

      {/* KPI Metric Summary Cards (Standard 16px padding & 12px gap) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* CPU Metric Card */}
        <Card padding="md" className="space-y-2.5">
          <div className="flex justify-between items-center text-xs font-semibold text-brand-10/70">
            <span className="flex items-center gap-1.5 uppercase tracking-wider font-bold">
              <Cpu className="w-4 h-4 text-brand-30" />
              Compute Load
            </span>
            <span className="tabular-nums font-bold text-brand-10">{cpu}%</span>
          </div>
          <div className="text-2xl font-extrabold text-brand-10 tracking-tight flex items-baseline gap-1.5">
            <span className="tabular-nums">{cpu}.4</span>
            <span className="text-xs font-normal text-brand-10/50">vCPU</span>
          </div>
          <ProgressBar value={cpu} max={100} color="brand-30" glow={true} size="sm" />
        </Card>

        {/* Memory Metric Card */}
        <Card padding="md" className="space-y-2.5">
          <div className="flex justify-between items-center text-xs font-semibold text-brand-10/70">
            <span className="flex items-center gap-1.5 uppercase tracking-wider font-bold">
              <HardDrive className="w-4 h-4 text-accent-purple" />
              Memory Pool
            </span>
            <span className="tabular-nums font-bold text-brand-10">{memory}%</span>
          </div>
          <div className="text-2xl font-extrabold text-brand-10 tracking-tight flex items-baseline gap-1.5">
            <span className="tabular-nums">{(memory * 0.62).toFixed(1)}</span>
            <span className="text-xs font-normal text-brand-10/50">GB / 64 GB</span>
          </div>
          <ProgressBar value={memory} max={100} color="accent-purple" glow={true} size="sm" />
        </Card>

        {/* Network Throughput Card */}
        <Card padding="md" className="space-y-2.5">
          <div className="flex justify-between items-center text-xs font-semibold text-brand-10/70">
            <span className="flex items-center gap-1.5 uppercase tracking-wider font-bold">
              <Wifi className="w-4 h-4 text-accent-blue" />
              Throughput
            </span>
            <span className="text-accent-blue font-bold text-xs">Optimal</span>
          </div>
          <div className="text-2xl font-extrabold text-brand-10 tracking-tight flex items-baseline gap-1.5">
            <span className="tabular-nums">{throughput}</span>
            <span className="text-xs font-normal text-brand-10/50">MB/s</span>
          </div>
          <ProgressBar value={Math.min(100, Math.round(throughput / 10))} max={100} color="accent-blue" glow={true} size="sm" />
        </Card>

        {/* P99 Latency Card */}
        <Card padding="md" className="space-y-2.5">
          <div className="flex justify-between items-center text-xs font-semibold text-brand-10/70">
            <span className="flex items-center gap-1.5 uppercase tracking-wider font-bold">
              <Activity className="w-4 h-4 text-accent-green" />
              P99 Latency
            </span>
            <span className="tabular-nums font-bold text-accent-green">{latency} ms</span>
          </div>
          <div className="text-2xl font-extrabold text-accent-green tracking-tight flex items-baseline gap-1.5">
            <span className="tabular-nums">{latency}</span>
            <span className="text-xs font-normal text-brand-10/50">ms</span>
          </div>
          <ProgressBar value={Math.min(100, Math.round(latency * 4))} max={100} color="accent-green" glow={true} size="sm" />
        </Card>
      </div>

      {/* Real-time Multi-Channel Feed & Storage Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Dynamic Telemetry Channels */}
        <div className="lg:col-span-2">
          <Card
            title="Live Data Stream Telemetry"
            subtitle="Streaming live metrics with matching glow tokens"
            icon={Radio}
            actions={<Badge color="green" beacon={true}>60 FPS TICK</Badge>}
            padding="md"
          >
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-brand-10">Channel 01 &bull; Ingestion Pipeline</span>
                  <span className="tabular-nums text-brand-30 font-bold">{ch1}%</span>
                </div>
                <ProgressBar value={ch1} max={100} color="brand-30" glow={true} pulse={true} />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-brand-10">Channel 02 &bull; Compute Worker Pool</span>
                  <span className="tabular-nums text-accent-green font-bold">{ch2}%</span>
                </div>
                <ProgressBar value={ch2} max={100} color="accent-green" glow={true} pulse={true} />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-brand-10">Channel 03 &bull; Distributed Storage Bus</span>
                  <span className="tabular-nums text-accent-blue font-bold">{ch3}%</span>
                </div>
                <ProgressBar value={ch3} max={100} color="accent-blue" glow={true} pulse={false} />
              </div>
            </div>
          </Card>
        </div>

        {/* Compact Storage Allocation Breakdown */}
        <div>
          <Card
            title="Storage Allocation"
            subtitle="NVMe High Performance Pool"
            icon={Database}
            padding="md"
            footer={
              <div className="flex justify-between items-center w-full">
                <span>Redundancy: <strong className="text-brand-10">RAID 10</strong></span>
                <Badge color="blue">ENCRYPTED</Badge>
              </div>
            }
          >
            <div className="space-y-2.5 py-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-brand-10/70">Pool Capacity:</span>
                <span className="text-sm font-bold text-brand-10 tabular-nums">1.84 TB / 3.0 TB</span>
              </div>
              <ProgressBar value={61} max={100} color="accent-yellow" glow={true} size="md" />
              <div className="flex justify-between text-[10px] text-brand-10/50">
                <span>0 TB</span>
                <span className="text-accent-yellow font-bold">~61% of 3.0 TB capacity</span>
                <span>3.0 TB Max</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Cluster Nodes Status Table */}
      <Card
        title="Active Cluster Node Topology"
        subtitle={`Showing ${filteredNodes.length} nodes matching active filters`}
        icon={Server}
        actions={
          <span className="text-xs font-mono text-brand-10/50">Live Sync (60 FPS)</span>
        }
        padding="md"
      >
        <div className="overflow-x-auto custom-scrollbar">
          <table className="glass-table table-compact">
            <thead>
              <tr>
                <th className="pl-2">Node ID</th>
                <th>Region</th>
                <th>Status</th>
                <th>Load</th>
                <th>Uptime</th>
                <th className="pr-2 text-right">Traffic</th>
              </tr>
            </thead>
            <tbody>
              {filteredNodes.map((node) => (
                <tr key={node.id}>
                  <td className="pl-2 font-mono font-bold text-brand-10 flex items-center gap-2">
                    {node.id}
                    {node.leader && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-brand-30/20 text-brand-30 border border-brand-30/40">
                        LEADER
                      </span>
                    )}
                  </td>
                  <td className="font-medium text-brand-10/70">{node.region}</td>
                  <td>
                    <Badge color={node.statusColor} beacon={node.statusColor === 'green'}>
                      {node.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="w-24">
                      <ProgressBar 
                        value={node.load} 
                        max={100} 
                        color={node.load > 85 ? 'accent-red' : node.load > 70 ? 'accent-yellow' : 'accent-green'} 
                        size="sm" 
                      />
                    </div>
                  </td>
                  <td className="font-mono text-brand-10/80">{node.uptime}</td>
                  <td className="pr-2 text-right font-mono text-brand-10/80">{node.traffic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default DashboardView;
