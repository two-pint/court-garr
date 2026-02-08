"use client"

import { useRouter } from "next/navigation"
import { useState, useRef, useCallback } from "react"

const DEBOUNCE_MS = 300

interface BlogSearchProps {
  initialQ?: string
  initialCategory?: string
}

export function BlogSearch({ initialQ, initialCategory }: BlogSearchProps) {
  const router = useRouter()
  const [localQ, setLocalQ] = useState(initialQ ?? "")
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateUrl = useCallback(
    (q: string) => {
      const params = new URLSearchParams()
      if (initialCategory) params.set("category", initialCategory)
      const trimmed = q.trim()
      if (trimmed) params.set("q", trimmed)
      const query = params.toString()
      router.replace(query ? `/blog?${query}` : "/blog")
    },
    [router, initialCategory],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalQ(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => updateUrl(value), DEBOUNCE_MS)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
      debounceRef.current = null
    }
    updateUrl(localQ)
  }

  const handleClear = () => {
    setLocalQ("")
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
      debounceRef.current = null
    }
    updateUrl("")
  }

  return (
    <form
      method="GET"
      action="/blog"
      onSubmit={handleSubmit}
      className="flex items-center gap-2 flex-shrink-0"
    >
      {initialCategory && (
        <input type="hidden" name="category" value={initialCategory} />
      )}
      <label htmlFor="blog-search" className="sr-only">
        Search posts
      </label>
      <div className="relative flex-shrink-0 w-28 sm:w-40">
        <input
          id="blog-search"
          type="search"
          name="q"
          value={localQ}
          onChange={handleChange}
          placeholder="Search posts…"
          className="w-full pl-2 pr-8 py-1.5 text-sm border-2 border-foreground bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        {localQ ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-zinc-500 hover:text-foreground hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        ) : null}
      </div>
      <button type="submit" className="btn btn-outline flex-shrink-0 !py-1.5 !px-3 text-sm">
        Search
      </button>
    </form>
  )
}
