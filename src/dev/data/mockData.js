import { LayoutDashboard, Server, Settings } from 'lucide-react';

/**
 * Static domain options and fixture mock data for the UI Kit development playground.
 */

export const serviceOptions = [
  { value: 'Production Cluster (US-East)', label: 'Production Cluster (US-East)' },
  { value: 'Compute Gateway (EU-Central)', label: 'Compute Gateway (EU-Central)' },
  { value: 'High-Throughput Analytics Tier', label: 'High-Throughput Analytics Tier' },
  { value: 'Distributed Cache Pool (AP-South)', label: 'Distributed Cache Pool (AP-South)' },
];

export const groupedSessionOptions = [
  {
    group: 'Practice 1',
    items: [
      { value: 'p1-lap1', label: 'Lap 1 (64.38s)' },
      { value: 'p1-lap2', label: 'Lap 2 (63.92s)' },
      { value: 'p1-lap3', label: 'Lap 3 (63.45s)' },
    ],
  },
  {
    group: 'Qualifying',
    items: [
      { value: 'q-lap1', label: 'Lap 1 (62.18s)' },
      { value: 'q-lap2', label: 'Lap 2 (61.84s)' },
    ],
  },
  {
    group: 'Race',
    items: [
      { value: 'r-lap1', label: 'Lap 1 (65.10s)' },
      { value: 'r-lap2', label: 'Lap 2 (64.02s)' },
      { value: 'r-lap3', label: 'Lap 3 (63.88s)' },
    ],
  },
];


export const colorOptions = [
  { value: 'brand-30', label: 'Brand Crimson (#e63946)' },
  { value: 'accent-green', label: 'Emerald Green (#10B981)' },
  { value: 'accent-purple', label: 'Violet Purple (#A855F7)' },
  { value: 'accent-red', label: 'Critical Red (#EF4444)' },
  { value: 'accent-yellow', label: 'Warning Amber (#F59E0B)' },
  { value: 'accent-blue', label: 'Sky Blue (#38BDF8)' },
];

export const navTabItems = [
  { id: 'analytics', label: 'Analytics', icon: LayoutDashboard },
  { id: 'servers', label: 'Nodes', icon: Server },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const clusterNodesData = [
  {
    id: 'us-east-1a',
    region: 'us-east-1a',
    status: 'HEALTHY',
    statusColor: 'green',
    load: 36,
    uptime: '99.98%',
    traffic: '1.84 TB / 3.0 TB',
    trafficPercent: 61,
    leader: true,
  },
  {
    id: 'us-east-1b',
    region: 'us-east-1b',
    status: 'OPTIMAL',
    statusColor: 'purple',
    load: 54,
    uptime: '99.95%',
    traffic: '2.10 TB / 3.0 TB',
    trafficPercent: 70,
    leader: false,
  },
  {
    id: 'eu-central-1',
    region: 'eu-central-1',
    status: 'REBALANCING',
    statusColor: 'yellow',
    load: 78,
    uptime: '99.40%',
    traffic: '2.75 TB / 3.0 TB',
    trafficPercent: 92,
    leader: false,
  },
  {
    id: 'ap-south-1',
    region: 'ap-south-1',
    status: 'DEGRADED',
    statusColor: 'red',
    load: 91,
    uptime: '98.12%',
    traffic: '2.94 TB / 3.0 TB',
    trafficPercent: 98,
    leader: false,
  },
];
