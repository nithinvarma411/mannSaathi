"use client"

import { Hero } from "@/components/home/hero"
import { MentalHealthDashboard } from "@/components/home/mental-health-dashboard"
import { Features } from "@/components/home/features"
import { Testimonials } from "@/components/home/testimonials"
import { CTA } from "@/components/home/cta"
import { Footer } from "@/components/home/footer"
import { SmoothScrollProvider } from "@/components/home/smooth-scroll-provider"
import { MoodTrackerApp } from "@/components/home/student-wellness-app"
import LanguageSelector from "@/components/ui/language-selector"
import { useLanguage } from "@/components/ui/language-context"

export default function HomePage() {
  const { t } = useLanguage()
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen w-full bg-black relative overflow-y-auto hide-scrollbar">
        {/* Language Selector */}
        <div className="hidden md:block absolute top-6 right-6 z-50">
          <LanguageSelector />
        </div>
        {/* White Spotlight Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle at center,
                rgba(255, 255, 255, 0.08) 0%,
                rgba(255, 255, 255, 0.04) 20%,
                rgba(0, 0, 0, 0.0) 60%
              )
            `,
          }}
        />
        
        <main className="relative z-10 min-h-dvh text-[#E5E7EB]">
          {/* Keep TopNav consistent with /chat */}
          

          {/* Centered content with increased width */}
          <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 sm:pb-16 lg:pb-20 space-y-8 sm:space-y-12 md:space-y-16">
            <Hero />
          </section>
          
          {/* Full width section for Student Wellness App - Hidden on mobile, visible on desktop */}
          <section className="hidden md:block w-full px-2 sm:px-4 py-6 sm:py-8">
            <MoodTrackerApp />
          </section>

          {/* Mobile-only content section - simplified description */}
          <section className="block md:hidden mx-auto w-full max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                {t("student_mental_wellness_platform")}
              </h3>
              <p className="text-white/80 text-base sm:text-lg mb-6 leading-relaxed">
                {t("home_chat_ai_description")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="text-3xl mb-2">💬</div>
                  <h4 className="text-white font-medium text-sm mb-1">{t("ai_chat_support")}</h4>
                  <p className="text-white/70 text-xs">{t("ai_chat_support_desc")}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="text-3xl mb-2">📅</div>
                  <h4 className="text-white font-medium text-sm mb-1">{t("anonymous_booking")}</h4>
                  <p className="text-white/70 text-xs">{t("anonymous_booking_desc")}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="text-3xl mb-2">🌱</div>
                  <h4 className="text-white font-medium text-sm mb-1">{t("personal_growth")}</h4>
                  <p className="text-white/70 text-xs">{t("personal_growth_desc")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Back to centered content with increased width */}
          <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 md:space-y-16">
            <MentalHealthDashboard />
            <Features />
            <Testimonials />
            <CTA />
          </section>

          <Footer />
        </main>
      </div>
    </SmoothScrollProvider>
  )
}
