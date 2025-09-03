// サーバーのメモリ上でカウントを管理するシンプルなストア
// (DBを使わない小規模なデモ用途)

let count = 0;
const GOAL = 50;

export const getCount = () => count;

export const incrementCount = () => {
  // ゴールに達していなければカウントを1増やす
  if (count < GOAL) {
    count++;
  }
  return {
    currentCount: count,
    goalReached: count >= GOAL,
  };
};

export const resetCount = () => {
  count = 0;
  return count;
};
