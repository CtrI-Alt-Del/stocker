import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RootLayout } from "@/ui/components/layouts/root";
import "../ui/styles/globals.css";

export const metadata: Metadata = {
  title: "Stocker",
  description: "Inventory management app",
  icons: {
    icon: "https://i.imgur.com/ifXWlGH.png",
  },
};

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <RootLayout>{children}</RootLayout>;
}
