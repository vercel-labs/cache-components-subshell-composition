import { Suspense } from 'react'
import Link from 'next/link'
import { getCategory } from '@/app/products/data'
import { ProductSkeleton } from '@/app/products/ui'

async function CategoryHeader({ category }: { category: string }) {
  const cat = await getCategory(category)

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-3">
        <Link
          href="/products"
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          &larr; All products
        </Link>
      </div>
      <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
        {cat.name}
      </h1>
    </div>
  )
}

export default async function CategoryLayout({
  children,
  params,
}: LayoutProps<'/products/[category]'>) {
  const { category } = await params

  return (
    <>
      <CategoryHeader category={category} />
      <Suspense fallback={<ProductSkeleton />}>{children}</Suspense>
    </>
  )
}
