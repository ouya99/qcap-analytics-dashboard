"use client"

import { usePathname } from "next/navigation"
import { Footer } from "@/components/footer"

export function FooterWrapper() {
  const pathname = usePathname()
  const isSplashPage = pathname === '/splash'

  if (isSplashPage) {
    return null
  }

  return <Footer />
} 