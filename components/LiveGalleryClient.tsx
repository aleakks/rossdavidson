"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
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

// 12 High-Quality Mock Live Events (Fallback)
const MOCK_EVENT_PHOTOS = [
    "photo-1516450360452-9312f5e86fc7", // Mixmag Live
    "photo-1470225620780-dba8ba36b745", // Defected Croatia
    "photo-1514525253161-7a46d19cd819", // Afterlife Ibiza
    "photo-1516450360452-9312f5e86fc7", // DJ Mag Paris
    "photo-1506157786151-b8491531f063", // Cercle Colosseum
    "photo-1459749411175-04bf5292ceea", // Coachella Stage
    "photo-1501386761578-eac5c94b800a", // Fabric Club
    "photo-1533174072545-7a4b6ad7a6c3", // Printworks Closing
    "photo-1524368535928-5b5e00ddc76b", // Tomorrowland Mainstage
    "photo-1540039155733-5bb30b53aa14", // Glastonbury Field
    "photo-1574391884720-bbc3740c59d1", // Creamfields Steel Yard
    "photo-1492684223066-81342ee5ff30"  // Sonar Festival Barcelona
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
        // Generate mock gallery urls
        const gallery = MOCK_GALLERY_POOL.map((photoId, j) => ({
            _key: `mock-img-${j}`,
            mockUrl: `https://images.unsplash.com/${photoId}?q=80&w=800`
        }));

        return {
            _id: `mock-event-${i}`,
            title: titles[i],
            location: locations[i],
            date: `2026-0${(i % 9) + 1}-15`,
            coverImage: {
                mockUrl: `https://images.unsplash.com/${MOCK_EVENT_PHOTOS[i]}?q=80&w=1200`
            },
            images: gallery
        };
    });
};

export default function LiveGalleryClient({ liveEvents, pageSettings }: { liveEvents: LiveEvent[], pageSettings?: any }) {
    const [events, setEvents] = useState<LiveEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<LiveEvent | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

    // Keyboard navigation for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === "ArrowLeft") handlePrevImage();
            if (e.key === "ArrowRight") handleNextImage();
            if (e.key === "Escape") setLightboxIndex(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, selectedEvent]);

    // Live Refresh
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

    // Ensure we have exactly 12 events (pad with mock if sanity returns fewer than 12) and fall back to mock assets if fields are empty
    const mockEvents = generateMockEvents();
    const displayEvents = (events.length >= 12 
        ? events.slice(0, 12) 
        : [...events, ...mockEvents.slice(0, 12 - events.length)]
    ).map((event, index) => {
        const mock = mockEvents[index] || mockEvents[0];
        return {
            ...event,
            coverImage: event.coverImage || mock.coverImage,
            images: (event.images && event.images.length > 0) ? event.images : mock.images,
        };
    });

    const getEventImageUrl = (imgObj: any, width = 800) => {
        if (!imgObj) return "";
        if (imgObj.mockUrl) return imgObj.mockUrl;
        try {
            return urlFor(imgObj).width(width).quality(95).url();
        } catch {
            return "";
        }
    };

    return (
        <section className="container mx-auto px-6 pt-16">
            
            {/* Header */}
            <div className="mb-16 md:mb-24">
                <span className="font-mono text-xs uppercase tracking-[0.5em] text-white/40 block mb-4">
                    {pageSettings?.eyebrow || "Collection / 01"}
                </span>
                <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none text-white mb-6">
                    {pageSettings?.title || "Live & Touring"}
                </h1>
                <p className="font-sans text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl">
                    {pageSettings?.subtitle || "Highlighting the 12 best live events. Click any event to open its folder and explore the full collection of detail shots from the night."}
                </p>
            </div>

            {/* Grid of 12 Events */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1800px] mx-auto w-full">
                {displayEvents.map((event, index) => {
                    const imageUrl = getEventImageUrl(event.coverImage, 1000);

                    return (
                        <motion.div
                            key={event._id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                            onClick={() => setSelectedEvent(event)}
                            className="group relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 cursor-pointer hover:border-white/20 transition-colors"
                        >
                            {/* Cover Image */}
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={event.title}
                                    fill
                                    className="object-cover opacity-70 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    priority={index < 3}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                                    <span className="font-mono text-xs uppercase text-white/20">No Cover Image</span>
                                </div>
                            )}

                            {/* Grain Overlay */}
                            <div 
                                className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
                            ></div>

                            {/* Hover/Standard Info Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                                <div className="space-y-2">
                                    <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.2em] block">
                                        Event / 0{index + 1}
                                    </span>
                                    <h3 className="text-white font-display text-2xl md:text-3xl uppercase tracking-tighter leading-none">
                                        {event.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-white/60 font-mono text-xs uppercase tracking-wider">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Folder Modal Showcase */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md overflow-y-auto pt-24 pb-12 px-6"
                    >
                        <div className="max-w-[1600px] mx-auto w-full relative">
                            
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="fixed top-8 right-6 md:right-12 z-[110] bg-white text-black p-3 hover:bg-neutral-200 transition-colors flex items-center justify-center rounded-full shadow-lg"
                                aria-label="Close Gallery"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Modal Header */}
                            <div className="mb-12 border-b border-white/10 pb-8 pr-16">
                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 block mb-2">
                                    Live Showcase Folder
                                </span>
                                <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none mb-4">
                                    {selectedEvent.title}
                                </h2>
                                <div className="flex flex-wrap gap-6 items-center text-white/60 font-mono text-xs uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{selectedEvent.location}</span>
                                    </div>
                                    {selectedEvent.date && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>
                                                {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric"
                                                })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Event Detailed Images Masonry/Grid */}
                            {selectedEvent.images && selectedEvent.images.length > 0 ? (
                                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                                    {selectedEvent.images.map((img: any, idx: number) => {
                                        const imgUrl = getEventImageUrl(img, 1000);
                                        if (!imgUrl) return null;

                                        return (
                                            <motion.div
                                                key={img._key || idx}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                                onClick={() => setLightboxIndex(idx)}
                                                className="break-inside-avoid relative overflow-hidden bg-neutral-900 group border border-white/5 hover:border-white/20 transition-colors cursor-zoom-in"
                                            >
                                                <div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[300px]">
                                                    <Image
                                                        src={imgUrl}
                                                        alt={`${selectedEvent.title} Showcase ${idx + 1}`}
                                                        width={800}
                                                        height={1000}
                                                        className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                    />
                                                    
                                                    {/* Custom micro-animation zoom indicator on hover */}
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                        <ZoomIn className="w-8 h-8 text-white/80 transform scale-75 group-hover:scale-100 transition-transform duration-300" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="py-24 text-center">
                                    <p className="font-mono text-white/30 text-sm uppercase tracking-widest">
                                        No event showcase images uploaded yet.
                                    </p>
                                </div>
                            )}

                            {/* Lightbox / Fullscreen Carousel Overlay */}
                            <AnimatePresence>
                                {lightboxIndex !== null && selectedEvent.images && selectedEvent.images[lightboxIndex] && (() => {
                                    const activeImgUrl = getEventImageUrl(selectedEvent.images[lightboxIndex], 1600);
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setLightboxIndex(null)}
                                            className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
                                        >
                                            {/* Close Button */}
                                            <button
                                                onClick={() => setLightboxIndex(null)}
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
                                                {activeImgUrl && (
                                                    <Image
                                                        src={activeImgUrl}
                                                        alt={`${selectedEvent.title} Fullscreen ${lightboxIndex + 1}`}
                                                        fill
                                                        className="object-contain pointer-events-none select-none"
                                                        sizes="90vw"
                                                        priority
                                                    />
                                                )}
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

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
