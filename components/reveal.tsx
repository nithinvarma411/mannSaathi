"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const t = window.setTimeout(() => setVisible(true), delay)
            return () => window.clearTimeout(t)
          }
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700",
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      ].join(" ")}
    >
      {children}
    </div>
  )
}
