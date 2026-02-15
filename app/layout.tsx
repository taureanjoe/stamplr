import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stamplr – Engineering Seals, Reimagined",
  description:
    "Design, manage, and deploy your official stamps with modern precision. Cloud-secure and compliant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gradient-dark text-white antialiased">
        {children}
      </body>
    </html>
  );
}
