import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProduct, getProducts } from '@/app/products/data'
import { Suspense } from 'react'
import { InDemandBadge } from '@/app/products/ui'

export async function generateStaticParams() {
  const products = await getProducts()

  return products.slice(0, 1).map((product) => ({ slug: product.id }))
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
        <Suspense>
          <InDemandBadge id={product.id} verbose />
        </Suspense>
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
