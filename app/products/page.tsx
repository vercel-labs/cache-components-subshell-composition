import { List } from '@/app/products/ui'
import { getProducts } from '@/app/products/data'

function Header() {
  return (
    <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
      Shop
    </h1>
  )
}

async function ProductList() {
  const products = await getProducts()

  return <List items={products} />
}

export default async function Page() {
  return (
    <>
      <Header />
      <ProductList />
    </>
  )
}
