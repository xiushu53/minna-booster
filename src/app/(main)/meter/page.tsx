"use client";

import { useCallback, useEffect, useState } from "react";
import { CelebrationEffect } from "@/_components/features/meter/CelebrationEffect";
import { CountDisplay } from "@/_components/features/meter/CountDisplay";
import { MeterDisplay } from "@/_components/features/meter/MeterDisplay";
import { Button } from "@/_components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/_components/ui/toggle-group";
import { usePusher } from "@/_hooks/shared/usePusher";

const GOAL_OPTIONS = [50, 100, 150, 200];

export default function MeterPage() {
  const [count, setCount] = useState<number | null>(null);
  const [goal, setGoal] = useState<number>(GOAL_OPTIONS[0]);
  const [loadingState, setLoadingState] = useState<
    "loading" | "error" | "success"
  >("loading");

  const isGoal = count !== null && count >= goal;

  // 初回読み込み時に現在のcountとgoalを取得
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        setLoadingState("loading");
        const res = await fetch("/api/state");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCount(data.count);
        setGoal(data.goal);
        setLoadingState("success");
      } catch (error) {
        console.error("Failed to fetch initial state:", error);
        setLoadingState("error");
      }
    };
    fetchInitialState();
  }, []);

  // Pusherからのイベントを処理するハンドラ
  const handleCountUpdate = useCallback(
    (data: { count: number }) => setCount(data.count),
    []
  );
  const handleGoalUpdate = useCallback(
    (data: { goal: number }) => setGoal(data.goal),
    []
  );
  const handleStateReset = useCallback(
    (data: { count: number; goal: number }) => {
      setCount(data.count);
      setGoal(data.goal);
    },
    []
  );

  // Pusherイベントの購読
  usePusher("minnabooster-channel", "count-update", handleCountUpdate);
  usePusher("minnabooster-channel", "goal-update", handleGoalUpdate);
  usePusher("minnabooster-channel", "state-reset", handleStateReset);

  const handleReset = async () => {
    await fetch("/api/reset", { method: "POST" });
  };

  // ゴール値を変更するハンドラ
  const handleGoalChange = async (newGoalValue: string) => {
    const newGoal = Number(newGoalValue);
    if (!newGoal || newGoal === goal) return;

    setGoal(newGoal); // UIを即時反映（オプティミスティックアップデート）
    await fetch("/api/goal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal: newGoal }),
    });
  };

  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-between p-4 md:p-8"
      style={{ backgroundColor: "var(--minna-background)" }}
    >
      {/* メインの表示エリア */}
      <div className="flex w-full flex-grow flex-col items-center justify-center">
        {/* ▼▼▼ コンテナの最大幅を広げます ▼▼▼ */}
        <div className="relative w-full max-w-7xl">
          {isGoal && <CelebrationEffect />}

          <div className="mb-8 flex justify-center">
            <ToggleGroup
              type="single"
              value={String(goal)}
              onValueChange={handleGoalChange}
              disabled={count !== null && count > 0 && !isGoal}
              className="rounded-lg bg-gray-900/50 p-1"
            >
              {GOAL_OPTIONS.map((option) => (
                <ToggleGroupItem
                  key={option}
                  value={String(option)}
                  aria-label={`Set goal to ${option}`}
                  className="data-[state=on]:bg-[var(--minna-primary)] data-[state=on]:text-white data-[state=off]:text-[var(--minna-text-secondary)] data-[state=off]:hover:bg-gray-800/50 px-4 py-2"
                >
                  {option}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div
            // ▼▼▼ 要素間のスペースを広げます ▼▼▼
            className={`grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 ${
              isGoal ? "invisible opacity-0" : "visible opacity-100"
            } transition-all duration-500`}
          >
            {loadingState === "loading" && (
              <p className="text-center text-2xl md:col-span-2">
                読み込み中...
              </p>
            )}
            {loadingState === "error" && (
              <p className="text-center text-2xl text-red-500 md:col-span-2">
                エラーが発生しました。リフレッシュしてください。
              </p>
            )}
            {loadingState === "success" && count !== null && (
              <>
                <MeterDisplay count={count} goal={goal} />
                <CountDisplay count={count} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* リセットボタンのエリア */}
      <div className="w-full max-w-5xl flex-shrink-0 text-center">
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-[var(--minna-primary)] text-[var(--minna-primary)] transition-colors duration-300 ease-in-out hover:bg-[var(--minna-primary)] hover:text-white"
        >
          Reset
        </Button>
      </div>
    </main>
  );
}
