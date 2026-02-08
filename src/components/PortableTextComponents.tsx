import { PortableTextComponents } from "@portabletext/react";
import { CodeBlock } from "./CodeBlock";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export const portableTextComponents: PortableTextComponents = {
  types: {
    code: ({ value }) => {
      const { code, language, filename } = value;
      return <CodeBlock code={code} language={language} filename={filename} />;
    },
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="portable-image">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={450}
            className="rounded-sm border-2 border-foreground"
          />
          {value.caption && (
            <figcaption className="text-sm text-zinc-600 mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-foreground pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-800 pl-4 my-4 italic bg-[#f4f4f5]">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-emerald-800 underline underline-offset-2 hover:text-emerald-800 transition-colors"
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="bg-zinc-100 px-1.5 py-0.5 rounded font-mono text-sm border border-zinc-300">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>
    ),
  },
};
