// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DuckDB Admin",
  description: "Admin panel for inspecting DuckDB metadata",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen p-6 bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
