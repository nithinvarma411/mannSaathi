"use client"

import { useMemo, useState } from "react"
import TopNav from "@/components/nav/top-nav"
import { CategoryPanel } from "@/components/community/category-panel"
import { CreatePost } from "@/components/community/create-post"
import { SortControls, type SortKey } from "@/components/community/sort-controls"
import { PostCard, type CommunityPost } from "@/components/community/post-card"
import { ProfileIcon } from "@/components/profile/icon"
import { useLanguage } from "@/components/ui/language-context"
import LanguageSelector from "@/components/ui/language-selector"

const CATEGORIES = ["category_all", "category_anxiety", "category_depression", "category_mindfulness", "category_sleep", "category_relationships"] as const

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: "p1",
    user: { name: "Anonymous", avatarUrl: "/anonymous-avatar.png", isAnonymous: true },
    category: "Anxiety",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30m
    content: "post_presentation_anxiety",
    likes: 12,
    comments: 5,
    shares: 1,
  },
  {
    id: "p2",
    user: { name: "user_maya_singh", avatarUrl: "/diverse-user-avatars.png", isAnonymous: false },
    category: "Mindfulness",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4h
    content: "post_breathing_practice",
    likes: 34,
    comments: 9,
    shares: 4,
  },
  {
    id: "p3",
    user: { name: "Anonymous", avatarUrl: "/anonymous-avatar.png", isAnonymous: true },
    category: "Sleep",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1d
    content: "post_sleep_cycle",
    likes: 18,
    comments: 12,
    shares: 2,
  },
]

export default function CommunityPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>("category_all")
  const [sortKey, setSortKey] = useState<SortKey>("latest")

  const posts = useMemo(() => {
    const categoryMap = {
      "category_all": "All",
      "category_anxiety": "Anxiety", 
      "category_depression": "Depression",
      "category_mindfulness": "Mindfulness",
      "category_sleep": "Sleep", 
      "category_relationships": "Relationships"
    }
    
    const filtered =
      selectedCategory === "category_all" ? INITIAL_POSTS : INITIAL_POSTS.filter((p) => p.category === categoryMap[selectedCategory])
    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === "latest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortKey === "mostLiked") return b.likes - a.likes
      if (sortKey === "mostDiscussed") return b.comments - a.comments
      return 0
    })
    return sorted
  }, [selectedCategory, sortKey])

  return (
    <div className="min-h-dvh bg-black relative pt-10">
      {/* White Spotlight Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 20%, rgba(0, 0, 0, 0.0) 60%)",
        }}
      />
      <TopNav />
      <main className="px-4 pb-16 pt-4 sm:px-6">
        <div className="mx-auto w-full max-w-4xl space-y-3 md:space-y-0 md:grid md:grid-cols-12 md:gap-6">
          {/* Left column: categories (full width on mobile, sidebar on desktop) */}
          <aside className="md:col-span-3">
            <CategoryPanel
              categories={[...CATEGORIES]}
              selected={selectedCategory}
              onSelect={(c) => setSelectedCategory(c as (typeof CATEGORIES)[number])}
            />
          </aside>

          {/* Right column: main feed */}
          <section className="md:col-span-9 space-y-3 md:space-y-6">
            <div className="space-y-3 md:space-y-4">
              <div className="w-full">
                <CreatePost />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-sm md:text-base font-medium text-slate-100">{t("community")}</h1>
                <SortControls value={sortKey} onChange={setSortKey} />
              </div>
            </div>

            {posts.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center shadow-sm">
                <p className="text-slate-100">{t("no_posts_yet")}</p>
                <p className="mt-1 text-sm text-slate-300">{t("be_first_to_share")}</p>
              </div>
            ) : (
              <ul className="space-y-3 md:space-y-4">
                {posts.map((post) => (
                  <li key={post.id}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <div className="hidden md:block absolute top-6 right-6 z-10">
        <ProfileIcon />
      </div>
      <div className="hidden md:block absolute top-6 right-20 z-10">
        <LanguageSelector />
      </div>
    </div>
  )
}
