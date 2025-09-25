"use client"

import { Reveal } from "@/components/reveal"
import React from "react";
import { useLanguage } from "@/components/ui/language-context";

export function MentalHealthDashboard() {
  const { t } = useLanguage();
  
  return (
    <section className="py-8 sm:py-10 md:py-14">
      <Reveal>
        <h2 className="text-balance text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-slate-100 mb-1 sm:mb-2">
          {t("student_mental_health_analytics")}
        </h2>
        <p className="text-slate-300 text-base sm:text-lg mb-6 sm:mb-8">
          {t("track_emotional_wellbeing")}
        </p>
      </Reveal>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Stress Level Chart */}
        <Reveal delay={100}>
          <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 transition-colors hover:bg-white/7">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100">{t("stress_level")}</h3>
              <span className="text-xl sm:text-2xl font-bold text-purple-400">78%</span>
            </div>
            {/* Simple stress level visualization */}
            <div className="h-20 sm:h-24 relative mb-3 sm:mb-4">
              <svg className="w-full h-full" viewBox="0 0 200 60">
                {/* Grid lines for reference */}
                <defs>
                  <pattern id="grid" width="20" height="12" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 12" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="200" height="60" fill="url(#grid)" />
                
                {/* Stress level curve with dramatic highs and lows */}
                <path
                  d="M 10 45 Q 25 15 40 20 Q 55 50 70 35 Q 85 10 100 15 Q 115 45 130 40 Q 145 20 160 25 Q 175 50 190 30"
                  stroke="#8B5CF6"
                  strokeWidth="3"
                  fill="none"
                  className="drop-shadow-sm"
                />
                
                {/* Area fill under the curve */}
                <path
                  d="M 10 45 Q 25 15 40 20 Q 55 50 70 35 Q 85 10 100 15 Q 115 45 130 40 Q 145 20 160 25 Q 175 50 190 30 L 190 60 L 10 60 Z"
                  fill="url(#stressGradient)"
                  opacity="0.2"
                />
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="stressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                
                {/* Data points */}
                <circle cx="40" cy="20" r="2" fill="#8B5CF6" opacity="0.8"/>
                <circle cx="70" cy="35" r="2" fill="#8B5CF6" opacity="0.8"/>
                <circle cx="100" cy="15" r="2" fill="#8B5CF6" opacity="0.8"/>
                <circle cx="130" cy="40" r="2" fill="#8B5CF6" opacity="0.8"/>
                <circle cx="160" cy="25" r="2" fill="#8B5CF6" opacity="0.8"/>
                
                {/* Peak indicators */}
                <text x="100" y="10" textAnchor="middle" className="fill-purple-300 text-xs">High</text>
                <text x="70" y="55" textAnchor="middle" className="fill-purple-300 text-xs">Low</text>
              </svg>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{t("academic_pressure_tracking")}</p>
          </div>
        </Reveal>
        

        {/* Anxiety Frequency */}
        <Reveal delay={200}>
          <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 transition-colors hover:bg-white/7">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100">{t("anxiety_episodes")}</h3>
              <span className="text-xl sm:text-2xl font-bold text-pink-400">4X</span>
            </div>
            {/* Anxiety frequency bars */}
            <div className="flex items-end space-x-1 sm:space-x-2 h-20 sm:h-24 mb-3 sm:mb-4">
              {[20, 35, 50, 45, 60, 40, 30].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-pink-500/50 to-pink-400/70 rounded-t"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{t("weekly_anxiety_pattern")}</p>
          </div>
        </Reveal>

        {/* Sleep Quality */}
        <Reveal delay={300}>
          <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 transition-colors hover:bg-white/7">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100">{t("sleep_quality")}</h3>
              <span className="text-xl sm:text-2xl font-bold text-cyan-400">5h</span>
            </div>
            {/* Sleep quality circle */}
            <div className="flex items-center justify-center h-20 sm:h-24 mb-3 sm:mb-4">
              <div className="relative w-16 sm:w-20 h-16 sm:h-20">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="3"
                    strokeDasharray="60, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-slate-200">60%</span>
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{t("average_sleep_exam")}</p>
          </div>
        </Reveal>

        {/* Focus Stability */}
        <Reveal delay={400}>
          <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 transition-colors hover:bg-white/7">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100">{t("focus_stability")}</h3>
              <span className="text-xl sm:text-2xl font-bold text-yellow-400">60%</span>
            </div>
            {/* Focus stability meter */}
            <div className="h-20 sm:h-24 flex items-center mb-3 sm:mb-4">
              <div className="w-full bg-gray-700 rounded-full h-3 sm:h-4">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-400 h-3 sm:h-4 rounded-full transition-all duration-1000" style={{ width: '60%' }}></div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{t("concentration_study")}</p>
          </div>
        </Reveal>

        {/* Mood Patterns */}
        <Reveal delay={500}>
          <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 transition-colors hover:bg-white/7">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100">{t("daily_mood")}</h3>
              <span className="text-xl sm:text-2xl font-bold text-green-400">86%</span>
            </div>
            {/* Mood emoji grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 h-20 sm:h-24 mb-3 sm:mb-4">
              {['😊', '😰', '🤩', '😢', '😊', '😠', '🤩'].map((emoji, i) => (
                <div key={i} className="flex items-center justify-center text-lg sm:text-2xl bg-white/5 rounded-lg">
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{t("weekly_emotional_patterns")}</p>
          </div>
        </Reveal>

        {/* Study Session Analytics */}
        <Reveal delay={600}>
          <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 transition-colors hover:bg-white/7">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100">{t("study_sessions")}</h3>
              <span className="text-xl sm:text-2xl font-bold text-blue-400">12</span>
            </div>
            {/* Study session heatmap */}
            <div className="grid grid-cols-7 gap-0.5 sm:gap-1 h-20 sm:h-24 mb-3 sm:mb-4">
              {Array.from({ length: 21 }, (_, i) => {
                // Create deterministic pattern based on index to avoid hydration mismatch
                const intensity = (i * 7 + i % 3) % 10;
                let bgClass;
                if (intensity > 6) {
                  bgClass = 'bg-blue-500/60';
                } else if (intensity > 3) {
                  bgClass = 'bg-blue-500/30';
                } else {
                  bgClass = 'bg-gray-700/50';
                }
                
                return (
                  <div
                    key={i}
                    className={`rounded-sm ${bgClass}`}
                  ></div>
                );
              })}
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{t("study_intensity_weeks")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
