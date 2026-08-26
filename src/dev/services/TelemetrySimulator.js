/**
 * OOP Telemetry Simulation Service
 * 
 * Encapsulates cluster telemetry calculation, interval management, 
 * and observer event subscriptions for real-time live data generation.
 */
export class TelemetrySimulator {
  #cpu;
  #memory;
  #throughput;
  #latency;
  #ch1;
  #ch2;
  #ch3;
  #intervalMs;
  #timerId;
  #listeners;

  /**
   * @param {Object} [initialConfig]
   * @param {number} [initialConfig.cpu=42]
   * @param {number} [initialConfig.memory=68]
   * @param {number} [initialConfig.throughput=840]
   * @param {number} [initialConfig.intervalMs=500]
   */
  constructor({ cpu = 42, memory = 68, throughput = 840, intervalMs = 500 } = {}) {
    this.#cpu = cpu;
    this.#memory = memory;
    this.#throughput = throughput;
    this.#latency = 14.2;
    this.#ch1 = 65;
    this.#ch2 = 48;
    this.#ch3 = 82;
    this.#intervalMs = intervalMs;
    this.#timerId = null;
    this.#listeners = new Set();
  }

  /**
   * Get an immutable snapshot of current telemetry state
   * @returns {{cpu: number, memory: number, throughput: number, latency: number, ch1: number, ch2: number, ch3: number}}
   */
  getState() {
    return {
      cpu: Math.round(this.#cpu),
      memory: Math.round(this.#memory),
      throughput: this.#throughput,
      latency: this.#latency,
      ch1: this.#ch1,
      ch2: this.#ch2,
      ch3: this.#ch3,
    };
  }

  /**
   * Subscribe an observer callback to telemetry updates
   * @param {(state: ReturnType<TelemetrySimulator['getState']>) => void} listener
   * @returns {() => void} Unsubscribe function
   */
  subscribe(listener) {
    this.#listeners.add(listener);
    listener(this.getState());
    return () => this.#listeners.delete(listener);
  }

  /**
   * Notify all registered observers
   */
  #notify() {
    const state = this.getState();
    for (const listener of this.#listeners) {
      listener(state);
    }
  }

  /**
   * Perform a single telemetry step computation
   */
  tick() {
    // Random-walk CPU (15% to 95%)
    this.#cpu += (Math.random() - 0.49) * 1.5;
    if (this.#cpu > 95) this.#cpu = 75;
    if (this.#cpu < 15) this.#cpu = 30;

    // Random-walk Memory (40% to 92%)
    this.#memory += (Math.random() - 0.5) * 0.4;
    if (this.#memory > 92) this.#memory = 80;
    if (this.#memory < 40) this.#memory = 60;

    // Random-walk Throughput (600 to 980 MB/s)
    this.#throughput = Math.round(this.#throughput + (Math.random() - 0.5) * 20);
    if (this.#throughput < 600) this.#throughput = 750;

    // Network P99 Latency (12ms - 16ms)
    this.#latency = parseFloat((12 + Math.random() * 4).toFixed(1));

    // Dynamic Multi-Channel Channels
    this.#ch1 = Math.min(95, Math.max(10, Math.round(this.#cpu * 0.9 + Math.random() * 10)));
    this.#ch2 = Math.min(95, Math.max(10, Math.round(this.#memory * 0.8 + Math.random() * 8)));
    this.#ch3 = Math.min(95, Math.max(10, Math.round(70 + Math.random() * 20)));

    this.#notify();
  }

  /**
   * Start the live simulation loop
   * @param {number} [intervalMs]
   */
  start(intervalMs) {
    if (intervalMs) {
      this.#intervalMs = intervalMs;
    }
    this.stop();
    this.#timerId = setInterval(() => this.tick(), this.#intervalMs);
  }

  /**
   * Stop/Pause the simulation loop
   */
  stop() {
    if (this.#timerId) {
      clearInterval(this.#timerId);
      this.#timerId = null;
    }
  }

  /**
   * Update the simulation interval rate
   * @param {number} newIntervalMs
   */
  setInterval(newIntervalMs) {
    this.#intervalMs = newIntervalMs;
    if (this.#timerId) {
      this.start(newIntervalMs);
    }
  }

  /**
   * Check if simulation loop is currently active
   * @returns {boolean}
   */
  get isRunning() {
    return this.#timerId !== null;
  }
}

// Export singleton instance for app-wide telemetry simulation
export const telemetrySimulator = new TelemetrySimulator({ intervalMs: 500 });
export default telemetrySimulator;
