"use client"

import { Reveal } from "@/components/reveal"
import QuoteLoop from "@/components/quote-loop"
import { useLanguage } from "@/components/ui/language-context"

export function Testimonials() {
  const { t } = useLanguage()

  const quotes = [
    { 
      name: t("testimonial_alex_name"), 
      text: t("testimonial_alex_text"), 
      emoji: "🎓" 
    },
    { 
      name: t("testimonial_maya_name"), 
      text: t("testimonial_maya_text"), 
      emoji: "💜" 
    },
    { 
      name: t("testimonial_jai_name"), 
      text: t("testimonial_jai_text"), 
      emoji: "🧠" 
    },
  ]

  return (
    <section className="py-8 sm:py-10 md:py-14">
      <Reveal>
        <h2 className="text-balance text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-slate-100 mb-6 sm:mb-8 text-center">
          {t("testimonials_title")}
        </h2>
      </Reveal>
      
      <div className="w-full">
        <Reveal delay={200}>
          <QuoteLoop 
            quotes={quotes}
            speed={40}
            direction="left"
            pauseOnHover={true}
            fadeOut={false}
            scaleOnHover={true}
            gap={24}
            quoteHeight={170}
          />
        </Reveal>
      </div>
    </section>
  )
}
