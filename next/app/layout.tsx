import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ky Le ',
  description: 'Portfolio website showcasing my work and projects',
  icons: {
    icon: '/favicon.ico', // path to your favicon
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
