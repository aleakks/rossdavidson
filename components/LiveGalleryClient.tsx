"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { liveEventsQuery } from "@/sanity/lib/queries";

interface LiveEvent {
    _id: string;
    title: string;
    location: string;
    date: string;
    coverImage: any;
    images?: any[];
}

interface MockEventConfig {
    photoId: string;
    orientation: "landscape" | "portrait";
}

// 12 High-Quality Mock Live Events (Fallback)
// Perfectly balanced across 3 columns (col 0: 0,3,6,9; col 1: 1,4,7,10; col 2: 2,5,8,11)
// with each column having exactly 2 landscapes (3:2) and 2 portraits (2:3) for a clean, level grid.
const MOCK_CONFIGS: MockEventConfig[] = [
    { photoId: "photo-1516450360452-9312f5e86fc7", orientation: "landscape" }, // 0: Mixmag Live (3:2) - Col 0
    { photoId: "photo-1574391884720-bbc3740c59d1", orientation: "portrait" },  // 1: Defected Croatia (2:3) - Col 1
    { photoId: "photo-1470225620780-dba8ba36b745", orientation: "landscape" }, // 2: Afterlife Ibiza (3:2) - Col 2
    { photoId: "photo-1508700115892-45ecd05ae2ad", orientation: "portrait" },  // 3: DJ Mag Showcase (2:3) - Col 0
    { photoId: "photo-1506157786151-b8491531f063", orientation: "landscape" }, // 4: Cercle Colosseum (3:2) - Col 1
    { photoId: "photo-1514525253161-7a46d19cd819", orientation: "portrait" },  // 5: Coachella Stage (2:3) - Col 2
    { photoId: "photo-1501386761578-eac5c94b800a", orientation: "landscape" }, // 6: Fabric London (3:2) - Col 0
    { photoId: "photo-1533174072545-7a4b6ad7a6c3", orientation: "portrait" },  // 7: Printworks Closing (2:3) - Col 1
    { photoId: "photo-1524368535928-5b5e00ddc76b", orientation: "landscape" }, // 8: Tomorrowland Mainstage (3:2) - Col 2
    { photoId: "photo-1459749411175-04bf5292ceea", orientation: "portrait" },  // 9: Glastonbury Arcadia (2:3) - Col 0
    { photoId: "photo-1492684223066-81342ee5ff30", orientation: "landscape" }, // 10: Creamfields Steel Yard (3:2) - Col 1
    { photoId: "photo-1511671782779-c97d3d27a1d4", orientation: "portrait" },  // 11: Sonar Barcelona (2:3) - Col 2
];

const MOCK_GALLERY_POOL = [
    "photo-1505232458627-5ec90be5864e",
    "photo-1511671782779-c97d3d27a1d4",
    "photo-1504609773096-104ff2c73ba4",
    "photo-1498038432885-c6f3f1b912ee",
    "photo-1478147427282-58a87a120781",
    "photo-1516873240891-4bf014598ab4",
    "photo-1465847899084-d164df4dedc6",
    "photo-1516450360452-9312f5e86fc7",
    "photo-1470225620780-dba8ba36b745",
    "photo-1514525253161-7a46d19cd819"
];

const generateMockEvents = (): LiveEvent[] => {
    const titles = [
        "Mixmag Live",
        "Defected Croatia",
        "Afterlife Ibiza",
        "DJ Mag Showcase",
        "Cercle at Colosseum",
        "Coachella Sahara Stage",
        "Fabric London",
        "Printworks Closing",
        "Tomorrowland Mainstage",
        "Glastonbury Arcadia",
        "Creamfields Steel Yard",
        "Sonar Barcelona"
    ];

    const locations = [
        "London, UK",
        "Tisno, Croatia",
        "Ibiza, Spain",
        "Paris, France",
        "Rome, Italy",
        "California, USA",
        "London, UK",
        "London, UK",
        "Boom, Belgium",
        "Pilton, UK",
        "Daresbury, UK",
        "Barcelona, Spain"
    ];

    return Array.from({ length: 12 }).map((_, i) => {
        const gallery = MOCK_GALLERY_POOL.map((photoId, j) => ({
            _key: `mock-img-${j}`,
            mockUrl: `https://images.unsplash.com/${photoId}?q=80&w=800`
        }));

        const cfg = MOCK_CONFIGS[i % MOCK_CONFIGS.length];
        const isLand = cfg.orientation === "landscape";
        const width = isLand ? 1200 : 800;
        const height = isLand ? 800 : 1200;
        const aspectRatio = isLand ? 1.5 : 0.6666;

        return {
            _id: `mock-event-${i}`,
            title: titles[i],
            location: locations[i],
            date: `2026-0${(i % 9) + 1}-15`,
            coverImage: {
                mockUrl: `https://images.unsplash.com/${cfg.photoId}?q=80&w=${width}&h=${height}&fit=crop`,
                asset: {
                    metadata: {
                        dimensions: {
                            aspectRatio,
                            width,
                            height
                        }
                    }
                }
            },
            images: gallery
        };
    });
};

/**
 * Robust orientation detector:
 * Inspects Sanity dimensions (with crop adjustment), Sanity _ref string,
 * URL query parameters, and defaults cleanly to 'landscape'.
 */
export function getEventOrientation(coverImage: any): "landscape" | "portrait" {
    if (!coverImage) return "landscape";

    // 1. Sanity asset metadata dimensions & crop
    const dimensions = coverImage.asset?.metadata?.dimensions;
    const crop = coverImage.crop;
    if (dimensions?.width && dimensions?.height) {
        let width = dimensions.width;
        let height = dimensions.height;
        if (crop) {
            width = width * (1 - (crop.left || 0) - (crop.right || 0));
            height = height * (1 - (crop.top || 0) - (crop.bottom || 0));
        }
        return width >= height ? "landscape" : "portrait";
    }

    if (dimensions?.aspectRatio) {
        return dimensions.aspectRatio >= 1 ? "landscape" : "portrait";
    }

    // 2. Sanity asset _ref (e.g., image-ac235f48...-3000x2000-jpg)
    const ref = coverImage.asset?._ref || coverImage.asset?._id;
    if (typeof ref === "string") {
        const match = ref.match(/-(\d+)x(\d+)-/);
        if (match) {
            const width = parseInt(match[1], 10);
            const height = parseInt(match[2], 10);
            if (width && height) {
                return width >= height ? "landscape" : "portrait";
            }
        }
    }

    // 3. Mock or direct URL query parameters
    const url = coverImage.mockUrl || coverImage.url;
    if (typeof url === "string") {
        const wMatch = url.match(/[?&]w=(\d+)/);
        const hMatch = url.match(/[?&]h=(\d+)/);
        if (wMatch && hMatch) {
            const w = parseInt(wMatch[1], 10);
            const h = parseInt(hMatch[2], 10);
            if (w && h) return w >= h ? "landscape" : "portrait";
        }
    }

    return "landscape";
}

const getEventImageUrl = (imgObj: any, width?: number, quality = 95) => {
    if (!imgObj) return "";
    if (imgObj.mockUrl) return imgObj.mockUrl;
    try {
        let builder = urlFor(imgObj).auto("format").quality(quality);
        if (width) {
            builder = builder.width(width);
        }
        return builder.url();
    } catch {
        return "";
    }
};

/**
 * Event Card Component:
 * Strictly enforces either aspect-[3/2] (landscape) or aspect-[2/3] (portrait).
 * Features unoptimized Sanity CDN delivery for retina-grade sharpness, full opacity,
 * and an onLoad fallback for zero distortion.
 */
function LiveEventCard({
    event,
    index,
    onClick,
}: {
    event: LiveEvent;
    index: number;
    onClick: () => void;
}) {
    // Request 2000px at q=95 directly from Sanity CDN for retina-crisp sharpness
    const imageUrl = getEventImageUrl(event.coverImage, 2000, 95);
    const initialOrientation = getEventOrientation(event.coverImage);
    const [orientation, setOrientation] = useState<"landscape" | "portrait">(initialOrientation);

    useEffect(() => {
        setOrientation(getEventOrientation(event.coverImage));
    }, [event.coverImage]);

    const isLandscape = orientation === "landscape";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
            onClick={onClick}
            className={`group relative overflow-hidden bg-neutral-900 border border-white/5 cursor-pointer hover:border-white/20 transition-all duration-500 w-full ${
                isLandscape ? "aspect-[3/2]" : "aspect-[2/3]"
            }`}
        >
            {/* Cover Image - Served unoptimized directly from Sanity CDN to preserve full dynamic range & sharpness */}
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={event.title}
                    fill
                    unoptimized
                    className="object-cover opacity-100 transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3}
                    quality={100}
                    onLoad={(e) => {
                        const img = e.currentTarget;
                        if (img.naturalWidth && img.naturalHeight) {
                            const natural = img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait";
                            if (natural !== orientation) {
                                setOrientation(natural);
                            }
                        }
                    }}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                    <span className="font-mono text-xs uppercase text-white/20">No Cover Image</span>
                </div>
            )}

            {/* Hover / Info Overlay - Focused gradient only over bottom half so the photo stays bright and unmasked */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
                <div className="space-y-2">
                    <h3 className="text-white font-display text-2xl md:text-3xl uppercase tracking-tighter leading-none">
                        {event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/70 font-mono text-xs uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{event.location}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function LiveGalleryClient({
    liveEvents,
    pageSettings
}: {
    liveEvents: LiveEvent[];
    pageSettings?: any;
}) {
    const [events, setEvents] = useState<LiveEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<LiveEvent | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [numCols, setNumCols] = useState<number>(3);

    const handlePrevImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (selectedEvent?.images && lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev === 0 ? selectedEvent.images!.length - 1 : prev! - 1));
        }
    };

    const handleNextImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (selectedEvent?.images && lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev === selectedEvent.images!.length - 1 ? 0 : prev! + 1));
        }
    };

    // Responsive column count for left-to-right masonry
    useEffect(() => {
        const updateCols = () => {
            if (window.innerWidth < 640) {
                setNumCols(1);
            } else if (window.innerWidth < 1024) {
                setNumCols(2);
            } else {
                setNumCols(3);
            }
        };
        updateCols();
        window.addEventListener("resize", updateCols);
        return () => window.removeEventListener("resize", updateCols);
    }, []);

    // Keyboard navigation for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === "ArrowLeft") handlePrevImage();
            if (e.key === "ArrowRight") handleNextImage();
            if (e.key === "Escape") {
                setLightboxIndex(null);
                setSelectedEvent(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, selectedEvent]);

    // Live Refresh from Sanity
    useEffect(() => {
        const fetchFresh = async () => {
            try {
                const fresh = await client.fetch<LiveEvent[]>(
                    liveEventsQuery,
                    { _t: Date.now() },
                    { filterResponse: false, cache: "no-store" }
                );
                if (Array.isArray(fresh) && fresh.length > 0) {
                    setEvents(fresh.slice(0, 12));
                }
            } catch (e) {
                console.error("Live events fetch failed", e);
            }
        };

        if (liveEvents && liveEvents.length > 0) {
            setEvents(liveEvents.slice(0, 12));
        } else {
            setEvents(generateMockEvents());
        }

        fetchFresh();
    }, [liveEvents]);

    // Ensure we have exactly 12 events (pad with mock if sanity returns fewer than 12)
    const mockEvents = useMemo(() => generateMockEvents(), []);
    const displayEvents = useMemo(() => {
        const base = (events.length >= 12 
            ? events.slice(0, 12) 
            : [...events, ...mockEvents.slice(0, 12 - events.length)]
        );
        return base.map((event, index) => {
            const mock = mockEvents[index] || mockEvents[0];
            return {
                ...event,
                coverImage: event.coverImage || mock.coverImage,
                images: (event.images && event.images.length > 0) ? event.images : mock.images,
            };
        });
    }, [events, mockEvents]);

    // Distribute events into columns strictly left-to-right (round-robin)
    // Row 1: Event 0 (Col 0), Event 1 (Col 1), Event 2 (Col 2)
    // Row 2: Event 3 (Col 0), Event 4 (Col 1), Event 5 (Col 2), etc.
    const columns = useMemo(() => {
        const cols: { event: LiveEvent; originalIndex: number }[][] = Array.from(
            { length: numCols },
            () => []
        );
        displayEvents.forEach((event, index) => {
            cols[index % numCols].push({ event, originalIndex: index });
        });
        return cols;
    }, [displayEvents, numCols]);

    return (
        <section className="container mx-auto px-6 pt-16">
            
            {/* Header */}
            <div className="mb-16 md:mb-24">
                <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none text-white mb-6">
                    {pageSettings?.title || "Live"}
                </h1>
            </div>

            {/* Grid of 12 Events - Left-to-Right Column Masonry */}
            <div 
                className="grid gap-6 md:gap-8 max-w-[1800px] mx-auto w-full items-start"
                style={{
                    gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`
                }}
            >
                {columns.map((colItems, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-6 md:gap-8 w-full">
                        {colItems.map(({ event, originalIndex }) => (
                            <LiveEventCard
                                key={event._id || originalIndex}
                                event={event}
                                index={originalIndex}
                                onClick={() => {
                                    if (event.images && event.images.length > 0) {
                                        setSelectedEvent(event);
                                        setLightboxIndex(0);
                                    }
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Lightbox / Fullscreen Carousel Overlay */}
            <AnimatePresence>
                {selectedEvent && lightboxIndex !== null && selectedEvent.images && selectedEvent.images[lightboxIndex] && (() => {
                    return (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setLightboxIndex(null); setSelectedEvent(null); }}
                            className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
                        >
                            {/* Close Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); setSelectedEvent(null); }}
                                className="absolute top-8 right-6 z-[210] bg-white text-black p-3 hover:bg-neutral-200 transition-colors flex items-center justify-center rounded-full"
                                aria-label="Close Lightbox"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Left Arrow */}
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[210] bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                                aria-label="Previous Image"
                            >
                                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                            </button>

                            {/* Image container */}
                            <div 
                                className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {selectedEvent.images.map((img: any, idx: number) => {
                                    // Deliver pristine uncompressed 3200px at q=100 directly from Sanity CDN
                                    const imgUrl = getEventImageUrl(img, 3200, 100);
                                    if (!imgUrl) return null;
                                    return (
                                        <div
                                            key={img._key || idx}
                                            className="absolute inset-0 transition-opacity duration-300 ease-in-out"
                                            style={{
                                                opacity: idx === lightboxIndex ? 1 : 0,
                                                pointerEvents: idx === lightboxIndex ? "auto" : "none"
                                            }}
                                        >
                                            <Image
                                                src={imgUrl}
                                                alt={`${selectedEvent.title} Fullscreen ${idx + 1}`}
                                                fill
                                                unoptimized
                                                className="object-contain pointer-events-none select-none"
                                                sizes="100vw"
                                                priority={true}
                                                quality={100}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right Arrow */}
                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[210] bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                                aria-label="Next Image"
                            >
                                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                            </button>

                            {/* Indicator Counter */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.2em] text-white/50 bg-black/60 px-4 py-2 border border-white/10 rounded-full">
                                {lightboxIndex + 1} / {selectedEvent.images.length}
                            </div>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>

        </section>
    );
}
