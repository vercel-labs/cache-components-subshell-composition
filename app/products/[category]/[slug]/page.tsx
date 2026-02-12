import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProduct, getCategories, getCategory } from '@/app/products/data'

export async function generateStaticParams() {
  // Generate a subset to prerender each category subshell.
  // Remaining products are dynamic — they reuse the cached category shell
  // and stream in the product details, demonstrating subshell composition.
  const categories = await getCategories()
  const params: { category: string; slug: string }[] = []

  for (const cat of categories) {
    const data = await getCategory(cat.slug)
    for (const product of data.products.slice(0, 1)) {
      params.push({ category: cat.slug, slug: product.id })
    }
  }

  return params
}

// Cache component
async function ProductDetails({ slug }: { slug: string }) {
  const product = await getProduct(slug)

  if (!product) notFound()

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-10">
      <div className="relative flex aspect-square items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.image}
          alt={product.name}
          width={384}
          height={384}
          className="object-cover opacity-90 brightness-150 dark:brightness-100"
        />
      </div>
      <div className="grid gap-2 md:content-start">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {product.name}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {product.description}
        </p>
        <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
          ${product.price}
        </p>
      </div>
    </div>
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { slug } = await params

  return <ProductDetails slug={slug} />
}
