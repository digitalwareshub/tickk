/**
 * Simple Confetti Effect
 * Lightweight confetti animation for celebrations
 */

export default function confetti(): void {
  if (typeof window === 'undefined') return;

  const colors = ['#f97316', '#fb923c', '#fbbf24', '#34d399', '#60a5fa'];
  const confettiCount = 100;

  // Create container
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
    overflow: hidden;
  `;
  document.body.appendChild(container);

  // Create confetti pieces
  for (let i = 0; i < confettiCount; i++) {
    const piece = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 3 + 2;
    const animationDelay = Math.random() * 2;

    piece.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      top: -20px;
      opacity: 1;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      animation: confetti-fall ${animationDuration}s ease-out ${animationDelay}s forwards;
    `;

    container.appendChild(piece);
  }

  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confetti-fall {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Cleanup after animation
  setTimeout(() => {
    container.remove();
    style.remove();
  }, 6000);
}
