import type { Metadata } from 'next'
import { Inter as interFonts } from 'next/font/google'
import './globals.css'
import './page.module.css'
import { headers } from 'next/headers'
import ContextProvider from '@/context';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = interFonts({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crefy',
  description: 'Crefy is a decentralized credentialing platform that allows institutions to issue and verify credentials on the blockchain.',
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookies = (await headers()).get('cookie') || '';

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
          </ContextProvider>
      </body>
    </html>
  )
}
