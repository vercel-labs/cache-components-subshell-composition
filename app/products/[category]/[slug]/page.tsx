import { Suspense } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProduct } from '@/app/products/data'
import { InDemandBadge } from '@/app/products/ui'

export async function generateStaticParams() {
  // Only generate 1 product to test subshell composition —
  // other products will reuse the cached category shell at request time
  return [{ category: 'tops', slug: '1' }]
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { slug } = await params
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
        {/* <Suspense>
          <InDemandBadge id={slug} verbose />
        </Suspense> */}
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
