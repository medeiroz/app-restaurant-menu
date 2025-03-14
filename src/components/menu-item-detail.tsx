"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import type { MenuItem } from "@/types/restaurant"
import ImageCarousel from "./image-carousel"

interface MenuItemDetailProps {
  item: MenuItem | null
  currency: string
  onClose: () => void
}

export default function MenuItemDetail({ item, currency, onClose }: MenuItemDetailProps) {
  const detailRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(price)
  }

  // Handle animation on mount
  useEffect(() => {
    // Small delay to ensure the component is mounted before animating
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle close with animation
  const handleClose = () => {
    setIsClosing(true)
    setIsVisible(false)

    setTimeout(() => {
      onClose()
    }, 300) // Match this with the CSS transition duration
  }

  // Handle touch events for swipe down
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchEnd - touchStart
    const isDownSwipe = distance > 100 // Minimum distance for swipe

    if (isDownSwipe) {
      handleClose()
    }

    // Reset values
    setTouchStart(null)
    setTouchEnd(null)
  }

  if (!item) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-all duration-300 ease-in-out ${
        isVisible && !isClosing ? "bg-black/50 opacity-100" : "bg-black/0 opacity-0"
      }`}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <div
        ref={detailRef}
        className={`bg-white w-full max-w-lg rounded-t-xl overflow-hidden max-h-[90vh] overflow-y-auto transition-transform duration-300 ease-out ${
          isVisible && !isClosing ? "translate-y-0" : "translate-y-full"
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Swipe indicator */}
        <div className="w-full flex justify-center py-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-1.5 shadow-md"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Item images */}
        <div className="relative h-64 w-full">
          {item.images.length > 0 ? (
            item.images.length === 1 ? (
              <Image
                src={item.images[0].src || "/placeholder.svg"}
                alt={item.images[0].alt || item.title}
                fill
                className="object-cover"
              />
            ) : (
              <ImageCarousel images={item.images} />
            )
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        {/* Item details */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <span className="text-xl font-semibold text-primary">{formatPrice(item.price)}</span>
          </div>

          {item.description && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          )}

          {item.extra && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Additional Information</h3>
              <p className="text-gray-700 italic">{item.extra}</p>
            </div>
          )}

          {/* Add to cart button or other actions could go here */}
          <button className="w-full bg-primary text-white py-3 rounded-lg font-medium mt-4 hover:bg-primary/90 transition-colors">
            Add to Order
          </button>
        </div>
      </div>
    </div>
  )
}

