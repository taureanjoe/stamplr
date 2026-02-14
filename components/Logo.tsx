import Link from "next/link";
import Image from "next/image";

export function Logo({ className = "", variant = "dark" }: { className?: string; variant?: "light" | "dark" }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.png"
        alt="Stamplr"
        width={32}
        height={32}
        className="flex-shrink-0"
      />
      <span className="font-semibold text-lg text-white">Stamplr</span>
    </Link>
  );
}
