type CountDisplayProps = {
  count: number;
};

export function CountDisplay({ count }: CountDisplayProps) {
  return (
    <div className="text-center md:text-left">
      <h2
        className="mb-4 text-3xl font-semibold"
        style={{ color: "var(--minna-text-secondary)" }}
      >
        Current Count
      </h2>
      <p
        className="pulse-animation text-8xl font-extrabold lg:text-9xl"
        style={{ color: "var(--minna-accent)" }}
      >
        {count}
      </p>
    </div>
  );
}
