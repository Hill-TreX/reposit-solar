type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const digits = Array.from({ length: 10 }, (_, digit) => digit);

/** A lightweight digit-wheel counter inspired by the supplied animation. */
export default function AnimatedCounter({ value, decimals = 0, prefix = "", suffix = "", className = "" }: AnimatedCounterProps) {
  const formatted = Number.isFinite(value)
    ? value.toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : "0";

  return (
    <span className={`animated-counter ${className}`} aria-label={`${prefix}${formatted}${suffix}`}>
      {prefix && <span className="animated-counter-mark">{prefix}</span>}
      <span aria-hidden="true" className="animated-counter-digits">
        {formatted.split("").map((character, index) => /\d/.test(character)
          ? <Digit key={`${formatted.length - index}`} digit={Number(character)} />
          : <span className="animated-counter-mark" key={`${character}-${index}`}>{character}</span>)}
      </span>
      {suffix && <span className="animated-counter-mark">{suffix}</span>}
    </span>
  );
}

function Digit({ digit }: { digit: number }) {
  return (
    <span className="animated-counter-digit">
      <span className="animated-counter-wheel" style={{ transform: `translateY(-${digit * 1.16}em)` }}>
        {digits.map((face) => <span key={face}>{face}</span>)}
      </span>
    </span>
  );
}
