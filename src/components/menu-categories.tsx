"use client"

import type { Category } from "@/types/restaurant"
import MenuItem from "./menu-item"
import type { RefObject } from "react"
import type { MenuItem as MenuItemType } from "@/types/restaurant"

interface MenuCategoriesProps {
  categories: Category[]
  currency: string
  categoryRefs: RefObject<{ [key: string]: HTMLDivElement | null }>
  activeCategory: string
  scrollToCategory: (categoryId: string) => void
  onItemClick: (item: MenuItemType) => void
}

export default function MenuCategories({
  categories,
  currency,
  categoryRefs,
  activeCategory,
  scrollToCategory,
  onItemClick,
}: MenuCategoriesProps) {
  if (categories.length === 0) return null

  return (
    <div>
      {/* Subcategory Navigation */}
      <div className="sticky top-36 z-10 bg-white py-2 border-b mb-6">
        <div className="flex overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category) => (
            <button
              key={category.uuid}
              onClick={() => scrollToCategory(category.uuid)}
              className={`whitespace-nowrap px-3 py-1.5 mr-2 text-sm font-medium rounded-md transition-colors ${
                activeCategory === category.uuid
                  ? "bg-primary/10 text-primary border-b-2 border-primary"
                  : "hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Categories and their items */}
      {categories.map((category) => (
        <div
          key={category.uuid}
          id={`category-${category.uuid}`}
          ref={(el) => {
            if (categoryRefs.current) {
              categoryRefs.current[category.uuid] = el
            }
          }}
          className="mb-10"
        >
          <h3 className="text-xl font-semibold mb-4 pl-2 border-l-4 border-primary">{category.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map((item) => (
              <MenuItem key={item.uuid} item={item} currency={currency} onItemClick={onItemClick} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

