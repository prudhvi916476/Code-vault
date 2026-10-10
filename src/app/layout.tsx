import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Vault — Personal Program Library",
  description:
    "Your personal collection of practical programs, organized and ready whenever you need them. Search, explore, copy, and download your ML practicals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
