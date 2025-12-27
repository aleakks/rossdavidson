"use client"

/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * It is a pure static client-side single page app.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../sanity.config'

export const dynamic = 'force-static';

export default function StudioPage() {
    return (
        <div className="show-cursor relative z-[9999]">
            <NextStudio config={config} />
        </div>
    )
}
