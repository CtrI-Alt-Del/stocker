import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stocker",
  description: "An stock management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
