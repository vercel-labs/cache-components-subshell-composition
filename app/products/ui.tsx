import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product, Promotion } from '@/app/products/data'
import { getActivity } from '@/app/products/data'

export async function InDemandBadge({
  slug,
  verbose,
}: {
  slug: string
  verbose?: boolean
}) {
  const { sold, inDemand } = await getActivity(slug)
  if (!inDemand) return null

  return (
    <div className="absolute bottom-2 left-2 translate-y-0 truncate rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-900 opacity-100 transition-all duration-300 dark:bg-gray-700 dark:text-gray-100 starting:translate-y-1 starting:opacity-0">
      {verbose
        ? `In demand: sold ${sold} times in the last 12 hours`
        : 'In demand'}
    </div>
  )
}

export function List({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-10">
      {items.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/products/${product.category}/${product.slug}`}
            className="group grid gap-2"
            prefetch={false}
          >
            <div className="relative flex aspect-square items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700">
              <Image
                src={product.image}
                alt={product.name}
                width={192}
                height={192}
                className="object-cover opacity-90 brightness-150 dark:brightness-100"
              />
              <Suspense>
                <InDemandBadge slug={product.slug} />
              </Suspense>
            </div>
            <h2 className="text-gray-500 transition-colors group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100">
              {product.name}
            </h2>
          </Link>
        )
      })}
    </div>
  )
}


export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-10">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="grid gap-2">
          <div className="aspect-square animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
          <div className="h-lh w-20 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
        </div>
      ))}
    </div>
  )
}

export function ProductSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-10">
      <div className="aspect-square animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
      <div className="grid gap-2 md:content-start">
        <div className="h-lh w-32 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-lh w-64 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-lh w-16 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
      </div>
    </div>
  )
}

const promotionClasses = 'h-[1.5lh] rounded-xl bg-gray-100 dark:bg-gray-800'

export function Promotion({ data }: { data: Promotion }) {
  return (
    <div
      className={`${promotionClasses} flex items-center justify-center text-gray-700 dark:text-gray-300`}
    >
      <div className="opacity-100 transition-opacity duration-300 starting:opacity-0">
        {data.message}
      </div>
    </div>
  )
}

export function PromotionSkeleton() {
  return <div className={promotionClasses} />
}
