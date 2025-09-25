"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { TopNav } from "@/components/nav/top-nav"
import { ProfileIcon } from "@/components/profile/icon"
import LanguageSelector from "@/components/ui/language-selector"
import { useLanguage } from "@/components/ui/language-context"

type Resource = {
  id: string
  title: string
  description: string
  category: "Anxiety" | "Mindfulness" | "Sleep" | "Depression" | "Stress" | "Productivity"
  format: "Article" | "Video" | "Worksheet" | "Guide"
  popularity: number // for sorting
  dateAdded: string // ISO
  recommended?: boolean
}

const INITIAL_RESOURCES: Resource[] = [
  {
    id: "r1",
    title: "Breathing Techniques for Anxiety",
    description: "Learn simple breathing exercises to calm your mind and reduce anxiety in stressful situations.",
    category: "Mindfulness",
    format: "Guide",
    popularity: 98,
    dateAdded: "2025-07-10",
    recommended: true,
  },
  {
    id: "r2",
    title: "Cognitive Restructuring Worksheet",
    description: "Challenge negative thought patterns and develop healthier thinking habits with this practical worksheet.",
    category: "Depression",
    format: "Worksheet",
    popularity: 87,
    dateAdded: "2025-06-25",
  },
  {
    id: "r3",
    title: "Sleep Hygiene Guide",
    description: "Improve your sleep quality with evidence-based tips and create a healthy bedtime routine.",
    category: "Sleep",
    format: "Article",
    popularity: 76,
    dateAdded: "2025-08-15",
    recommended: true,
  },
  {
    id: "r4",
    title: "Body Scan Meditation",
    description: "A guided meditation to help you relax your body and mind through progressive muscle relaxation.",
    category: "Mindfulness",
    format: "Video",
    popularity: 65,
    dateAdded: "2025-05-11",
  },
  {
    id: "r5",
    title: "Grounding Techniques",
    description: "Quick and effective techniques to help you stay present and manage overwhelming emotions.",
    category: "Anxiety",
    format: "Guide",
    popularity: 92,
    dateAdded: "2025-08-20",
    recommended: true,
  },
  {
    id: "r6",
    title: "Focus and Productivity Tips",
    description: "Strategies to improve concentration and maintain productivity while managing stress and distractions.",
    category: "Productivity",
    format: "Worksheet",
    popularity: 58,
    dateAdded: "2025-08-02",
  },
]

const ALL_CATEGORIES = ["All", "Anxiety", "Mindfulness", "Sleep", "Depression", "Stress", "Productivity"] as const
const ALL_FORMATS = ["All", "Article", "Video", "Worksheet", "Guide"] as const
type CategoryFilter = (typeof ALL_CATEGORIES)[number]
type FormatFilter = (typeof ALL_FORMATS)[number]
type SortOption = "Most Popular" | "Newest" | "Recommended"

export default function ResourcesPage() {
  const { t } = useLanguage()
  // search + filters
  const [search, setSearch] = useState("")
  const [debounced, setDebounced] = useState("")
  const [category, setCategory] = useState<CategoryFilter>("All")
  const [format, setFormat] = useState<FormatFilter>("All")
  const [sort, setSort] = useState<SortOption>("Recommended")

  // saved and recently viewed (demo state)
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [recentIds, setRecentIds] = useState<string[]>([])

  // mobile quick access toggle
  const [showQuickMobile, setShowQuickMobile] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim().toLowerCase()), 180)
    return () => clearTimeout(t)
  }, [search])

  const filtered = useMemo(() => {
    let list = INITIAL_RESOURCES.filter((r) => {
      const matchesCategory = category === "All" || r.category === category
      const matchesFormat = format === "All" || r.format === format
      const matchesSearch =
        !debounced || r.title.toLowerCase().includes(debounced) || r.description.toLowerCase().includes(debounced)
      return matchesCategory && matchesFormat && matchesSearch
    })

    switch (sort) {
      case "Most Popular":
        list = [...list].sort((a, b) => b.popularity - a.popularity)
        break
      case "Newest":
        list = [...list].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        break
      case "Recommended":
      default:
        list = [...list].sort((a, b) => Number(b.recommended) - Number(a.recommended))
        break
    }

    return list
  }, [category, format, debounced, sort])

  const featured = useMemo(() => INITIAL_RESOURCES.filter((r) => r.recommended), [])
  const saved = useMemo(() => INITIAL_RESOURCES.filter((r) => savedIds.includes(r.id)), [savedIds])
  const recent = useMemo(() => INITIAL_RESOURCES.filter((r) => recentIds.includes(r.id)), [recentIds])

  function toggleSave(id: string) {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }
  function markViewed(id: string) {
    setRecentIds((prev) => {
      if (prev.includes(id)) return prev
      const next = [id, ...prev]
      return next.slice(0, 8)
    })
  }

  return (
    <div className="min-h-dvh bg-black overflow-hidden">
      <TopNav />
      {/* Profile Icon and Language Selector - hidden on mobile, visible on desktop */}
      <div className="hidden md:flex absolute top-5 right-5 z-50 items-center gap-3">
        <LanguageSelector />
        <ProfileIcon />
      </div>
      
      <main className="overflow-y-auto hide-scrollbar text-slate-100 relative" style={{height: '100vh'}}>
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

        {/* Page container - adjusted padding for mobile nav */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 pb-20 pt-16 md:pt-8 md:pl-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pt-4 sm:pt-6 md:pt-8 lg:pt-12"
        >
          <div className="space-y-4">
            <h1 className="text-pretty text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-100">
              {t("resources_self_help")}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
              {t("curated_guides")}
            </p>

            {/* Search */}
            <div className="relative">
              <label htmlFor="resource-search" className="sr-only">
                Search resources
              </label>
              <Input
                id="resource-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search resources..."
                className={cn(
                  "w-full rounded-full bg-white/5 border border-white/10",
                  "px-4 sm:px-5 py-2.5 pr-10 sm:pr-12 text-sm sm:text-base",
                  "placeholder:text-slate-500 focus:outline-none focus:ring-2",
                  "focus:ring-cyan-400/40 focus:border-cyan-400/30 transition",
                )}
              />
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="text-slate-500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Controls + Layout */}
        <section className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Main */}
          <div className="lg:col-span-9">
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
              className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:flex-wrap gap-3 sm:gap-4"
            >
              {/* Category */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm text-slate-300 whitespace-nowrap">Category</span>
                <Select value={category} onValueChange={(v) => setCategory(v as CategoryFilter)}>
                  <SelectTrigger className="h-10 sm:h-9 rounded-full bg-white/5 border-white/10 px-3 hover:bg-white/7 transition-colors min-w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Format */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm text-slate-300 whitespace-nowrap">Format</span>
                <Select value={format} onValueChange={(v) => setFormat(v as FormatFilter)}>
                  <SelectTrigger className="h-10 sm:h-9 rounded-full bg-white/5 border-white/10 px-3 hover:bg-white/7 transition-colors min-w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_FORMATS.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm text-slate-300 whitespace-nowrap">Sort</span>
                <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                  <SelectTrigger className="h-10 sm:h-9 rounded-full bg-white/5 border-white/10 px-3 hover:bg-white/7 transition-colors min-w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(["Recommended", "Most Popular", "Newest"] as SortOption[]).map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
                >
                  {filtered.map((r) => (
                    <motion.article
                      key={r.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={cn(
                        "group rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5",
                        "hover:shadow-md hover:shadow-black/20 hover:-translate-y-0.5 hover:bg-white/7 transition-all duration-200",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base sm:text-lg font-medium leading-6 text-slate-100 pr-2">{r.title}</h3>
                        <Button
                          aria-label={savedIds.includes(r.id) ? "Unsave" : "Save"}
                          onClick={() => toggleSave(r.id)}
                          className={cn(
                            "rounded-full p-2 border border-white/10 bg-white/5 hover:bg-white/10 transition shrink-0",
                            savedIds.includes(r.id) && "bg-purple-500/20 border-purple-500/30",
                          )}
                          title={savedIds.includes(r.id) ? "Saved" : "Save"}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill={savedIds.includes(r.id) ? "currentColor" : "none"}
                            className={cn(savedIds.includes(r.id) ? "text-purple-400" : "text-slate-300")}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 3h12a1 1 0 0 1 1 1v16l-7-4-7 4V4a1 1 0 0 1 1-1Z"
                              stroke="currentColor"
                              strokeWidth={savedIds.includes(r.id) ? 0 : 1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                      </div>

                      <p className="mt-2 sm:mt-3 text-sm text-slate-300 line-clamp-2">{r.description}</p>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-slate-100">
                          {r.category}
                        </span>

                        <Button
                          onClick={() => {
                            markViewed(r.id)
                            // In a real app, link to resource detail or external URL
                          }}
                          className={cn(
                            "rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium",
                            "bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] text-slate-900 hover:from-[#22D3EE]/90 hover:to-[#60A5FA]/90 transition",
                          )}
                        >
                          View Resource
                        </Button>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-10 text-center"
                >
                  <img
                    src="/empty-state-search-no-results.png"
                    width={120}
                    height={120}
                    alt="No results illustration"
                    className="mx-auto opacity-80"
                  />
                  <h3 className="mt-6 text-lg font-medium text-slate-100">No results found</h3>
                  <p className="mt-1 text-slate-300">Try adjusting your search or filters</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Access Panel (desktop), collapsible on mobile */}
          <aside className="lg:col-span-3">
            {/* Mobile toggle */}
            <div className="lg:hidden mb-3">
              <Button
                onClick={() => setShowQuickMobile((s) => !s)}
                className="w-full rounded-full bg-white/5 border border-white/10 px-4 py-3 text-sm hover:bg-white/10"
                aria-expanded={showQuickMobile}
                aria-controls="quick-access-panel"
                variant="outline"
              >
                {showQuickMobile ? "Hide" : "Show"} Quick Access
              </Button>
            </div>

            <div
              id="quick-access-panel"
              className={cn(
                "rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 space-y-5 sm:space-y-6",
                "hidden lg:block hover:bg-white/7 transition-colors",
                showQuickMobile && "block lg:block",
              )}
            >
              <SectionBlock title="Featured Guides">
                <ul className="space-y-2 sm:space-y-3">
                  {featured.map((f) => (
                    <li key={f.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/7 transition-colors">
                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-slate-100">{f.title}</span>
                      </div>
                      <Button
                        onClick={() => {
                          markViewed(f.id)
                        }}
                        variant="outline"
                        className="h-8 rounded-full bg-white/5 border-white/10 px-3 text-xs hover:bg-white/10 whitespace-nowrap text-slate-100"
                      >
                        Open
                      </Button>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock title="Recently Viewed">
                {recent.length === 0 ? (
                  <p className="text-sm text-slate-300">Nothing yet</p>
                ) : (
                  <ul className="space-y-2">
                    {recent.map((r) => (
                      <li key={r.id} className="flex items-center justify-between gap-2">
                        <span className="text-sm text-slate-100 truncate pr-2">{r.title}</span>
                        <Button
                          onClick={() => {
                            markViewed(r.id)
                          }}
                          variant="outline"
                          className="h-8 rounded-full bg-white/5 border-white/10 px-3 text-xs hover:bg-white/10 text-slate-100 shrink-0"
                        >
                          Open
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </SectionBlock>

              <SectionBlock title="Saved Resources">
                {saved.length === 0 ? (
                  <p className="text-sm text-slate-300">Nothing saved yet</p>
                ) : (
                  <ul className="space-y-2">
                    {saved.map((r) => (
                      <li key={r.id} className="flex items-center justify-between gap-2">
                        <span className="text-sm text-slate-100 truncate pr-2">{r.title}</span>
                        <Button
                          onClick={() => toggleSave(r.id)}
                          variant="outline"
                          className="h-8 rounded-full bg-white/5 border-white/10 px-3 text-xs hover:bg-white/10 text-slate-100 shrink-0"
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </SectionBlock>
            </div>
          </aside>
        </section>
        </div>
      </main>
    </div>
  )
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-100">{title}</h4>
      <div className="mt-2">{children}</div>
    </div>
  )
}
