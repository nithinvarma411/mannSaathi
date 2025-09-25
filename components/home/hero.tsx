"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { useLanguage } from "@/components/ui/language-context"

export function Hero() {
  const { t } = useLanguage()
  
  return (
    <header id="hero" className="pt-6 sm:pt-10 pb-10 sm:pb-14 md:pt-14 md:pb-20">
      <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:items-center md:gap-12">
        <Reveal>
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <span className="text-lg sm:text-2xl">✌️</span>
              <span className="text-orange-400 text-xs sm:text-sm font-medium">{t("peace_love_santuy")}</span>
            </div>
            <h1 className="text-pretty text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-slate-100 leading-tight">
              {t("hero_title")}
            </h1>
            <p className="text-pretty text-sm sm:text-base md:text-lg leading-relaxed text-slate-300">
              {t("hero_description")}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base text-slate-900 font-medium transition-colors hover:from-orange-500 hover:to-yellow-600 no-focus-outline"
              >
                <Link href="/auth" aria-label="Make appointment">
                 {t("get_started")}
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Brain visualization with dashboard elements - Hidden on mobile, visible on desktop */}
        <Reveal delay={100}>
          <div className="hidden md:block relative mx-auto w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
            {/* Main brain container */}
            <div className="relative h-96 flex items-center justify-center">
              {/* Brain PNG illustration */}
              <div className="relative w-72 h-72">
                <img
                  src="/converted.png"
                  alt="Brain visualization with neon outline"
                  className="w-full h-full object-contain filter drop-shadow-lg"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5)) drop-shadow(0 0 40px rgba(236, 72, 153, 0.3))'
                  }}
                />
              </div>

             
             

              {/* Background grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#8B5CF6" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#grid)" />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  )
}
