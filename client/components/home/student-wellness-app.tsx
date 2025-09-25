"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Search, Bell, ChevronRight, Calendar, MessageSquare, Sprout } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function MoodTrackerApp() {
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
      x: window.innerWidth < 640 ? -180 : window.innerWidth < 768 ? -240 : window.innerWidth < 1024 ? -280 : -320,
      y: window.innerWidth < 640 ? 30 : 40,
      rotation: window.innerWidth < 640 ? -8 : -12,
      scale: window.innerWidth < 640 ? 0.85 : 0.95,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, 0)
    .to(phones[2], {
      x: window.innerWidth < 640 ? 180 : window.innerWidth < 768 ? 240 : window.innerWidth < 1024 ? 280 : 320,
      y: window.innerWidth < 640 ? 30 : 40,
      rotation: window.innerWidth < 640 ? 8 : 12,
      scale: window.innerWidth < 640 ? 0.85 : 0.95,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, 0)
    .to(phones[0], {
      y: window.innerWidth < 640 ? -20 : -30,
      scale: window.innerWidth < 640 ? 1.05 : 1.08,
      duration: 1,
      ease: "power3.out"
    }, 0)

    // Add floating animation to all phones
    phones.forEach((phone, index) => {
      if (phone) {
        gsap.to(phone, {
          y: "+=12",
          duration: 3 + index * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.6
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const screens = [
    {
      // Screen 1: Chat 💬 - Talk to AI about stress, anxiety, or academic pressure
      content: (
        <div className="h-full bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-4 sm:px-6 pt-3 sm:pt-4 pb-1 sm:pb-2 text-black text-xs sm:text-sm font-medium">
            <span>9:41</span>
            <div className="w-12 sm:w-16 h-4 sm:h-6 bg-black rounded-full"></div>
            <div className="flex space-x-1 items-center">
              <div className="flex space-x-0.5">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-black rounded-full"></div>
                ))}
              </div>
              <div className="w-4 sm:w-6 h-2 sm:h-3 border border-black rounded-sm">
                <div className="w-4/5 h-full bg-black rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 pt-3 sm:pt-4 pb-4 sm:pb-6">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-purple-200 rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600" />
            </div>
            <div className="flex space-x-3 sm:space-x-4">
              <Search className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
              <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
            </div>
          </div>

          {/* Chat Header */}
          <div className="px-4 sm:px-6 mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <span className="text-lg sm:text-2xl">💬</span>
              <span className="text-purple-600 font-medium text-xs sm:text-sm">AI Chat Support</span>
            </div>
            <h1 className="text-gray-900 text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-3 sm:mb-4">
              Talk to AI about<br />your feelings
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm">
              Share your stress, anxiety, or academic pressure. I'm here to listen and help.
            </p>
          </div>

          {/* Chat Messages */}
          <div className="px-4 sm:px-6 flex-1 mb-4 sm:mb-6">
            <div className="space-y-3 sm:space-y-4">
              {/* AI Message */}
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs sm:text-sm">🤖</span>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
                  <p className="text-gray-900 text-xs sm:text-sm">
                    Hi! I'm here to help you work through any stress or anxiety you're feeling. What's on your mind today?
                  </p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex items-start space-x-2 sm:space-x-3 justify-end">
                <div className="flex-1 bg-purple-500 rounded-2xl p-3 sm:p-4 max-w-xs ml-8 sm:ml-12">
                  <p className="text-white text-xs sm:text-sm">
                    I'm feeling overwhelmed with my upcoming exams. I can't focus and I'm constantly worried.
                  </p>
                </div>
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs sm:text-sm">😰</span>
                </div>
              </div>

              {/* AI Message */}
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs sm:text-sm">🤖</span>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
                  <p className="text-gray-900 text-xs sm:text-sm">
                    That sounds really challenging. Exam stress is completely normal. Let's try some breathing exercises together...
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="px-4 sm:px-6 pb-3 sm:pb-4">
            <div className="flex items-center space-x-2 sm:space-x-3 bg-white rounded-full px-3 sm:px-4 py-2 sm:py-3 shadow-sm">
              <input 
                type="text" 
                placeholder="Type your message..."
                className="flex-1 text-xs sm:text-sm text-gray-700 outline-none"
              />
              <button className="w-6 sm:w-8 h-6 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center pb-1 sm:pb-2">
            <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-black rounded-full"></div>
          </div>
        </div>
      )
    },
    {
      // Screen 2: Book 📅 - Find student-focused therapists anonymously and safely
      content: (
        <div className="h-full bg-gradient-to-br from-green-50 to-teal-50 flex flex-col">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-4 pb-2 text-black text-sm font-medium">
            <span>9:41</span>
            <div className="w-16 h-6 bg-black rounded-full"></div>
            <div className="flex space-x-1 items-center">
              <div className="flex space-x-0.5">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-1 h-1 bg-black rounded-full"></div>
                ))}
              </div>
              <div className="w-6 h-3 border border-black rounded-sm">
                <div className="w-4/5 h-full bg-black rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-4 pb-6">
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex space-x-4">
              <Search className="w-6 h-6 text-gray-600" />
              <Bell className="w-6 h-6 text-gray-600" />
            </div>
          </div>

          {/* Booking Header */}
          <div className="px-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">📅</span>
              <span className="text-green-600 font-medium text-sm">Anonymous Booking</span>
            </div>
            <h1 className="text-gray-900 text-3xl font-bold leading-tight mb-4">
              Find your perfect<br />therapist
            </h1>
            <p className="text-gray-600 text-sm">
              Connect with student-focused therapists safely and anonymously.
            </p>
          </div>

          {/* Available Therapists */}
          <div className="px-6 flex-1">
            <h3 className="text-gray-900 font-bold text-lg mb-4">Available Today</h3>
            
            <div className="space-y-3">
              {/* Therapist 1 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">👩‍⚕️</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-medium">Dr. Sarah Chen</h4>
                    <p className="text-gray-500 text-xs">Specializes in Student Anxiety</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-medium text-sm">Available</p>
                    <p className="text-gray-400 text-xs">2:00 PM - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-gray-600 text-sm">4.9 (127 reviews)</span>
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
                    Book Now
                  </button>
                </div>
              </div>

              {/* Therapist 2 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">👨‍⚕️</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-medium">Dr. Michael Torres</h4>
                    <p className="text-gray-500 text-xs">Academic Stress Expert</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-medium text-sm">Available</p>
                    <p className="text-gray-400 text-xs">3:30 PM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-gray-600 text-sm">4.8 (95 reviews)</span>
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
                    Book Now
                  </button>
                </div>
              </div>

              {/* Anonymous Notice */}
              <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">🔒</span>
                  <p className="text-green-800 text-sm font-medium">100% Anonymous & Confidential</p>
                </div>
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-32 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      )
    },
    {
      // Screen 3: Grow 🌱 - Access mental health resources designed for student life
      content: (
        <div className="h-full bg-gradient-to-br from-orange-50 to-yellow-50 flex flex-col">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-4 pb-2 text-black text-sm font-medium">
            <span>9:41</span>
            <div className="w-16 h-6 bg-black rounded-full"></div>
            <div className="flex space-x-1 items-center">
              <div className="flex space-x-0.5">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-1 h-1 bg-black rounded-full"></div>
                ))}
              </div>
              <div className="w-6 h-3 border border-black rounded-sm">
                <div className="w-4/5 h-full bg-black rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-4 pb-6">
            <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
              <Sprout className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex space-x-4">
              <Search className="w-6 h-6 text-gray-600" />
              <Bell className="w-6 h-6 text-gray-600" />
            </div>
          </div>

          {/* Growth Header */}
          <div className="px-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🌱</span>
              <span className="text-orange-600 font-medium text-sm">Personal Growth</span>
            </div>
            <h1 className="text-gray-900 text-3xl font-bold leading-tight mb-4">
              Grow your mental<br />wellness
            </h1>
            <p className="text-gray-600 text-sm">
              Access curated resources designed specifically for student life.
            </p>
          </div>

          {/* Resource Categories */}
          <div className="px-6 flex-1">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Study Techniques */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-3xl mb-2">📚</div>
                <h4 className="text-gray-900 font-medium text-sm mb-1">Study Techniques</h4>
                <p className="text-gray-500 text-xs">Effective learning methods</p>
              </div>

              {/* Stress Management */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-3xl mb-2">🧘</div>
                <h4 className="text-gray-900 font-medium text-sm mb-1">Stress Relief</h4>
                <p className="text-gray-500 text-xs">Mindfulness & relaxation</p>
              </div>

              {/* Sleep Health */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-3xl mb-2">😴</div>
                <h4 className="text-gray-900 font-medium text-sm mb-1">Sleep Health</h4>
                <p className="text-gray-500 text-xs">Better rest habits</p>
              </div>

              {/* Social Skills */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-3xl mb-2">🤝</div>
                <h4 className="text-gray-900 font-medium text-sm mb-1">Social Skills</h4>
                <p className="text-gray-500 text-xs">Building connections</p>
              </div>
            </div>

            {/* Featured Article */}
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-orange-600">✨</span>
                <span className="text-orange-800 text-xs font-medium">Featured Article</span>
              </div>
              <h4 className="text-orange-900 font-bold text-sm mb-2">
                5 Proven Ways to Overcome Exam Anxiety
              </h4>
              <p className="text-orange-700 text-xs mb-3">
                Discover research-backed techniques that thousands of students use to stay calm during exams.
              </p>
              <button className="bg-orange-500 text-white px-3 py-2 rounded-lg text-xs font-medium">
                Read Article
              </button>
            </div>

            {/* Progress Tracker */}
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-gray-900 font-medium text-sm">Your Growth Journey</h4>
                <span className="text-orange-600 text-xs">75% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-32 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div ref={containerRef} className="relative h-[600px] sm:h-[700px] md:h-[800px] lg:h-[900px] xl:h-[1000px] w-full flex items-center justify-center overflow-hidden">
      <div className="relative w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px]">
        {screens.map((screen, index) => (
          <div
            key={index}
            ref={el => { phoneRefs.current[index] = el }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 will-change-transform"
          >
            {/* Phone Container */}
            <div className="relative w-[240px] sm:w-[280px] md:w-[320px] lg:w-[340px] xl:w-[360px] h-[480px] sm:h-[560px] md:h-[640px] lg:h-[680px] xl:h-[720px] bg-gray-900 rounded-[35px] sm:rounded-[40px] md:rounded-[45px] p-1 shadow-2xl transform transition-all duration-300 hover:scale-105 border border-gray-800">
              {/* Phone Screen */}
              <div className="w-full h-full bg-white rounded-[30px] sm:rounded-[35px] md:rounded-[40px] relative overflow-hidden">
                {/* Screen Content */}
                <div className="w-full h-full">
                  {screen.content}
                </div>
              </div>

              {/* Phone Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-[35px] sm:rounded-[40px] md:rounded-[45px] pointer-events-none"></div>
            </div>

            {/* Phone Shadow */}
            <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[340px] xl:w-[360px] h-[480px] sm:h-[560px] md:h-[640px] lg:h-[680px] xl:h-[720px] bg-black/10 rounded-[35px] sm:rounded-[40px] md:rounded-[45px] blur-xl -z-10"></div>
          </div>
        ))}
      </div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Static Positioned Particles */}
        <div className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" style={{ left: "8%", top: "15%", animationDelay: "0s" }}></div>
        <div className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse" style={{ left: "20%", top: "35%", animationDelay: "0.8s" }}></div>
        <div className="absolute w-1.5 h-1.5 bg-pink-400/35 rounded-full animate-pulse" style={{ left: "35%", top: "10%", animationDelay: "1.2s" }}></div>
        <div className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-pulse" style={{ left: "65%", top: "55%", animationDelay: "1.8s" }}></div>
        <div className="absolute w-2 h-2 bg-blue-400/25 rounded-full animate-pulse" style={{ left: "80%", top: "25%", animationDelay: "2.2s" }}></div>
        <div className="absolute w-1 h-1 bg-green-400/40 rounded-full animate-pulse" style={{ left: "92%", top: "65%", animationDelay: "2.8s" }}></div>

        {/* Gradient Orbs for Mental Health Theme */}
        <div className="absolute top-16 left-8 w-48 h-48 bg-purple-400/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-56 h-56 bg-cyan-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        
        {/* Connecting Lines */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${isExpanded ? 'opacity-20' : 'opacity-0'}`}>
          <div className="w-px h-40 bg-gradient-to-b from-transparent via-purple-300/30 to-transparent transform -rotate-12 absolute -left-32 -top-20"></div>
          <div className="w-px h-40 bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent transform rotate-12 absolute right-32 -top-20"></div>
        </div>
      </div>

      {/* Enhanced Text Content */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center px-2 sm:px-4">
        <div className={`transition-all duration-1000 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
            Student Mental Wellness
          </h3>
          <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-2xl mx-auto leading-relaxed px-2">
            Chat with AI, book therapists anonymously, and grow with student-focused resources
          </p>
        </div>
      </div>
    </div>
  )
}
