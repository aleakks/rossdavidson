"use client"

/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under /studio will be handled by this file using Next.js Catch-all Routes.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static';

export default function StudioPage() {
    return (
        <div className="show-cursor relative z-[9999]">
            <NextStudio config={config} />
        </div>
    )
}
