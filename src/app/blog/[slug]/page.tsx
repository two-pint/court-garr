import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { client } from "@/sanity/client"
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries"
import { portableTextComponents } from "@/components/PortableTextComponents"

interface Category {
  _id: string
  title: string
  slug: { current: string }
}

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  body: unknown[]
  categories: Category[]
}

export const revalidate = 60

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(postSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(postBySlugQuery, { slug })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} | Court Garr`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container max-w-5xl mx-auto py-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-semibold mb-8 text-emerald-800 hover:underline mt-8"
      >
        &larr; Back to Blog
      </Link>

      {/* Header */}
      <header className="border-thick  p-8 mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories?.map((category) => (
            <Link
              key={category._id}
              href={`/blog?category=${category.slug.current}`}
              className="category-pill"
            >
              {category.title}
            </Link>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <time className="text-zinc-600">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      {/* Body */}
      <div className="prose-container">
        <PortableText
          value={post.body as React.ComponentProps<typeof PortableText>["value"]}
          components={portableTextComponents}
        />
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t-[3px] border-foreground">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-700">Thanks for reading!</p>
          <Link href="/blog" className="btn btn-outline">
            More Posts
          </Link>
        </div>
      </footer>
    </article>
  )
}
