type MeterDisplayProps = {
  count: number;
  goal: number;
};

export function MeterDisplay({ count, goal }: MeterDisplayProps) {
  // 表示するセグメントの数を計算（ゴール値を超えないように）
  const segments = Math.min(count, goal);

  // 0からsegments-1までの数値を持つ配列を生成 (例: [0, 1, 2, ...])
  // この配列を元に、Reactでセグメントを描画します
  const segmentArray = Array.from({ length: segments }, (_, i) => i);

  return (
    <div className="flex items-center justify-center">
      <div className="meter">
        {/* 背景の円 */}
        <div className="absolute inset-0 rounded-full border-8 border-gray-700 bg-gray-800" />

        {/* セグメントを描画するコンテナ */}
        <div>
          {segmentArray.map((i) => {
            const percentage = i / goal;
            // 0(青) -> 50(赤) へ色が変化するロジック
            const red = Math.round(255 * percentage);
            const blue = 255 - red;
            const green = Math.round(100 * percentage); // 少し緑を混ぜて自然なグラデーションに

            return (
              <div
                key={i}
                className="meter-segment"
                style={{
                  backgroundColor: `rgb(${red}, ${green}, ${blue})`,
                  // 角度を計算して放射状に配置
                  transform: `rotate(${(i * 360) / goal}deg)`,
                }}
              />
            );
          })}
        </div>
        {/* 中心の円 */}
        <div
          className="absolute inset-8 rounded-full"
          style={{ backgroundColor: "var(--minna-background)" }}
        />
      </div>
    </div>
  );
}
