import { VercelToolbar } from "@vercel/toolbar/next";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Pomolist",
  description: "Todo List and Pomodoro Timer with stats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shouldInjectToolbar = process.env.NODE_ENV === "development";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
        {shouldInjectToolbar && <VercelToolbar />}
      </body>
    </html>
  );
}
