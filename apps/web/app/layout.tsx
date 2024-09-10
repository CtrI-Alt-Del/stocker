import type { Metadata } from 'next'
import { Providers } from './providers'
import '../ui/styles/global.css'

export const metadata: Metadata = {
  title: 'Stocker',
  description: 'An stock management app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RootLayout>{children}</RootLayout>
}
