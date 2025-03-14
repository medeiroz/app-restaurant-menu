export interface Restaurant {
  uuid: string
  slug: string
  name: string
  currency: string
  logo: string
  imagesCarousel: Image[]
  foodCategory: string
  mainCategories: MainCategory[]
}

export interface Category {
  uuid: string
  name: string
  items: MenuItem[]
}

export interface MainCategory {
  uuid: string
  name: string
  image: Image
  categories: Category[]
}

export interface MenuItem {
  uuid: string
  title: string
  description: string | null
  extra: string | null
  price: number
  images: Image[]
}

export interface Image {
  uuid: string
  src: string
  alt: string | null
}

