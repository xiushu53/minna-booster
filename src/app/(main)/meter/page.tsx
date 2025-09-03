"use client";

import { useCallback, useState } from "react";
import { CelebrationEffect } from "@/_components/features/meter/CelebrationEffect";
import { CountDisplay } from "@/_components/features/meter/CountDisplay";
import { MeterDisplay } from "@/_components/features/meter/MeterDisplay";
import { Button } from "@/_components/ui/button";
import { usePusher } from "@/_hooks/shared/usePusher"; // 作成したフックをインポート

const GOAL_COUNT = 50;

export default function MeterPage() {
  // ▼▼▼ 初期値を25から0に変更します ▼▼▼
  const [count, setCount] = useState(0);
  const isGoal = count >= GOAL_COUNT;

  // ▼▼▼ Pusherから通知が来たときに実行する関数を定義します ▼▼▼
  // useCallbackで関数をメモ化し、usePusherフックでの不要な再実行を防ぎます
  const handleCountUpdate = useCallback((data: { count: number }) => {
    // 新しいカウント数で画面の状態を更新
    setCount(data.count);
  }, []); // この関数自体は再生成される必要がないので依存配列は空

  // ▼▼▼ usePusherフックを呼び出して、Pusherからの通知を待ち受けます ▼▼▼
  usePusher("minnabooster-channel", "count-update", handleCountUpdate);

  // ▼▼▼ リセットボタンの処理を、APIを呼び出す非同期関数に変更します ▼▼▼
  const handleReset = async () => {
    try {
      // リセット用のAPIを叩く
      await fetch("/api/reset", { method: "POST" });
    } catch (error) {
      console.error("Reset failed:", error);
    }
  };

  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center p-8"
      style={{ backgroundColor: "var(--minna-background)" }}
    >
      <div className="relative w-full max-w-5xl">
        {isGoal && <CelebrationEffect />}

        <div
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
