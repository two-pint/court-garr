import { groq } from "next-sanity";

// Get all posts with categories
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "categories": categories[]->{ _id, title, slug }
  }
`;

// Get posts by category slug
export const postsByCategoryQuery = groq`
  *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "categories": categories[]->{ _id, title, slug }
  }
`;

// Get a single post by slug with full body
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    body,
    "categories": categories[]->{ _id, title, slug }
  }
`;

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;

// Get all post slugs for static generation
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

// Get all projects (for listing)
export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    featuredImage,
    tech,
    link
  }
`;

// Get a single project by slug with full body
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    featuredImage,
    tech,
    link,
    body
  }
`;

// Get all project slugs for static generation
export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;
