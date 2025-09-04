import { kv } from "@vercel/kv";

const DEFAULT_GOAL = 50;

// KVからcountとgoalの両方を取得します
export const getState = async () => {
  const [count, goal] = await Promise.all([
    kv.get<number>("count"),
    kv.get<number>("goal"),
  ]);
  return {
    count: count ?? 0,
    goal: goal ?? DEFAULT_GOAL,
  };
};

// KVに保存されたgoalを元に、カウントを増やします
export const incrementCount = async () => {
  const { goal } = await getState();
  const newCount = await kv.incr("count");

  // ゴール値を超えてカウントが増えないように制御
  if (newCount > goal) {
    await kv.set("count", goal);
    return {
      currentCount: goal,
      goalReached: true,
    };
  }

  return {
    currentCount: newCount,
    goalReached: newCount >= goal,
  };
};

// countのみを0にリセットします
export const resetCount = async () => {
  await kv.set("count", 0);
  return 0;
};

// 新しいgoalの値をKVに保存します
export const setGoal = async (newGoal: number) => {
  await kv.set("goal", newGoal);
  return newGoal;
};
