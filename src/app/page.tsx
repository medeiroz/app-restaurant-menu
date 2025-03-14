import RestaurantMenu from "@/components/restaurant-menu"
import { getRestaurantData } from "@/lib/data"

export default async function Home() {
  const restaurant = await getRestaurantData()

  return (
    <main className="min-h-screen bg-gray-50">
      <RestaurantMenu restaurant={restaurant} />
    </main>
  )
}