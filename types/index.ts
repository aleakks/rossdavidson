export interface SanityImage {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
}

export interface Category {
    title: string;
    slug: string;
}

export interface GalleryPhoto {
    _id?: string;
    title?: string;
    client?: string;
    location?: string;
    date?: string;
    category: string; // The slug string from the query
    image: SanityImage;
    altText?: string;
}

export interface JournalPost {
    title: string;
    slug: string;
    publishedAt: string;
    coverImage: SanityImage;
    excerpt?: string;
}
