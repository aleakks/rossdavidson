'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
            <div className="space-y-6 max-w-md">
                <h2 className="font-display text-4xl uppercase tracking-tighter">
                    Something went wrong
                </h2>
                <p className="font-mono text-sm text-white/50 tracking-wider">
                    We encountered an unexpected issue. Please try refreshing or return home.
                </p>
                <div className="flex gap-4 justify-center pt-4">
                    <button
                        onClick={() => reset()}
                        className="px-6 py-3 border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 font-mono text-xs uppercase tracking-[0.2em]"
                    >
                        Try again
                    </button>
                    <a
                        href="/"
                        className="px-6 py-3 bg-white text-black hover:bg-white/90 transition-colors duration-300 font-mono text-xs uppercase tracking-[0.2em]"
                    >
                        Return Home
                    </a>
                </div>
            </div>
        </div>
    )
}
