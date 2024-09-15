import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { RootLayout } from '@/ui/components/layouts/root'
import '../ui/styles/globals.css'

export const metadata: Metadata = {
  title: 'Stocker',
  description: 'Inventory management app',
}

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <RootLayout>{children}</RootLayout>
}
