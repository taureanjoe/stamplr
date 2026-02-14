import Link from "next/link";

export function Logo({ className = "", variant = "dark" }: { className?: string; variant?: "light" | "dark" }) {
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
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <path
          d="M26 6C22 4 16 6 14 10C12 14 14 18 18 20C22 22 26 20 28 16C30 12 28 8 26 6ZM6 26C10 28 16 26 18 22C20 18 18 14 14 12C10 10 6 12 4 16C2 20 4 24 6 26Z"
          fill="url(#logoGradient)"
        />
      </svg>
      <span className="font-semibold text-lg text-white">Stamplr</span>
    </Link>
  );
}
