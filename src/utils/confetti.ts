import confetti from 'canvas-confetti';

/**
 * Fires subtle, brand-aligned confetti (Emerald Green, Gold Amber, and Deep Maroon)
 * to celebrate meal logging and photo authentication.
 */
export function fireMealStreakConfetti(originX = 0.5, originY = 0.7) {
  try {
    // Wave 1: Tight center burst
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x: originX, y: originY },
      colors: ['#2ECC71', '#F1C40F', '#7A1C2C', '#27AE60', '#E67E22'],
      disableForReducedMotion: true,
      zIndex: 9999
    });

    // Wave 2: Slower sparkling stars
    setTimeout(() => {
      confetti({
        particleCount: 25,
        angle: 90,
        spread: 80,
        origin: { x: originX, y: originY - 0.05 },
        colors: ['#2ECC71', '#FFFFFF', '#F39C12'],
        ticks: 200,
        gravity: 0.8,
        scalar: 0.9,
        shapes: ['circle'],
        zIndex: 9999
      });
    }, 150);
  } catch (e) {
    console.debug('Confetti burst skipped:', e);
  }
}
