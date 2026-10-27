import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "lowest",
  description: "a free discord bot giving you the resources to create a powerful and versatile community at the tip of your fingers.",
  openGraph: {
    title: "lowest",
    description: "a free discord bot giving you the resources to create a powerful and versatile community at the tip of your fingers.",
    type: "website",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="referrer" content="no-referrer" />
      </head>
      <body className={cn(inter.className, "bg-black text-white min-h-screen")}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}