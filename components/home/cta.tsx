"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { useLanguage } from "@/components/ui/language-context"

export function CTA() {
  const { t } = useLanguage()

  return (
    <section className="py-10 sm:py-12 md:py-16">
      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6 md:p-10 text-center">
          <p className="text-pretty text-lg sm:text-xl md:text-2xl font-medium text-slate-100">
            {t("cta_title")}
          </p>
          <div className="mt-4 sm:mt-6">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base text-slate-900 hover:from-[#22D3EE]/90 hover:to-[#60A5FA]/90"
            >
              <Link href="/chat" aria-label="Join now and start your mental health journey">
                {t("cta_button")}
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
