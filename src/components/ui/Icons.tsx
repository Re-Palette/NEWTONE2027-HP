type SvgProps = React.SVGProps<SVGSVGElement>;

export function ArrowRight({ className, ...rest }: SvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 30 8"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M0 4h28M24.2 0.7 28.6 4l-4.4 3.3"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDown({ className, ...rest }: SvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 8 26"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M4 0v23M0.8 19.6 4 23.6l3.2-4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 手書き風のブラシ下線。
 * コピーの下に敷いて、デザイン中のピンクのストロークを再現します。
 */
export function BrushUnderline({
  className,
  variant = "a",
  gradientId,
  ...rest
}: SvgProps & { variant?: "a" | "b" | "c"; gradientId: string }) {
  const paths = {
    a: "M3 17.5C64 7.2 168 3.6 249 6.2c48 1.5 92 5 129 9.6",
    b: "M4 14.8C58 21 132 20.4 196 15.2c46-3.7 128-9.8 180-4.4",
    c: "M2 8.4C46 18.6 120 22 190 18.6c52-2.5 134-9.6 186-13.2",
  } as const;

  return (
    <svg
      className={className}
      viewBox="0 0 380 24"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      {...rest}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff2f9e" />
          <stop offset="52%" stopColor="#ff6fc8" />
          <stop offset="100%" stopColor="#9a6bff" />
        </linearGradient>
      </defs>
      <path
        d={paths[variant]}
        stroke={`url(#${gradientId})`}
        strokeWidth="4.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SocialGlyph({ name }: { name: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "Instagram":
      return (
        <svg {...common}>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
        </svg>
      );
    case "X":
      return (
        <svg {...common}>
          <path
            d="M4 4l16 16M20 4L4 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...common}>
          <rect
            x="2.5"
            y="5.5"
            width="19"
            height="13"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="M10.5 9.4l5 2.6-5 2.6V9.4z" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path
            d="M14 3v11.2a3.2 3.2 0 1 1-2.6-3.15"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 3c.6 2.4 2.3 4 4.8 4.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
