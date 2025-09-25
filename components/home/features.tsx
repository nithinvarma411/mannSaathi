"use client"

import { ShieldCheck, Sparkles, Users, BookOpen } from "lucide-react"
import { Reveal } from "@/components/reveal"
import Carousel, { CarouselItem } from "@/components/carousel"
import { useState, useEffect } from "react"
import { useLanguage } from "@/components/ui/language-context"

export function Features() {
  const { t } = useLanguage();
  const [baseWidth, setBaseWidth] = useState(500)

  const features = [
    { icon: ShieldCheck, title: t("anonymous_booking_feature"), desc: t("anonymous_booking_feature_desc") },
    { icon: Sparkles, title: t("ai_powered_chat_feature"), desc: t("ai_powered_chat_feature_desc") },
    { icon: Users, title: t("student_counselors_feature"), desc: t("student_counselors_feature_desc") },
    { icon: BookOpen, title: t("stress_management_feature"), desc: t("stress_management_feature_desc") },
    { icon: Users, title: t("peer_communities_feature"), desc: t("peer_communities_feature_desc") },
  ]

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) {
        setBaseWidth(300)
      } else if (window.innerWidth < 768) {
        setBaseWidth(400)
      } else {
        setBaseWidth(500)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const carouselItems: CarouselItem[] = features.map((feature, index) => ({
    id: index + 1,
    title: feature.title,
    description: feature.desc,
    icon: <feature.icon size={16} className="text-[#60A5FA]" />
  }));

  return (
    <section className="py-8 sm:py-10 md:py-14">
      <Reveal>
        <h2 className="text-balance text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-slate-100 mb-6 sm:mb-8 text-center">{t("features")}</h2>
      </Reveal>
      
      <div className="flex justify-center">
        <Reveal delay={200}>
          <Carousel 
            items={carouselItems}
            baseWidth={baseWidth}
            autoplay={true}
            autoplayDelay={4000}
            pauseOnHover={true}
            loop={true}
          />
        </Reveal>
      </div>
    </section>
  )
}
