export function playTempleBell(): void {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    // Harmonics for a resonant temple bronze bell
    const freqs = [528, 1056, 1584, 2112];

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(f, ctx.currentTime);

      // Decaying bell envelope
      gain.gain.setValueAtTime(0.25 / (idx + 1), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 3.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 3.2);
    });
  } catch (err) {
    console.warn("Web Audio not supported or blocked by browser:", err);
  }
}
