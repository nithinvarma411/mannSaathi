"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronLeft, Home, BarChart3, Calendar, User, Plus } from "lucide-react"
import { useLanguage } from "@/components/ui/language-context"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function MoodTrackerApp() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const phones = phoneRefs.current

    // Initial setup - only show center phone
    gsap.set(phones[0], { x: 0, y: 0, rotation: 0, scale: 1, zIndex: 3 })
    gsap.set(phones[1], { x: 0, y: 0, rotation: 0, scale: 0.8, zIndex: 1, opacity: 0 })
    gsap.set(phones[2], { x: 0, y: 0, rotation: 0, scale: 0.8, zIndex: 2, opacity: 0 })

    // Create scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          setIsExpanded(progress > 0.3)
        }
      }
    })

    // Animate phones spreading out like cards
    tl.to(phones[1], {
      x: -280,
      y: 30,
      rotation: -15,
      scale: 0.9,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, 0)
    .to(phones[2], {
      x: 280,
      y: 30,
      rotation: 15,
      scale: 0.9,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, 0)
    .to(phones[0], {
      y: -20,
      scale: 1.05,
      duration: 1,
      ease: "power3.out"
    }, 0)

    // Add floating animation to all phones
    phones.forEach((phone, index) => {
      if (phone) {
        gsap.to(phone, {
          y: "+=8",
          duration: 2.5 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const screens = [
    {
      // Screen 1: How are you feeling today?
      content: (
        <div className="h-full bg-gray-900 flex flex-col">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-4 pb-2 text-white text-sm font-medium">
            <span>9:41</span>
            <div className="flex space-x-1 items-center">
              <div className="flex space-x-0.5">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                ))}
              </div>
              <div className="w-6 h-3 border border-white/60 rounded-sm ml-1">
                <div className="w-4/5 h-full bg-white rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 px-6 pt-8">
            <h1 className="text-white text-3xl font-bold leading-tight mb-8">
              {t("how_feeling_today")}
            </h1>

            {/* Mood Options */}
            <div className="flex space-x-3 mb-8">
              <button className="px-4 py-2 bg-gray-800 rounded-full text-white/70 text-sm">
                {t("joyful")}
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-gray-900 font-medium text-sm">
                {t("cheerful")}
              </button>
              <button className="px-4 py-2 bg-gray-800 rounded-full text-white/70 text-sm">
                {t("content")}
              </button>
            </div>

            <p className="text-white/50 text-sm mb-8">
              {t("share_how_feel")}
            </p>

            {/* Happy Character */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-3xl flex items-center justify-center">
                <div className="text-6xl">
                  <div className="flex flex-col items-center">
                    <div className="flex space-x-4 mb-4">
                      <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                      <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                    </div>
                    <div className="w-12 h-6 bg-gray-900 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Get Started Button */}
          <div className="px-6 pb-8">
            <button className="w-full bg-gray-800 text-white py-4 rounded-2xl font-medium text-lg">
              {t("mood_get_started")}
            </button>
            <p className="text-center text-white/50 text-sm mt-4">
              {t("already_have_account")} <span className="text-white underline">{t("log_in")}</span>
            </p>
          </div>
        </div>
      )
    },
    {
      // Screen 2: Start your day here!
      content: (
        <div className="h-full bg-gray-900 flex flex-col">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-4 pb-2 text-white text-sm font-medium">
            <span>9:41</span>
            <div className="flex space-x-1 items-center">
              <div className="flex space-x-0.5">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                ))}
              </div>
              <div className="w-6 h-3 border border-white/60 rounded-sm ml-1">
                <div className="w-4/5 h-full bg-white rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="px-6 pt-4 pb-6">
            <p className="text-white/60 text-sm mb-2">{t("good_morning_dan")}</p>
            <h1 className="text-white text-3xl font-bold leading-tight">
              {t("start_your_day")}
            </h1>
          </div>

          {/* Good Mornings Section */}
          <div className="px-6 mb-6">
            <p className="text-white/60 text-sm mb-3">{t("for_good_mornings")}</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-2xl p-4">
                  <h3 className="text-gray-900 font-semibold text-sm">{t("new_day")}</h3>
                  <p className="text-gray-900/70 text-xs">{t("fresh_start")}</p>
                  <p className="text-gray-900/50 text-xs mt-1">05:30s</p>
                </div>
                <button className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl p-4">
                  <h3 className="text-white font-semibold text-sm">{t("bright_mornings")}</h3>
                  <p className="text-white/70 text-xs">{t("bold_beginnings")}</p>
                  <p className="text-white/50 text-xs mt-1">07:30s</p>
                </div>
                <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl p-4">
                  <h3 className="text-white font-semibold text-sm">{t("awake_energize")}</h3>
                  <p className="text-white/70 text-xs">{t("conquer_today")}</p>
                  <p className="text-white/50 text-xs mt-1">10:00s</p>
                </div>
                <button className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Afternoon Lifts Section */}
          <div className="px-6 mb-6">
            <p className="text-white/60 text-sm mb-3">{t("for_afternoon_lifts")}</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl p-4">
                  <h3 className="text-white font-semibold text-sm">{t("pause_recharge")}</h3>
                  <p className="text-white/70 text-xs">{t("power_up")}</p>
                  <p className="text-white/50 text-xs mt-1">05:00s</p>
                </div>
                <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl p-4">
                  <h3 className="text-white font-semibold text-sm">{t("keep_calm")}</h3>
                  <p className="text-white/70 text-xs">{t("stay_focused")}</p>
                  <p className="text-white/50 text-xs mt-1">08:00s</p>
                </div>
                <button className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-auto px-6 pb-6">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-4">
              <div className="flex justify-around items-center">
                <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-gray-900" />
                </button>
                <button className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </button>
                <button className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-pink-400" />
                </button>
                <button className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                  <User className="w-6 h-6 text-orange-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      // Screen 3: Select your today's mood
      content: (
        <div className="h-full bg-gray-900 flex flex-col">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-4 pb-2 text-white text-sm font-medium">
            <span>9:41</span>
            <div className="flex space-x-1 items-center">
              <div className="flex space-x-0.5">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                ))}
              </div>
              <div className="w-6 h-3 border border-white/60 rounded-sm ml-1">
                <div className="w-4/5 h-full bg-white rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Header with back button */}
          <div className="flex items-center px-6 pt-4 pb-6">
            <button className="w-10 h-10 rounded-full flex items-center justify-center mr-4">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex-1"></div>
            <button className="text-white/70 text-sm font-medium">
              {t("mood_save")}
            </button>
          </div>

          {/* Angry Character */}
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="w-72 h-72 bg-gradient-to-br from-red-400 to-red-500 rounded-3xl flex items-center justify-center mb-8">
              <div className="text-6xl">
                <div className="flex flex-col items-center">
                  <div className="flex space-x-6 mb-4">
                    <div className="w-4 h-4 bg-gray-900 rounded-full transform rotate-12"></div>
                    <div className="w-4 h-4 bg-gray-900 rounded-full transform -rotate-12"></div>
                  </div>
                  <div className="w-8 h-4 bg-gray-900 rounded-t-full transform rotate-180"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Mood Selection */}
          <div className="px-6 pb-8">
            <h1 className="text-white text-3xl font-bold leading-tight mb-8 text-center">
              {t("select_todays_mood")}
            </h1>

            {/* Chart placeholder */}
            <div className="h-16 mb-6 flex items-end justify-center space-x-1">
              {[8, 12, 6, 14, 10, 16, 9, 11, 7, 13, 5, 15, 8, 12, 6].map((height, i) => (
                <div
                  key={i}
                  className="w-1 bg-white/20 rounded-full"
                  style={{ height: `${height * 3}px` }}
                ></div>
              ))}
            </div>

            {/* Mood Tags */}
            <div className="flex justify-center space-x-3">
              <button className="px-4 py-2 bg-gray-800 rounded-full text-white/70 text-sm">
                {t("heartbroken")}
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-full text-white font-medium text-sm">
                {t("despairing")}
              </button>
              <button className="px-4 py-2 bg-gray-800 rounded-full text-white/70 text-sm">
                {t("devastated")}
              </button>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div ref={containerRef} className="relative h-[800px] md:h-[900px] w-full flex items-center justify-center overflow-hidden">
      <div className="relative w-[400px] sm:w-[500px] md:w-[600px] h-[700px] md:h-[800px]">
        {screens.map((screen, index) => (
          <div
            key={index}
            ref={el => { phoneRefs.current[index] = el }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 will-change-transform"
          >
            {/* Phone Container */}
            <div className="relative w-[200px] sm:w-[220px] md:w-[240px] h-[400px] sm:h-[440px] md:h-[480px] bg-gray-900 rounded-[40px] p-1 shadow-2xl transform transition-all duration-300 hover:scale-105 border border-gray-700">
              {/* Phone Screen */}
              <div className="w-full h-full bg-gray-900 rounded-[36px] relative overflow-hidden">
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10"></div>
                
                {/* Screen Content */}
                <div className="w-full h-full">
                  {screen.content}
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white/40 rounded-full"></div>
              </div>

              {/* Phone Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-[40px] pointer-events-none"></div>
            </div>

            {/* Phone Shadow */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[200px] sm:w-[220px] md:w-[240px] h-[400px] sm:h-[440px] md:h-[480px] bg-black/15 rounded-[40px] blur-xl -z-10"></div>
          </div>
        ))}
      </div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Static Positioned Particles */}
        <div className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ left: "10%", top: "20%", animationDelay: "0s" }}></div>
        <div className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ left: "25%", top: "40%", animationDelay: "0.5s" }}></div>
        <div className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ left: "40%", top: "15%", animationDelay: "1s" }}></div>
        <div className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ left: "60%", top: "60%", animationDelay: "1.5s" }}></div>
        <div className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ left: "75%", top: "30%", animationDelay: "2s" }}></div>
        <div className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ left: "90%", top: "70%", animationDelay: "2.5s" }}></div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        {/* Connecting Lines */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${isExpanded ? 'opacity-30' : 'opacity-0'}`}>
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent transform -rotate-12 absolute -left-24 -top-16"></div>
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent transform rotate-12 absolute right-24 -top-16"></div>
        </div>
      </div>

      {/* Enhanced Text Content */}
      <div className="absolute bottom-4 left-0 right-0 text-center px-4">
        <div className={`transition-all duration-1000 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-red-400 to-purple-400 bg-clip-text text-transparent">
            {t("mood_tracker_title")}
          </h3>
          <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-lg mx-auto">
            {t("mood_tracker_description")}
          </p>
        </div>
      </div>
    </div>
  )
}
