"use client"

import Link from "next/link"
import { useLanguage } from "@/components/ui/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-black/5 py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-4 text-sm text-[#64748B] md:flex-row md:px-6">
        <nav className="flex items-center gap-4">
          <Link href="/home" className="hover:text-[#0EA5E9]" aria-label="Home">
            {t("footer_home")}
          </Link>
          <Link href="/chat" className="hover:text-[#0EA5E9]" aria-label="Chat">
            {t("footer_chat")}
          </Link>
          <Link href="/bookings" className="hover:text-[#0EA5E9]" aria-label="Booking">
            {t("footer_booking")}
          </Link>
          <Link href="/resources" className="hover:text-[#0EA5E9]" aria-label="Resources">
            {t("footer_resources")}
          </Link>
          <Link href="/community" className="hover:text-[#0EA5E9]" aria-label="Community">
            {t("footer_community")}
          </Link>
        </nav>
        <p className="text-xs">&copy; {new Date().getFullYear()} Mind — {t("footer_copyright")}</p>
      </div>
    </footer>
  )
}
