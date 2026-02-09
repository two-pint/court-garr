import Link from "next/link"

export default function HomePage() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="border-4 border-foreground p-8 md:p-12 my-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hi, I&apos;m Court Garr
        </h1>
        <p className="text-xl md:text-2xl text-zinc-700 mb-6">
          Software Engineer & Technical Writer
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/blog" className="btn">
            Read My Blog
          </Link>
          <a href="mailto:hello@example.com" className="btn btn-outline">
            Get in Touch
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="border-4 border-foreground p-8">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-foreground pb-2">
            About Me
          </h2>
          <div className="space-y-4 text-zinc-700 leading-relaxed">
            <p>
              I&apos;m a software engineer passionate about building elegant
              solutions to complex problems. I work across the stack, with
              particular interests in systems programming and web development.
            </p>
            <p>
              Living in Salt Lake City, Utah and married to my best friend,
              Lauren.
            </p>
          </div>
        </div>

        <div className="border-4 border-foreground p-8">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-foreground pb-2">
            What I Work With
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2">Languages</h3>
              <ul className="space-y-1 text-zinc-700">
                <li>TypeScript</li>
                <li>Python</li>
                <li>Rust</li>
                <li>Ruby</li>
                <li>Elixir</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Frameworks</h3>
              <ul className="space-y-1 text-zinc-700">
                <li>React / Next.js</li>
                <li>Rails</li>
                <li>Phoenix</li>
                <li>FastAPI</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-4 border-foreground p-8 mt-12  text-foreground">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Interested in working together?
            </h2>
            <p className="text-foreground">
              I&apos;m always open to discussing new projects and opportunities.
            </p>
          </div>
          <a
            href="mailto:hello@example.com"
            className="btn bg-background text-foreground border-background hover:bg-transparent hover:text-background"
          >
            Let&apos;s Talk
          </a>
        </div>
      </section>
    </div>
  )
}
