"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ButtonPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
  const [isGoal, setIsGoal] = useState(false); // ゴール状態を管理

  const handleClick = async () => {
    // ローディング中またはゴール達成後は何もしない
    if (isLoading || isGoal) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/push", { method: "POST" });
      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data = await res.json();
      // APIからゴール状態を受け取る
      if (data.goalReached) {
        setIsGoal(true);
      }

      setFeedback("success");
    } catch (error) {
      console.error(error);
      setFeedback("error");
    } finally {
      // 0.7秒後にフィードバック表示をリセット
      setTimeout(() => {
        setIsLoading(false);
        setFeedback(null);
      }, 700);
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-4"
      style={{ backgroundColor: "var(--minna-background)" }}
    >
      <motion.button
        onClick={handleClick}
        disabled={isLoading || isGoal}
        className="relative flex h-64 w-64 select-none items-center justify-center rounded-full bg-[var(--minna-primary)] text-5xl font-bold text-white shadow-2xl transition-opacity duration-300 disabled:opacity-50"
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* 成功/失敗のフィードバックアニメーション */}
        {feedback === "success" && (
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500/80"
            initial={{ scale: 0 }}
            animate={{ scale: 1.2, opacity: [1, 0] }}
            transition={{ duration: 0.7 }}
          />
        )}
        {feedback === "error" && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/80"
            initial={{ scale: 0 }}
            animate={{ scale: 1.2, opacity: [1, 0] }}
            transition={{ duration: 0.7 }}
          />
        )}

        {/* ゴール達成時はテキストを変更 */}
        <span className="relative z-10">{isGoal ? "FINISH!" : "PUSH!"}</span>
      </motion.button>
    </main>
  );
}
