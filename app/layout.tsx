import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StampLr – Professional Seals for Engineers & Notaries",
  description:
    "Design, manage, and deploy your official stamps with modern precision. Cloud-secure and compliant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
