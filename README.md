<div align="center">
  <h1>UI Kit</h1>
  <p>Modular UI component library and design system for React.</p>

  <p>
    <img src="https://img.shields.io/github/license/0resuto/ui-kit" alt="License" />
  </p>
  <p>
    <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Lucide_Icons-F56565?logo=lucide&logoColor=white" alt="Lucide Icons" />
  </p>
</div>

---

## Overview

UI Kit is a standalone UI component library providing frosted glass components, forms, progress meters, and navigation primitives for desktop and web applications.

## Installation

```bash
npm install github:0resuto/ui-kit#main
```

## Quick Start

```jsx
import React, { useState } from 'react';
import { 
  Button,
  Modal,
  ToastProvider,
  useToast,
  Input, 
  Select, 
  Checkbox,
  ProgressBar, 
  Slider, 
  SlidingPill, 
  Badge 
} from 'ui-kit';
import 'ui-kit/style.css';

export function App() {
  const [mode, setMode] = useState('overview');
  const [val, setVal] = useState(50);
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="p-6 space-y-4 bg-brand-bg text-brand-10">
      <SlidingPill
        value={mode}
        onChange={setMode}
        options={[
          { value: 'overview', label: 'Overview' },
          { value: 'metrics', label: 'Metrics' }
        ]}
      />

      <Checkbox
        checked={enabled}
        onChange={setEnabled}
        label="Enable Monitoring"
      />

      <ProgressBar
        value={val}
        max={100}
        color="brand-30"
        glow={true}
      />
    </div>
  );
}
```

## Components

- **`<Button />`**: 6 variants (`primary`, `glass`, `minimal`, `secondary`, `ghost`, `danger`), 3 sizes, loading state.
- **`<Modal />`**: Accessible dialogs rendered via `createPortal` with dark blur backdrop and escape key listener.
- **`<ToastProvider />` / `useToast()`**: High-density frosted acrylic notification system with auto-dismiss timers.
- **`<Tooltip />`**: Lightweight floating helper with specular border.
- **`<Input />`**: Standard 38px text input with optional search icon and clear button.
- **`<NumberStepper />`**: 38px number input with custom +/- buttons and tabular numbers.
- **`<Select />`**: Frosted acrylic dropdown selector rendered via `createPortal`.
- **`<Checkbox />`**: Branded custom checkbox with active red fill and subtle glow.
- **`<ProgressBar />`**: Universal progress bar with matching color glow, pulse, and vertical orientation support.
- **`<Slider />`**: Range slider with optional gradient track fill (`fill={true}`).
- **`<SlidingPill />`**: 2-position sliding capsule switcher.
- **`<Badge />`**: Unified status badge with active/inactive states and ping beacon.
- **`<SegmentedTabs />`**: Segmented navigation tabs on glass background.
- **`<Rail />` & `<Drawer />`**: Left navigation rail and slide-out settings drawer.

## Development

Run the local interactive development server:

```bash
npm run dev
```

Build production bundle (`dist/`):

```bash
npm run build
```
