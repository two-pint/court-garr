"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const mainNavigation = [
  { name: "Blog", href: "/blog" },
  { name: "Projects", href: "/projects" },
  // { name: "About", href: "/" },
]

const topNavigation = [
  { name: "Home", href: "/" },
  { name: "GitHub", href: "https://github.com/two-pint" },
  { name: "LinkedIn", href: "https://linkedin.com" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="relative z-50 bg-background">
      {/* Top utility bar */}
      <div className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-16 flex justify-end items-center h-8 text-xs">
          <div className="flex items-center gap-4 ml-6">
            <a
              href="https://github.com/two-pint"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-100 hover:text-emerald-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-100 hover:text-emerald-800 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main header with thick border */}
      <div className="border-b-4 border-foreground py-3">
        <div className="max-w-7xl mx-auto flex items-center px-4 lg:px-16">
          {/* Logo */}
          <Link href="/" className="pl-2 lg:pl-0">
            <Image
              src="/logo.svg"
              alt="Court Garr"
              width={160}
              height={40}
              className="w-auto h-10"
              priority
            />
          </Link>

          {/* Navigation area */}
          <div className="flex-1 flex flex-col">
            {/* Main nav */}
            <div className="flex-1 flex items-center justify-end">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <nav className="flex items-center gap-8">
                  {mainNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-md font-bold uppercase tracking-wider transition-colors hover:text-emerald-800 ${
                        pathname === item.href
                          ? "text-emerald-800 border-b-2 border-emerald-800"
                          : "text-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-foreground hover:text-emerald-800 transition-colors"
                aria-label="Toggle menu"
              >
                {!mobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b-4 border-foreground">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-base font-bold uppercase tracking-wider text-foreground hover:text-emerald-800 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-bold uppercase tracking-wider transition-colors hover:text-emerald-800 py-2 ${
                  pathname === item.href
                    ? "text-emerald-800 border-b-2 border-emerald-800"
                    : "text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
