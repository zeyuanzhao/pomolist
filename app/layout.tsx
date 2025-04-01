import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pomolist",
  description: "Todo List and Pomodoro Timer with stats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
