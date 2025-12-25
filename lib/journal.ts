export interface JournalEntry {
    slug: string;
    title: string;
    category: string;
    date: string;
    coverImage: string;
    images: string[];
    description: string;
    credits: { role: string; name: string }[];
}

export const journalEntries: JournalEntry[] = [
    {
        slug: "warehouse-project-2024",
        title: "The Warehouse Project: Closing Party",
        category: "Nightlife",
        date: "Dec 2024",
        coverImage: "/images/uploads/artist-image.jpg", // Placeholder re-use
        images: [
            "/images/uploads/artist-image.jpg",
            "/images/uploads/artist-image.jpg",
            "/images/uploads/artist-image.jpg",
        ],
        description: "A definitive night of electronic music history at Manchester's iconic Mayfield Depot. Capturing the raw energy of 10,000 souls moving as one.",
        credits: [
            { role: "Venue", name: "Mayfield Depot" },
            { role: "Client", name: "WHP" },
            { role: "Lighting", name: "Visual Architects" }
        ]
    },
    {
        slug: "london-fashion-week-ss25",
        title: "London Fashion Week: Backstage",
        category: "Editorial",
        date: "Sept 2024",
        coverImage: "/images/uploads/artist-image.jpg", // Placeholder
        images: [
            "/images/uploads/artist-image.jpg",
            "/images/uploads/artist-image.jpg"
        ],
        description: "Intimate moments before the chaos. A study in texture, tension, and the quiet electricity of the green room.",
        credits: [
            { role: "Brand", name: "Burberry" },
            { role: "Styling", name: "Anna Wintour" }
        ]
    }
];

export function getJournalEntry(slug: string) {
    return journalEntries.find((entry) => entry.slug === slug);
}
