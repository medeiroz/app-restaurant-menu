"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import type { Restaurant, MenuItem as MenuItemType } from "@/types/restaurant"
import MenuCategories from "./menu-categories"
import ImageCarousel from "./image-carousel"
import MenuItemDetail from "./menu-item-detail"

export default function RestaurantMenu({ restaurant }: { restaurant: Restaurant }) {
  const [activeMainCategory, setActiveMainCategory] = useState<string>(restaurant.mainCategories[0]?.uuid || "")
  const [activeCategory, setActiveCategory] = useState<string>("")
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null)
  const mainCategoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Set up intersection observers for main categories
  useEffect(() => {
    const observerOptions = {
      rootMargin: "-100px 0px -80% 0px",
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          if (id.startsWith("main-")) {
            setActiveMainCategory(id.replace("main-", ""))
          } else if (id.startsWith("category-")) {
            setActiveCategory(id.replace("category-", ""))
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe main categories
    Object.values(mainCategoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // Observe categories
    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      observer.disconnect()
    }
  }, [restaurant.mainCategories])

  const scrollToCategory = (categoryId: string) => {
    categoryRefs.current[categoryId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const scrollToMainCategory = (mainCategoryId: string) => {
    mainCategoryRefs.current[mainCategoryId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    setActiveMainCategory(mainCategoryId)
  }

  const handleItemClick = (item: MenuItemType) => {
    setSelectedItem(item)
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden"
  }

  const handleCloseItemDetail = () => {
    setSelectedItem(null)
    // Restore body scrolling
    document.body.style.overflow = ""
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Restaurant Header */}
      <header className="sticky top-0 z-30 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className="relative h-12 w-12 mr-3">
            <Image
              src={restaurant.logo || "/placeholder.svg"}
              alt={restaurant.name}
              fill
              className="object-contain rounded-full"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">{restaurant.name}</h1>
            <p className="text-sm text-gray-500">{restaurant.foodCategory}</p>
          </div>
        </div>
      </header>

      {/* Image Carousel */}
      <div className="w-full h-48 sm:h-64 md:h-80 relative">
        <ImageCarousel images={restaurant.imagesCarousel} />
      </div>

      {/* Main Categories Navigation */}
      <div className="sticky top-20 z-20 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-3 scrollbar-hide">
            {restaurant.mainCategories.map((mainCategory) => (
              <button
                key={mainCategory.uuid}
                onClick={() => scrollToMainCategory(mainCategory.uuid)}
                className={`whitespace-nowrap px-4 py-2 mx-1 rounded-full text-sm font-medium transition-colors ${
                  activeMainCategory === mainCategory.uuid ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {mainCategory.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        {restaurant.mainCategories.map((mainCategory) => (
          <div
            key={mainCategory.uuid}
            id={`main-${mainCategory.uuid}`}
            ref={(el) => (mainCategoryRefs.current[mainCategory.uuid] = el)}
            className="mb-12"
          >
            <div className="flex items-center mb-6">
              <div className="relative h-16 w-16 mr-4 rounded-lg overflow-hidden">
                <Image
                  src={mainCategory.image.src || "/placeholder.svg"}
                  alt={mainCategory.image.alt || mainCategory.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold">{mainCategory.name}</h2>
            </div>

            {/* Categories within this main category */}
            <MenuCategories
              categories={mainCategory.categories}
              currency={restaurant.currency}
              categoryRefs={categoryRefs}
              activeCategory={activeCategory}
              scrollToCategory={scrollToCategory}
              onItemClick={handleItemClick}
            />
          </div>
        ))}
      </div>

      {/* Menu Item Detail Modal */}
      {selectedItem && (
        <MenuItemDetail item={selectedItem} currency={restaurant.currency} onClose={handleCloseItemDetail} />
      )}
    </div>
  )
}

