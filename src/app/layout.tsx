import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InSeasoned — Cook with what's in season",
  description: "Discover recipes based on ingredients you have and what's in season right now. No account needed.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
