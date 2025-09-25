"use client"

import { useState } from "react"
import Link from "next/link"
import { TopNav } from "@/components/nav/top-nav"
import { MetricsCard } from "@/components/dashboard/metrics-card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Building2 } from "lucide-react"
import { ProfileIcon } from "@/components/profile/icon"

type Timeframe = "Today" | "Last 7 Days" | "Last 30 Days" | "Custom"

const primary = "#60A5FA" // brand primary
const accent = "#22D3EE" // accent


function ManageBookingsCard() {
  const items = [
    { id: "BK-1042", student: "Anon-7F3A", counsellor: "Dr. Lee", time: "Today 2:00 PM", status: "Confirmed" },
    { id: "BK-1041", student: "Anon-2C9D", counsellor: "Dr. Patel", time: "Today 12:30 PM", status: "Pending" },
    { id: "BK-1039", student: "Anon-8B12", counsellor: "Dr. Kim", time: "Yesterday 4:15 PM", status: "Completed" },
  ] as const

  return (
  <div className="rounded-xl sm:rounded-2xl border border-white/20  bg-black p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-slate-100 text-sm sm:text-base">Manage Bookings</h3>
          <p className="text-xs text-slate-500">Recent booking activity</p>
        </div>
      </div>
      <ul className="mt-3 space-y-2 sm:space-y-3">
        {items.map((b) => (
          <li key={b.id} className="rounded-lg sm:rounded-xl border border-white/20 bg-black p-2 sm:p-3">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-slate-100">
                  {b.id} • {b.student}
                </div>
                <div className="text-xs text-slate-500">
                  {b.counsellor} • {b.time}
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-xs text-slate-300">
                {b.status}
              </span>
            </div>
            <div className="mt-2 sm:mt-3 flex items-center gap-1 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-white/20 bg-white/5 text-slate-300 hover:bg-white/10 text-xs px-2 sm:px-3"
              >
                Open
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-white/20 bg-white/5 text-slate-300 hover:bg-white/10 text-xs px-2 sm:px-3"
              >
                Reschedule
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ChatsHistoryCard() {
  const threads = [
    { id: "TH-5921", student: "Anon-7F3A", last: "Panic feelings have improved", when: "09:41" },
    { id: "TH-5918", student: "Anon-2C9D", last: "Discussed sleep hygiene", when: "08:22" },
    { id: "TH-5907", student: "Anon-8B12", last: "Explored motivation triggers", when: "Yesterday" },
  ] as const

  return (
  <div className="rounded-xl sm:rounded-2xl border border-white/20 p-3 sm:p-4 bg-black">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-slate-100 text-sm sm:text-base">Chats History</h3>
          <p className="text-xs text-slate-500">Recent conversations</p>
        </div>
      </div>
      <ul className="mt-3 space-y-2 sm:space-y-3">
        {threads.map((thread) => (
          <li key={thread.id} className="rounded-lg sm:rounded-xl border border-white/20 bg-black p-2 sm:p-3">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-slate-100">
                  {thread.id} • {thread.student}
                </div>
                <p className="line-clamp-2 text-xs text-slate-300">{thread.last}</p>
              </div>
              <div className="shrink-0 text-xs text-slate-500">{thread.when}</div>
            </div>
            <div className="mt-2 sm:mt-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-white/20 bg-white/5 text-slate-300 hover:bg-white/10 text-xs px-2 sm:px-3"
              >
                Open
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("Last 7 Days")

  // mock metrics (anonymous)
  const metrics = {
    chatsInitiated: { value: 1204, delta: +8.4 },
    activeBookings: { value: 86, delta: +3.1 },
    urgentCases: { value: 12, delta: -1.2 },
    moodIndex: { value: 6.8, delta: +0.4 }, // 1-10
  }

  return (
    <div className="min-h-dvh py-6 sm:py-10 overflow-hidden bg-black relative">
      {/* White Spotlight Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
      />
      
      <main className="overflow-y-auto hide-scrollbar relative z-10 md:pl-20" style={{height: 'calc(100vh - 3rem)'}}>
        <div className="px-3 sm:px-4">
          <div className="mx-auto w-full max-w-7xl pb-20 sm:pb-32">
          <TopNav />
          <div className="hidden lg:flex absolute right-5 top-1 items-center gap-3 z-50">
            <ProfileIcon />
          </div>

          {/* Page Title + Timeframe */}
          <section className="pt-20 sm:pt-6 md:pt-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-100 text-balance">
                  Mental Health Dashboard
                </h1>
                <p className="text-sm md:text-base text-slate-500">Analytics & Insights</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 hover:text-slate-100 focus-visible:ring-2 focus-visible:ring-cyan-400/30 text-xs sm:text-sm"
                  >
                    <span className="mr-2">Select Timeframe: {timeframe}</span>
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-56 border-white/10 bg-slate-900 text-slate-100">
                  <DropdownMenuLabel>Timeframe</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {(["Today", "Last 7 Days", "Last 30 Days", "Custom"] as Timeframe[]).map((tf) => (
                    <DropdownMenuItem key={tf} onClick={() => setTimeframe(tf)} className="cursor-pointer">
                      {tf}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </section>

          {/* College Dashboard Link */}
          <div className="mt-3 sm:mt-4">
            <Link href="/dashboard/college">
              <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-black p-3 sm:p-4 transition-all hover:bg-white/7 hover:-translate-y-0.5 cursor-pointer">
                <div className="flex items-center">
                  <div className="rounded-lg bg-[#60A5FA]/20 p-2 sm:p-3">
                    <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-[#60A5FA]" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="font-medium text-slate-100 text-sm sm:text-base">College Dashboard</h3>
                    <p className="text-xs sm:text-sm text-slate-500">View institutional analytics</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Metrics Overview */}
          <div className="mt-4 sm:mt-6 flex flex-col gap-4 sm:gap-6">
            <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricsCard
                title="Chats Initiated"
                value={metrics.chatsInitiated.value}
                delta={metrics.chatsInitiated.delta}
                primary={primary}
                accent={accent}
              />
              <MetricsCard
                title="Active Bookings"
                value={metrics.activeBookings.value}
                delta={metrics.activeBookings.delta}
                primary={primary}
                accent={accent}
              />
              <MetricsCard
                title="Flagged Urgent"
                value={metrics.urgentCases.value}
                delta={metrics.urgentCases.delta}
                primary={primary}
                accent={accent}
              />
              <MetricsCard
                title="Mood Index"
                value={metrics.moodIndex.value}
                delta={metrics.moodIndex.delta}
                primary={primary}
                accent={accent}
                suffix="/10"
              />
            </div>

           

            {/* Admin panels: Manage Bookings + Chats History */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
              <ManageBookingsCard />
              <ChatsHistoryCard />
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  )
}
