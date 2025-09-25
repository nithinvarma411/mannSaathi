"use client"

import { TopNav } from "@/components/nav/top-nav"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ProfileIcon } from "@/components/profile/icon"
import LanguageSelector from "@/components/ui/language-selector"
import { useLanguage } from "@/components/ui/language-context"

export default function ProfilePage() {
  const { t } = useLanguage()
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <main className="min-h-dvh bg-black text-slate-100">
      <TopNav />
      <div className="mx-auto max-w-3xl px-3 sm:px-4 pt-20 md:pt-6 pb-16 md:pb-24">
        <header className="mb-4 md:mb-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-100">{t('profile')}</h1>
          <p className="text-sm md:text-base text-slate-400">{t('profile_manage_personal_info')}</p>
        </header>

        <div className="hidden lg:flex absolute right-5 top-5 items-center gap-3">
          <LanguageSelector />
          <ProfileIcon />
        </div>

  <section className="rounded-lg md:rounded-2xl border border-white/20 bg-black p-4 md:p-5 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 overflow-hidden rounded-full ring-1 ring-white/20 mx-auto sm:mx-0">
              <Image src="/minimal-avatar.png" alt="Your avatar" width={64} height={64} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-medium text-slate-100 text-sm sm:text-base">{t('profile_student_name')}</h2>
              <p className="text-xs sm:text-sm text-slate-400">{t('profile_student_email')}</p>
            </div>
            <Button className="rounded-full bg-white/10 text-slate-100 hover:bg-white/15 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 w-full sm:w-auto" suppressHydrationWarning>{t('profile_change')}</Button>
          </div>

          <Separator className="my-4 md:my-5 bg-white/10" />

          <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-100 text-xs sm:text-sm">
                {t('profile_name')}
              </Label>
              <Input 
                id="name" 
                defaultValue={t('profile_student_name')} 
                className="border-white/20 bg-black text-slate-100 text-sm h-9 sm:h-10" 
                suppressHydrationWarning
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-100 text-xs sm:text-sm">
                {t('profile_email')}
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={t('profile_student_email')}
                className="border-white/20 bg-black text-slate-100 text-sm h-9 sm:h-10"
                suppressHydrationWarning
              />
            </div>
          </div>

          <Separator className="my-4 md:my-5 bg-white/10" />

          <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg md:rounded-xl border border-white/20 bg-black p-3 md:p-4">
              <div className="flex-1 pr-2">
                <p className="font-medium text-slate-100 text-sm md:text-base">{t('profile_email_notifications')}</p>
                <p className="text-xs md:text-sm text-slate-400">{t('profile_receive_important_updates')}</p>
              </div>
              <Switch 
                checked={emailNotifs} 
                onCheckedChange={setEmailNotifs} 
                aria-label="Toggle email notifications"
                className="scale-75 sm:scale-100" 
                suppressHydrationWarning
              />
            </div>
            <div className="flex items-center justify-between rounded-lg md:rounded-xl border border-white/20 bg-black p-3 md:p-4">
              <div className="flex-1 pr-2">
                <p className="font-medium text-slate-100 text-sm md:text-base">{t('profile_push_notifications')}</p>
                <p className="text-xs md:text-sm text-slate-400">{t('profile_enable_device_alerts')}</p>
              </div>
              <Switch 
                checked={pushNotifs} 
                onCheckedChange={setPushNotifs} 
                aria-label="Toggle push notifications"
                className="scale-75 sm:scale-100"
                suppressHydrationWarning
              />
            </div>
          </div>

          <div className="mt-4 md:mt-6 flex justify-center sm:justify-end">
            <Button className="rounded-full bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] text-white hover:opacity-90 text-sm px-6 py-2 w-full sm:w-auto" suppressHydrationWarning>
              {t('profile_save_changes')}
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
