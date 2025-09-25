"use client"

import { TopNav } from "@/components/nav/top-nav"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProfileIcon } from "@/components/profile/icon"
import LanguageSelector from "@/components/ui/language-selector"
import { useLanguage } from "@/components/ui/language-context"

type Notification = {
  id: string
  title: string
  body: string
  time: string
  unread?: boolean
}

const MOCK_NOTIFS: Notification[] = [
  {
    id: "1",
    title: "notification_new_message_from_ai",
    body: "notification_breathing_exercise",
    time: "notification_time_2m",
    unread: true,
  },
  {
    id: "2",
    title: "notification_booking_confirmed",
    body: "notification_session_with_ms_lee",
    time: "notification_time_1h",
    unread: true,
  },
  { 
    id: "3", 
    title: "notification_community_reply", 
    body: "notification_alex_replied", 
    time: "dashboard_yesterday" 
  },
]

export default function NotificationsPage() {
  const { t } = useLanguage()
  const [items, setItems] = useState(MOCK_NOTIFS)

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })))
  const clearAll = () => setItems([])

  return (
    <main className="min-h-dvh bg-black pt-8 relative">
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
      
      <TopNav />
      <div className="hidden lg:flex absolute right-5 top-5 items-center gap-3">
        <LanguageSelector />
        <ProfileIcon />
      </div>
      <div className="mx-auto max-w-3xl px-3 sm:px-4 pt-12 sm:pt-6 pb-20 sm:pb-24 relative z-10">
        <header className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-100">{t('notifications')}</h1>
              <p className="text-sm sm:text-base text-slate-500">{t('notifications_stay_up_to_date')}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                className="rounded-full text-slate-100 hover:bg-white/10 text-xs sm:text-sm px-3 sm:px-4 py-2" 
                onClick={markAllRead}
              >
                {t('notifications_mark_all_read')}
              </Button>
              <Button 
                variant="ghost" 
                className="rounded-full text-slate-100 hover:bg-white/10 text-xs sm:text-sm px-3 sm:px-4 py-2" 
                onClick={clearAll}
              >
                {t('notifications_clear_all')}
              </Button>
            </div>
          </div>
        </header>

        <section className="space-y-2 sm:space-y-3">
          {items.length === 0 ? (
            <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-black p-6 sm:p-8 text-center text-slate-500">
              {t('notifications_all_caught_up')}
            </div>
          ) : (
            items.map((n) => (
              <article
                key={n.id}
                className="flex items-start gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/20 bg-black p-3 sm:p-4 transition hover:bg-white/10"
              >
                <div
                  className={`mt-1 sm:mt-1 size-2 rounded-full ${n.unread ? "bg-[#60A5FA]" : "bg-slate-500"} shrink-0`}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start sm:items-center gap-2 flex-col sm:flex-row">
                    <h3 className="truncate text-sm sm:text-base text-[#E5E7EB] leading-tight">{t(n.title)}</h3>
                    <div className="flex items-center gap-2">
                      {n.unread && <Badge className="bg-[#60A5FA] text-slate-900 text-xs">{t('notifications_new')}</Badge>}
                      <span className="shrink-0 text-xs text-slate-500">{t(n.time)}</span>
                    </div>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-slate-300 leading-relaxed">{t(n.body)}</p>
                </div>
              </article>
            ))
          )}
        </section>
    </div>
  </main>
)
}
