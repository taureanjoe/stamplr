import Link from "next/link";

export function Logo({ className = "", variant = "light" }: { className?: string; variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  const iconColor = isDark ? "#ffffff" : "#1e3a5f";
  const textClass = isDark ? "text-white" : "text-stamplr-gray";
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <path
          d="M26 6C22 4 16 6 14 10C12 14 14 18 18 20C22 22 26 20 28 16C30 12 28 8 26 6ZM6 26C10 28 16 26 18 22C20 18 18 14 14 12C10 10 6 12 4 16C2 20 4 24 6 26Z"
          fill={iconColor}
        />
      </svg>
      <span className={`font-semibold text-lg ${textClass}`}>Stamplr</span>
    </Link>
  );
}
