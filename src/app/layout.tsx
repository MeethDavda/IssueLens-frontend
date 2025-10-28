import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IssueLens",
  description: "Find fixes in GitHub issues instantly",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
