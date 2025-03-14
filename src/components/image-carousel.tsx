"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Image as ImageType } from "@/types/restaurant"

interface ImageCarouselProps {
  images: ImageType[]
  autoPlay?: boolean
  interval?: number
}

export default function ImageCarousel({ images, autoPlay = true, interval = 5000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, images.length, interval])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  if (images.length === 0) return null
  if (images.length === 1) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={images[0].src || "/placeholder.svg"}
          alt={images[0].alt || "Restaurant image"}
          fill
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
        <Image
          src={images[currentIndex].src || "/placeholder.svg"}
          alt={images[currentIndex].alt || `Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-500"
        />
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

