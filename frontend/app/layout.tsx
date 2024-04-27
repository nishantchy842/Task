import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import ReactQueryProvider from "@/providers/ReactQuery";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Namastenewz",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}