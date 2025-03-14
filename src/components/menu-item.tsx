"use client"

import type { MenuItem as MenuItemType } from "@/types/restaurant"
import Image from "next/image"
import ImageCarousel from "./image-carousel"

interface MenuItemProps {
  item: MenuItemType
  currency: string
  onItemClick: (item: MenuItemType) => void
}

export default function MenuItem({ item, currency, onItemClick }: MenuItemProps) {
  const { title, description, price, images, extra } = item

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(price)
  }

  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 cursor-pointer"
      onClick={() => onItemClick(item)}
    >
      {images.length > 0 && (
        <div className="relative h-48 w-full">
          {images.length === 1 ? (
            <Image
              src={images[0].src || "/placeholder.svg"}
              alt={images[0].alt || title}
              fill
              className="object-cover"
            />
          ) : (
            <ImageCarousel images={images} />
          )}
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-medium">{title}</h4>
          <span className="font-semibold text-primary">{formatPrice(price)}</span>
        </div>
        {description && <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>}
        {extra && <p className="text-xs text-gray-500 italic">{extra}</p>}
      </div>
    </div>
  )
}

