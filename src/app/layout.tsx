// src/app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'
import { createServerClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ShiftScope - Restaurant Worker Reviews',
  description: 'Anonymous workplace reviews for NYC restaurant workers',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header user={user} />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}