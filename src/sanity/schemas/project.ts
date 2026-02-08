import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "Used on the project listing page",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "tech",
      title: "Tech used",
      type: "array",
      of: [{ type: "string" }],
      description: "Technologies used (e.g. React, TypeScript). Shown as pills on the listing.",
    }),
    defineField({
      name: "link",
      title: "Project link",
      type: "url",
      description: "Link to the live project, repo, or demo (if applicable).",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
        {
          type: "code",
          title: "Code Block",
          options: {
            language: "typescript",
            languageAlternatives: [
              { title: "TypeScript", value: "typescript" },
              { title: "JavaScript", value: "javascript" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "Python", value: "python" },
              { title: "Ruby", value: "ruby" },
              { title: "Elixir", value: "elixir" },
              { title: "Rust", value: "rust" },
              { title: "Shell", value: "bash" },
              { title: "JSON", value: "json" },
              { title: "YAML", value: "yaml" },
              { title: "SQL", value: "sql" },
            ],
            withFilename: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      };
    },
  },
});
