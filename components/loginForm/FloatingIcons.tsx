"use client"

import { useState, useEffect } from "react"

interface ImageItem {
  id: number
  src: string
  alt: string
}

const images: ImageItem[] = [
  { id: 1, src: "/uni logos/11222b92a79795876450d8b1d8ddb3bc-removebg-preview.png", alt: "Logo 1" },
  { id: 2, src: "/uni logos/2d3e1010d900bbe48926d78a57a8c351-removebg-preview.png", alt: "Logo 2" },
  { id: 3, src: "/uni logos/cc193190ec30a77865f3fb118bbc8ad3-removebg-preview.png", alt: "Logo 3" },
  { id: 4, src: "/uni logos/f58b420f69a9dc00f6aebf7639685e51-removebg-preview.png", alt: "Logo 4" },
  { id: 5, src: "/uni logos/educare.png", alt: "Ocean waves" },
  { id: 6, src: "/uni logos/unilogo1.png", alt: "Mountain landscape" },
  { id: 7, src: "/uni logos/unilogo2.png", alt: "Architecture" },
  { id: 8, src: "/uni logos/unilogo3.png", alt: "Sunset sky" },
  { id: 9, src: "/uni logos/unilogo4.png", alt: "Leopard pattern" },
  { id: 10, src: "/uni logos/unilogo5.png", alt: "Glass building" },
  { id: 11, src: "/uni logos/unilogo6.png", alt: "Forest path" },
  { id: 12, src: "/uni logos/unilogo7.png", alt: "Abstract art" },
  { id: 13, src: "/uni logos/unilogo8.png", alt: "City lights" },
  { id: 14, src: "/uni logos/unilogo9.png", alt: "Desert dunes" },
]

export default function SemicircleGallery() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Split images into two circles
  const outerImages = images.slice(0, Math.ceil(images.length / 2))
  const innerImages = images.slice(Math.ceil(images.length / 2))

  return (
    <div className="absolute h-full w-full bg-background flex flex-col items-center justify-center p-8 pt-16 overflow-hidden">
      {/* Outer Circle */}
      {outerImages.map((image, index) => {
        const angle = (index / outerImages.length) * 2 * Math.PI
        const radius = 270

        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        const rotation = (angle * 180) / Math.PI - 90

        return (
          <div
            key={`outer-${image.id}`}
            className="absolute w-16 h-16 transition-all duration-500 hover:scale-110 hover:z-10"
            style={{
              left: `calc(50% + ${x}px - 32px)`,
              top: `calc(50% + ${y}px - 32px)`,
              transform: `rotate(${rotation * 0.2}deg)`,
              animationDelay: `${index * 0.2}s`,
              animationDuration: `${3 + index * 0.1}s`,
            }}
          >
            <div className="w-full h-full bg-card rounded-lg shadow-lg overflow-hidden border border-border/20 hover:shadow-xl transition-shadow duration-300">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )
      })}

      {/* Inner Circle */}
      {innerImages.map((image, index) => {
        const angle = (index / innerImages.length) * 2 * Math.PI
        const radius = 160

        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        const rotation = (angle * 180) / Math.PI - 90

        return (
          <div
            key={`inner-${image.id}`}
            className="absolute w-12 h-12 transition-all duration-500 hover:scale-110 hover:z-10"
            style={{
              left: `calc(50% + ${x}px - 24px)`,
              top: `calc(50% + ${y}px - 24px)`,
              transform: `rotate(${rotation * 0.2}deg)`,
              animationDelay: `${index * 0.2 + 0.1}s`,
              animationDuration: `${2.5 + index * 0.1}s`,
            }}
          >
            <div className="w-full h-full bg-card rounded-lg shadow-lg overflow-hidden border border-border/20 hover:shadow-xl transition-shadow duration-300">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )
      })}

      <div className="absolute flex items-center justify-center top-76">
        <div className="text-center max-w-lg mx-auto mt-16">
          <h1 className="text-3xl md:text-4xl font-light text-foreground text-balance">
            {"ClamSpace"}
          </h1>
        </div>
      </div>
    </div>
  )
}
