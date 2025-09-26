import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { LanguageProvider } from "@/components/ui/language-context"
import { ChatProvider } from "@/components/chat/context"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "CalmSpace",
  description: "Your mental wellness companion",
  generator: "CalmSpace.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`}>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <ChatProvider>
          <LanguageProvider>
            {/* Global Profile Icon */}
            <div className="fixed top-4 right-4 z-[100]">
              {/* You can style or position this as needed */}
              
            </div>
            <Suspense fallback={null}>{children}</Suspense>
          </LanguageProvider>
        </ChatProvider>
        <Analytics />
      </body>
    </html>
  )
}
