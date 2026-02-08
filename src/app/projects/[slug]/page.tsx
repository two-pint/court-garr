import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { client } from "@/sanity/client"
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { portableTextComponents } from "@/components/PortableTextComponents"

interface Project {
  _id: string
  title: string
  slug: { current: string }
  shortDescription?: string
  featuredImage?: { asset?: { _ref?: string }; alt?: string }
  tech?: string[]
  link?: string
  body?: unknown[]
}

export const revalidate = 60

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(projectSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

async function getProject(slug: string): Promise<Project | null> {
  return client.fetch(projectBySlugQuery, { slug })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} | Court Garr`,
    description: project.shortDescription,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <article className="container max-w-5xl mx-auto py-16">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold mb-8 text-emerald-800 hover:underline mt-8"
      >
        &larr; Back to Projects
      </Link>

      {/* Header */}
      <header className="border-thick p-8 mb-12">
        {project.featuredImage?.asset?._ref && (
          <div className="mb-6 w-full overflow-hidden border-2 border-foreground bg-zinc-100">
            <Image
              src={urlFor(project.featuredImage).width(900).height(506).url()}
              alt={project.featuredImage.alt || project.title}
              width={900}
              height={506}
              className="h-auto w-full object-contain"
            />
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech?.map((t) => (
            <span key={t} className="category-pill">
              {t}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
        {project.shortDescription && (
          <p className="text-zinc-700 text-lg mb-4">
            {project.shortDescription}
          </p>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-emerald-800 font-semibold hover:underline"
          >
            Visit project ↗
          </a>
        )}
      </header>

      {/* Body */}
      {project.body && project.body.length > 0 && (
        <div className="prose-container">
          <PortableText
            value={project.body as React.ComponentProps<typeof PortableText>["value"]}
            components={portableTextComponents}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t-[3px] border-foreground">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-700">View more work.</p>
          <Link href="/projects" className="btn btn-outline">
            More Projects
          </Link>
        </div>
      </footer>
    </article>
  )
}
