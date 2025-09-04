type CountDisplayProps = {
  count: number;
};

export function CountDisplay({ count }: CountDisplayProps) {
  return (
    <div className="text-center md:text-left">
      <h2
        className="mb-2 text-3xl font-semibold md:mb-4"
        style={{ color: "var(--minna-text-secondary)" }}
      >
        Current Count
      </h2>
      <p
        // フォントサイズを大きくし、行間を詰めてレイアウト崩れを防ぎます
        className="pulse-animation font-extrabold leading-none text-[8rem] sm:text-[10rem] lg:text-[14rem]"
        style={{ color: "var(--minna-accent)" }}
      >
        {count}
      </p>
    </div>
  );
}
