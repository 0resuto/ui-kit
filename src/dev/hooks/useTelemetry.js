import { useState, useEffect } from 'react';
import { telemetrySimulator } from '../services/TelemetrySimulator';

/**
 * Custom React hook bridging the OOP TelemetrySimulator service to reactive component state.
 * 
 * @param {boolean} [autoRefresh=true] Whether the simulation timer is active
 * @param {number} [intervalMs=500] Tick rate frequency in milliseconds
 * @param {import('../services/TelemetrySimulator').TelemetrySimulator} [simulator=telemetrySimulator]
 * @returns {ReturnType<import('../services/TelemetrySimulator').TelemetrySimulator['getState']>}
 */
export function useTelemetry(autoRefresh = true, intervalMs = 500, simulator = telemetrySimulator) {
  const [telemetry, setTelemetry] = useState(() => simulator.getState());

  useEffect(() => {
    // Subscribe to simulator state updates
    const unsubscribe = simulator.subscribe(setTelemetry);

    // Synchronize running state and interval
    if (autoRefresh) {
      simulator.start(intervalMs);
    } else {
      simulator.stop();
    }

    return () => {
      unsubscribe();
      simulator.stop();
    };
  }, [autoRefresh, intervalMs, simulator]);

  return telemetry;
}

export default useTelemetry;
