import React from 'react';

/**
 * Pure CSS @theme Tokens & Utilities Specification View
 * Displays the core zero-runtime tokens architecture for the Cold Mirror UI Kit.
 */
export function TokensSpecView() {
  const tokensSnippet = `@import "tailwindcss";

@theme {
  /* Core Brand Palette */
  --color-brand-bg: #2b2d34;
  --color-brand-60: #383a44;
  --color-brand-30: #e63946;
  --color-brand-10: #eaeaea;

  /* Semantic Accent Palette */
  --color-accent-blue: #38BDF8;
  --color-accent-green: #10B981;
  --color-accent-red: #EF4444;
  --color-accent-purple: #A855F7;
  --color-accent-yellow: #F59E0B;

  /* Typography Stack */
  --font-sans: "Exo 2", ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Red Hat Mono', monospace;
}

@layer utilities {
  /* Primary Glass Surface (Main Panels, Headers, Modals) */
  .glass {
    background-color: color-mix(in srgb, var(--color-brand-bg) 40%, transparent);
    backdrop-filter: blur(40px) saturate(150%);
    -webkit-backdrop-filter: blur(40px) saturate(150%);
    box-shadow: 
      0 12px 28px -6px rgba(0, 0, 0, 0.32), 
      0 4px 10px -2px rgba(0, 0, 0, 0.22);
  }

  /* Secondary Glass Card (Containers, Sub-Cards) */
  .glass-card {
    background-color: color-mix(in srgb, var(--color-brand-60) 30%, transparent);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
    box-shadow: 
      0 6px 16px -4px rgba(0, 0, 0, 0.25), 
      0 2px 6px -1px rgba(0, 0, 0, 0.15);
  }

  /* Interactive Control Glass (Inputs, NumberSteppers, Select Triggers) */
  .glass-control {
    background-color: color-mix(in srgb, var(--color-brand-60) 40%, transparent);
    backdrop-filter: blur(16px) saturate(130%);
    -webkit-backdrop-filter: blur(16px) saturate(130%);
  }
}`;

  return (
    <div className="space-y-6">
      <div className="glass border border-brand-10/10 rounded-2xl p-6 space-y-4">
        <div className="border-b border-brand-60/60 pb-3 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-accent-green uppercase tracking-widest">
              Design Tokens Specification
            </span>
            <h3 className="text-base font-bold text-brand-10">
              Pure CSS Theme Variables (`ui-kit/tokens.css`)
            </h3>
          </div>
          <span className="text-xs font-mono text-brand-30 font-bold">
            Zero Runtime Dependencies
          </span>
        </div>

        <pre className="bg-black/60 p-4 rounded-xl text-xs font-mono text-brand-10/80 overflow-x-auto custom-scrollbar leading-relaxed">
          {tokensSnippet}
        </pre>
      </div>
    </div>
  );
}

export default TokensSpecView;
