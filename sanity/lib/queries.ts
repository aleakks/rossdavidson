import { groq } from "next-sanity";

export const heroQuery = groq`*[_type == "hero"][0]{
  title,
  subtitle,
  images
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

export const galleryQuery = groq`*[_type == "galleryProject"]|order(date desc){
  title,
  category,
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

export const socialProofQuery = groq`*[_type == "socialProof"][0]{
  clients,
  primaryCallout
}`;
