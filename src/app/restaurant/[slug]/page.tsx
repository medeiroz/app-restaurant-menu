import RestaurantMenu from "@/components/restaurant-menu"
import { getRestaurantData } from "@/lib/data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page(props: PageProps) {
  const { slug } = await props.params
  const restaurant = await getRestaurantData(slug)

  return (
    <main className="min-h-screen bg-gray-50" slug={slug} >
      <RestaurantMenu restaurant={restaurant} />
    </main>
  )
}