import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { Providers } from '@/src/providers'
import { Toaster } from 'sonner'

const notoSans = Manrope({ variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Blog App',
  description: 'Create and share your thoughts with the world.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={notoSans.variable} suppressHydrationWarning>
      <body className={`${notoSans.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  )
}
