"use client";

import { useCallback, useEffect, useState } from "react"; // 👈 useEffectを追加
import { CelebrationEffect } from "@/_components/features/meter/CelebrationEffect";
import { CountDisplay } from "@/_components/features/meter/CountDisplay";
import { MeterDisplay } from "@/_components/features/meter/MeterDisplay";
import { Button } from "@/_components/ui/button";
import { usePusher } from "@/_hooks/shared/usePusher";

const GOAL_COUNT = 50;

export default function MeterPage() {
  const [count, setCount] = useState(0);
  const isGoal = count >= GOAL_COUNT;

  // ▼▼▼ ページ読み込み時に最新のカウントを取得する処理 ▼▼▼
  useEffect(() => {
    const fetchInitialCount = async () => {
      try {
        const res = await fetch("/api/count");
        const data = await res.json();
        setCount(data.count);
      } catch (error) {
        console.error("Failed to fetch initial count:", error);
      }
    };
    fetchInitialCount();
  }, []);

  const handleCountUpdate = useCallback((data: { count: number }) => {
    setCount(data.count);
  }, []);

  usePusher("minnabooster-channel", "count-update", handleCountUpdate);

  const handleReset = async () => {
    await fetch("/api/reset", { method: "POST" });
  };

  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center p-8"
      style={{ backgroundColor: "var(--minna-background)" }}
    >
      <div className="relative w-full max-w-5xl">
        {isGoal && <CelebrationEffect />}

        <div
          // 👇 isGoalがtrueでもResetボタンが押せるように、要素は残しつつ非表示にする
          className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 ${
            isGoal ? "invisible opacity-0" : "visible opacity-100"
          } transition-all duration-500`}
        >
          <MeterDisplay count={count} goal={GOAL_COUNT} />
          <CountDisplay count={count} />
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-[var(--minna-primary)] text-[var(--minna-primary)] transition-colors duration-300 ease-in-out hover:bg-[var(--minna-primary)] hover:text-white"
          >
            Reset
          </Button>
        </div>
      </div>
    </main>
  );
}
