export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export async function getProducts(): Promise<Product[]> {
  'use cache'
  const response = await fetch('https://next-recipe-api.vercel.dev/products')

  return response.json()
}

export async function getProduct(id: string): Promise<Product> {
  'use cache'
  const response = await fetch(
    `https://next-recipe-api.vercel.dev/products/${id}`
  )

  return response.json()
}

export type Activity = { id: string; sold: number; wishlisted: number; viewed: number; inDemand: boolean }
export async function getActivity(id: string): Promise<Activity> {
  const response = await fetch(
    `https://next-recipe-api.vercel.dev/products/${id}/activity`
  )

  return response.json()
}

export type Promotion = { message: string }
export async function getPromotion(): Promise<Promotion | null> {
  // Artificial delay to make the demo more obvious
  await new Promise((resolve) => setTimeout(resolve, 200))

  const response = await fetch('https://next-recipe-api.vercel.dev/promotion')

  return response.json()
}
