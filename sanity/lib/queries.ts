import { groq } from "next-sanity";

export const heroQuery = groq`*[_type == "hero"][0]{
  title,
  subtitle,
  images,
  eyebrow
}`;

export const photoStackQuery = groq`*[_type == "photoStack"][0]{
  cards[]{
    client,
    location,
    alt,
    image
  }
}`;

export const aboutQuery = groq`*[_type == "about"][0]{
  artistImage,
  headline,
  bio,
  philosophy,
  signature
}`;

export const servicesQuery = groq`*[_type == "service"]|order(order asc){
  title,
  description,
  order
}`;

// Fetch all categories for the filter bar
export const categoriesQuery = groq`*[_type == "category"]|order(order asc){
  title,
  "slug": slug.current
}`;

// Updated Gallery query to join category
export const galleryQuery = groq`*[_type == "galleryProject"]|order(date desc){
  title,
  "category": categoryRef->slug.current, // Resolve reference to slug string
  date,
  image,
  client,
  location,
  altText
}`;

export const contactQuery = groq`*[_type == "contact"][0]{
  status,
  email,
  capabilities,
  licensingText
}`;

export const settingsQuery = groq`*[_type == "settings"][0]{
  headerLinks,
  footerText,
  socialLinks
}`;

export const socialProofQuery = groq`*[_type == "socialProof"][0]{
  clients,
  primaryCallout
}`;

// Fetch privacy policy by slug "privacy-policy"
export const privacyQuery = groq`*[_type == "legalPage" && slug.current == "privacy-policy"][0]{
  title,
  content,
  updatedAt
}`;
// Fetch all journal posts
export const journalListQuery = groq`*[_type == "journal"]|order(publishedAt desc){
  title,
  "slug": slug.current,
  publishedAt,
  coverImage,
  excerpt
}`;

// Fetch single journal post
export const journalSlugQuery = groq`*[_type == "journal" && slug.current == $slug][0]{
  title,
  publishedAt,
  coverImage,
  description,
  content,
  gallery,
  credits
}`;
