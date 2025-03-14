import type { Restaurant } from "@/types/restaurant";

// This is mock data for development purposes
// In a real application, this would come from an API
export async function getRestaurantData(slug: string): Promise<Restaurant> {
  // Simulate API call
  return {
    uuid: "rest-001",
    slug: slug,
    name: "Italian Bistro",
    currency: "USD",
    logo: "/placeholder.svg?height=100&width=100",
    foodCategory: "Italian Cuisine",
    imagesCarousel: [
      {
        uuid: "img-001",
        src: "/placeholder.svg?height=400&width=800",
        alt: "Restaurant interior",
      },
      {
        uuid: "img-002",
        src: "/placeholder.svg?height=400&width=800",
        alt: "Chef preparing pasta",
      },
      {
        uuid: "img-003",
        src: "/placeholder.svg?height=400&width=800",
        alt: "Outdoor seating",
      },
    ],
    mainCategories: [
      {
        uuid: "main-001",
        name: "Appetizers",
        image: {
          uuid: "img-004",
          src: "/placeholder.svg?height=200&width=200",
          alt: "Appetizers",
        },
        categories: [
          {
            uuid: "cat-001",
            name: "Salads",
            items: [
              {
                uuid: "item-001",
                title: "Caesar Salad",
                description:
                  "Romaine lettuce, croutons, parmesan cheese with Caesar dressing",
                extra: "Add chicken +$3",
                price: 8.99,
                images: [
                  {
                    uuid: "img-005",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Caesar Salad",
                  },
                ],
              },
              {
                uuid: "item-002",
                title: "Caprese Salad",
                description:
                  "Fresh mozzarella, tomatoes, and sweet basil with a balsamic glaze",
                extra: null,
                price: 9.99,
                images: [
                  {
                    uuid: "img-006",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Caprese Salad",
                  },
                ],
              },
            ],
          },
          {
            uuid: "cat-002",
            name: "Starters",
            items: [
              {
                uuid: "item-003",
                title: "Bruschetta",
                description:
                  "Grilled bread rubbed with garlic and topped with diced tomatoes, olive oil, and herbs",
                extra: null,
                price: 7.99,
                images: [
                  {
                    uuid: "img-007",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Bruschetta",
                  },
                ],
              },
              {
                uuid: "item-004",
                title: "Garlic Bread",
                description: "Freshly baked bread with garlic butter and herbs",
                extra: "Add cheese +$1",
                price: 5.99,
                images: [
                  {
                    uuid: "img-008",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Garlic Bread",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        uuid: "main-002",
        name: "Main Courses",
        image: {
          uuid: "img-009",
          src: "/placeholder.svg?height=200&width=200",
          alt: "Main Courses",
        },
        categories: [
          {
            uuid: "cat-003",
            name: "Pasta",
            items: [
              {
                uuid: "item-005",
                title: "Spaghetti Carbonara",
                description:
                  "Spaghetti with a creamy sauce of eggs, cheese, pancetta, and black pepper",
                extra: null,
                price: 14.99,
                images: [
                  {
                    uuid: "img-010",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Spaghetti Carbonara",
                  },
                ],
              },
              {
                uuid: "item-006",
                title: "Fettuccine Alfredo",
                description:
                  "Fettuccine tossed with butter and parmesan cheese",
                extra: "Add chicken +$3, Add shrimp +$5",
                price: 13.99,
                images: [
                  {
                    uuid: "img-011",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Fettuccine Alfredo",
                  },
                ],
              },
              {
                uuid: "item-007",
                title: "Lasagna",
                description:
                  "Layers of pasta, ricotta cheese, and bolognese sauce",
                extra: null,
                price: 15.99,
                images: [
                  {
                    uuid: "img-012",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Lasagna",
                  },
                ],
              },
            ],
          },
          {
            uuid: "cat-004",
            name: "Pizza",
            items: [
              {
                uuid: "item-008",
                title: "Margherita Pizza",
                description: "Tomato sauce, mozzarella, and basil",
                extra: null,
                price: 12.99,
                images: [
                  {
                    uuid: "img-013",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Margherita Pizza",
                  },
                ],
              },
              {
                uuid: "item-009",
                title: "Pepperoni Pizza",
                description: "Tomato sauce, mozzarella, and pepperoni",
                extra: null,
                price: 13.99,
                images: [
                  {
                    uuid: "img-014",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Pepperoni Pizza",
                  },
                ],
              },
              {
                uuid: "item-010",
                title: "Quattro Formaggi",
                description:
                  "Four cheese pizza with mozzarella, gorgonzola, fontina, and parmesan",
                extra: null,
                price: 14.99,
                images: [
                  {
                    uuid: "img-015",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Quattro Formaggi",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        uuid: "main-003",
        name: "Desserts",
        image: {
          uuid: "img-016",
          src: "/placeholder.svg?height=200&width=200",
          alt: "Desserts",
        },
        categories: [
          {
            uuid: "cat-005",
            name: "Sweet Treats",
            items: [
              {
                uuid: "item-011",
                title: "Tiramisu",
                description:
                  "Coffee-flavored Italian dessert made of ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese",
                extra: null,
                price: 7.99,
                images: [
                  {
                    uuid: "img-017",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Tiramisu",
                  },
                ],
              },
              {
                uuid: "item-012",
                title: "Panna Cotta",
                description:
                  "Italian dessert of sweetened cream thickened with gelatin and molded",
                extra: "With berry compote",
                price: 6.99,
                images: [
                  {
                    uuid: "img-018",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Panna Cotta",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        uuid: "main-004",
        name: "Drinks",
        image: {
          uuid: "img-019",
          src: "/placeholder.svg?height=200&width=200",
          alt: "Drinks",
        },
        categories: [
          {
            uuid: "cat-006",
            name: "Soft Drinks",
            items: [
              {
                uuid: "item-013",
                title: "Sparkling Water",
                description: "500ml bottle",
                extra: null,
                price: 2.99,
                images: [
                  {
                    uuid: "img-020",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Sparkling Water",
                  },
                ],
              },
              {
                uuid: "item-014",
                title: "Soda",
                description: "Coke, Diet Coke, Sprite",
                extra: null,
                price: 2.49,
                images: [
                  {
                    uuid: "img-021",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Soda",
                  },
                ],
              },
            ],
          },
          {
            uuid: "cat-007",
            name: "Wine",
            items: [
              {
                uuid: "item-015",
                title: "House Red Wine",
                description: "Glass of our house red wine",
                extra: "Bottle available",
                price: 6.99,
                images: [
                  {
                    uuid: "img-022",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "Red Wine",
                  },
                ],
              },
              {
                uuid: "item-016",
                title: "House White Wine",
                description: "Glass of our house white wine",
                extra: "Bottle available",
                price: 6.99,
                images: [
                  {
                    uuid: "img-023",
                    src: "/placeholder.svg?height=300&width=300",
                    alt: "White Wine",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
