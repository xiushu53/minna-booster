import { kv } from "@vercel/kv";

const GOAL = 50;

// 現在のカウントをKVから取得する
export const getCount = async () => {
  const count = await kv.get<number>("count");
  return count ?? 0;
};

// KVのカウントを1増やす (アトミック操作なので安全)
export const incrementCount = async () => {
  const newCount = await kv.incr("count");
  return {
    currentCount: newCount,
    goalReached: newCount >= GOAL,
  };
};

// KVのカウントを0にリセットする
export const resetCount = async () => {
  await kv.set("count", 0);
  return 0;
};
