import Link from "next/link"
import { client } from "@/sanity/client"
import { postsQuery, categoriesQuery } from "@/sanity/lib/queries"

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
  categories: Category[]
}

export const revalidate = 60 // Revalidate every 60 seconds

async function getPosts(): Promise<Post[]> {
  return client.fetch(postsQuery)
}

async function getCategories(): Promise<Category[]> {
  return client.fetch(categoriesQuery)
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  const filteredPosts = params.category
    ? posts.filter((post) =>
        post.categories?.some((cat) => cat.slug.current === params.category),
      )
    : posts

  return (
    <div className="container">
      {/* Header */}
      <section className="border-4 border-foreground p-8 md:p-12 my-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-zinc-700">
          Thoughts on software engineering, programming languages, and
          technology.
        </p>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`category-pill ${!params.category ? "active" : ""}`}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/blog?category=${category.slug.current}`}
              className={`category-pill ${
                params.category === category.slug.current ? "active" : ""
              }`}
            >
              {category.title}
            </Link>
          ))}
        </section>
      )}

      <div className="section-divider" />

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <article key={post._id} className="card">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.categories?.map((category) => (
                  <span
                    key={category._id}
                    className="text-xs font-semibold uppercase tracking-wide text-zinc-600"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold mb-2">
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="hover:text-emerald-800 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && (
                <p className="text-zinc-700 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-200">
                <time className="text-sm text-zinc-600">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="text-sm font-semibold text-emerald-800 hover:underline"
                >
                  Read more &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border-thick p-12 text-center">
          <h2 className="text-2xl font-bold mb-2">No posts yet</h2>
          <p className="text-zinc-700">
            Check back soon for new content, or{" "}
            <Link href="/studio" className="underline font-semibold text-emerald-800">
              add your first post
            </Link>{" "}
            in the studio.
          </p>
        </div>
      )}
    </div>
  )
}
