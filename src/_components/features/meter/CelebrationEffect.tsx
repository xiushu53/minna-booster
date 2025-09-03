import confetti from "canvas-confetti";
import { useEffect } from "react";

export function CelebrationEffect() {
  // このコンポーネントが表示された時（ゴール達成時）に一度だけ紙吹雪を飛ばす
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      // 画面の左右から発射
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    // コンポーネントが消える時にインターバルをクリア
    return () => clearInterval(interval);
  }, []); // 空の依存配列で初回レンダリング時のみ実行

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="celebration-text">酷暑！</p>
    </div>
  );
}
