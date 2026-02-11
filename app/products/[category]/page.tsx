import { List } from '@/app/products/ui'
import { getCategories, getProductsByCategory } from '@/app/products/data'

export async function generateStaticParams() {
  const categories = await getCategories()

  return categories.map((c) => ({ category: c.slug }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const products = await getProductsByCategory(category)

  return <List items={products} categorySlug={category} />
}
