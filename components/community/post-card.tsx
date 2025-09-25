"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2 } from "lucide-react"

export type CommunityPost = {
  id: string
  user: { name: string; avatarUrl: string; isAnonymous: boolean }
  category: "Anxiety" | "Depression" | "Mindfulness" | "Sleep" | "Relationships"
  createdAt: string
  content: string
  likes: number
  comments: number
  shares: number
}

function timeSince(iso: string) {
  const ms = Date.now() - new Date(iso).getTime()
  const m = Math.floor(ms / 60000)
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h`
  const d = Math.floor(h / 24)
  return `${d}d`
}

export function PostCard({ post }: { post: CommunityPost }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="rounded-lg border border-white/10 bg-white/5 p-3 md:p-4 shadow-sm transition-colors hover:bg-white/7">
      <header className="mb-2 md:mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
          <div className="h-7 w-7 md:h-9 md:w-9 flex-shrink-0 overflow-hidden rounded-full bg-white/10">
            <img
              src={post.user.avatarUrl || "/placeholder.svg?height=36&width=36&query=avatar"}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="leading-tight flex-1 min-w-0">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm font-medium text-slate-100 truncate">
                  {post.user.isAnonymous ? "Anonymous" : post.user.name}
                </span>
                <span className="rounded-full border border-white/15 px-1.5 py-0.5 text-[9px] md:text-[10px] font-medium text-slate-300 flex-shrink-0">
                  {post.category}
                </span>
              </div>
              <span className="text-[10px] md:text-xs text-slate-500">{timeSince(post.createdAt)} ago</span>
            </div>
          </div>
        </div>
      </header>

      <div className="text-xs md:text-sm text-slate-100 mb-2 md:mb-4 break-words">
        {/* Clamp to 3 lines when not expanded for a sleek preview */}
        <p className={expanded ? "text-pretty" : "text-pretty line-clamp-3"}>
          {post.content}{" "}
          {post.content.length > 0 &&
            (!expanded ? (
              <button onClick={() => setExpanded(true)} className="text-cyan-400 hover:underline text-xs">
                Read more
              </button>
            ) : (
              <button onClick={() => setExpanded(false)} className="text-cyan-400 hover:underline text-xs">
                Show less
              </button>
            ))}
        </p>
      </div>

      <footer className="flex items-center gap-1 justify-start">
        <Button
          variant="ghost"
          size="sm"
          aria-label="Like"
          className="h-6 md:h-8 px-1.5 md:px-2 rounded-full text-slate-300 hover:bg-white/5 hover:text-slate-100 flex-shrink-0"
        >
          <Heart className="mr-1 h-3 w-3 md:h-4 md:w-4" aria-hidden />
          <span className="text-[10px] md:text-xs">{post.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Comment"
          className="h-6 md:h-8 px-1.5 md:px-2 rounded-full text-slate-300 hover:bg-white/5 hover:text-slate-100 flex-shrink-0"
        >
          <MessageSquare className="mr-1 h-3 w-3 md:h-4 md:w-4" aria-hidden />
          <span className="text-[10px] md:text-xs">{post.comments}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Share"
          className="h-6 md:h-8 px-1.5 md:px-2 rounded-full text-slate-300 hover:bg-white/5 hover:text-slate-100 flex-shrink-0"
        >
          <Share2 className="mr-1 h-3 w-3 md:h-4 md:w-4" aria-hidden />
          <span className="text-[10px] md:text-xs">{post.shares}</span>
        </Button>
      </footer>
    </article>
  )
}
