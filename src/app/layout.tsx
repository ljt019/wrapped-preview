import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/app/providers";
import Navigation from "@/components/Navigation";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wrapped Preview",
  description: "Generated a preview of your wrapped",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
