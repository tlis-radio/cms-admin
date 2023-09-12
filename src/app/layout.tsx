import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Providers from '@/utils/provider';
config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TLIS CMS Admin'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
        <html lang="en">
          <body className={`${inter.className} bg-slate-100`}>
            <Providers>
              {children}
            </Providers>
          </body>
        </html>
    </UserProvider>
  )
}
