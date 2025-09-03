"use client"; // インタラクティブな機能を扱うためクライアントコンポーネントとします

import { useState } from "react";
import { CelebrationEffect } from "@/_components/features/meter/CelebrationEffect";
import { CountDisplay } from "@/_components/features/meter/CountDisplay";
import { MeterDisplay } from "@/_components/features/meter/MeterDisplay";
import { Button } from "@/_components/ui/button"; // shadcn/uiのButtonを使います

// ゴールのカウント数
const GOAL_COUNT = 50;

export default function MeterPage() {
  // UI確認のため、useStateで仮のカウントを管理します
  const [count, setCount] = useState(25);
  const isGoal = count >= GOAL_COUNT;

  const handleReset = () => {
    setCount(0);
  };

  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center p-8"
      style={{ backgroundColor: "var(--minna-background)" }}
    >
      <div className="relative w-full max-w-5xl">
        {/* isGoalがtrueの時にお祝い画面を表示 */}
        {isGoal && <CelebrationEffect />}

        {/* isGoalがfalseの時にメーター画面を表示 */}
        <div
          className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 ${
            isGoal ? "invisible" : ""
          }`}
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
