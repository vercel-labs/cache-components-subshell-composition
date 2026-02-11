import { CategoryNav, List } from '@/app/products/ui'
import { getCategories, getProducts } from '@/app/products/data'

// Static component
function Header() {
  return (
    <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
      Shop
    </h1>
  )
}

// Cache component
async function ProductList() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ])

  const categoryMap = Object.fromEntries(
    categories.map((c) => [c.id, c.slug])
  )

  return (
    <div className="grid gap-6">
      <CategoryNav categories={categories} />
      <List items={products} categoryMap={categoryMap} />
    </div>
  )
}

export default async function Page() {
  return (
    <>
      <Header />
      <ProductList />
    </>
  )
}
