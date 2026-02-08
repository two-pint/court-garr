import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/client"
import { projectsQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

interface Project {
  _id: string
  title: string
  slug: { current: string }
  shortDescription?: string
  featuredImage?: { asset?: { _ref?: string }; alt?: string }
  tech?: string[]
  link?: string
}

export const revalidate = 60

async function getProjects(): Promise<Project[]> {
  return client.fetch(projectsQuery)
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container">
      {/* Header */}
      <section className="border-4 border-foreground p-8 md:p-12 my-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-zinc-700">
          Selected work and side projects.
        </p>
      </section>

      <div className="section-divider" />

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project._id} className="card">
              {project.featuredImage?.asset?._ref && (
                <Link
                  href={`/projects/${project.slug.current}`}
                  className="block mb-4 overflow-hidden border-b-2 border-foreground"
                >
                  <Image
                    src={urlFor(project.featuredImage).width(600).height(340).url()}
                    alt={project.featuredImage.alt || project.title}
                    width={600}
                    height={340}
                    className="w-full h-auto object-cover hover:opacity-95 transition-opacity"
                  />
                </Link>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech?.map((t) => (
                  <span key={t} className="category-pill">
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold mb-2">
                <Link
                  href={`/projects/${project.slug.current}`}
                  className="hover:text-emerald-800 transition-colors"
                >
                  {project.title}
                </Link>
              </h2>
              {project.shortDescription && (
                <p className="text-zinc-700 mb-4 line-clamp-3">
                  {project.shortDescription}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/projects/${project.slug.current}`}
                  className="text-sm font-semibold text-emerald-800 hover:underline"
                >
                  View project &rarr;
                </Link>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-emerald-800 hover:underline"
                  >
                    Visit site ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border-thick p-12 text-center">
          <h2 className="text-2xl font-bold mb-2">No projects yet</h2>
          <p className="text-zinc-700">
            Check back soon, or{" "}
            <Link href="/studio" className="underline font-semibold text-emerald-800">
              add your first project
            </Link>{" "}
            in the studio.
          </p>
        </div>
      )}
    </div>
  )
}
