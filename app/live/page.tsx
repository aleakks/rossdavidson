import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { liveEventsQuery, livePageQuery } from "@/sanity/lib/queries";
import LiveGalleryClient from "@/components/LiveGalleryClient";

export const metadata: Metadata = {
    title: "Live Music & Touring",
    description: "Selected live music and touring photography collections by Ross Davidson.",
};

export const revalidate = 60;

export default async function LivePage() {
    let liveEvents = [];
    let pageSettings = null;
    try {
        [liveEvents, pageSettings] = await Promise.all([
            client.fetch(liveEventsQuery),
            client.fetch(livePageQuery)
        ]);
    } catch (error) {
        console.error("Live page fetch error:", error);
    }

    return (
        <main className="bg-black min-h-screen text-white pt-24 pb-12">
            <LiveGalleryClient liveEvents={liveEvents} pageSettings={pageSettings} />
        </main>
    );
}
