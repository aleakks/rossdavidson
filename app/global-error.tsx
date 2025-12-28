'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4 text-center">
                    <div className="space-y-6 max-w-md">
                        <h1 className="font-display text-5xl uppercase tracking-tighter text-red-500">
                            System Error
                        </h1>
                        <p className="font-mono text-sm text-white/50 tracking-wider">
                            A critical error occurred. We apologize for the inconvenience.
                        </p>
                        <button
                            onClick={() => reset()}
                            className="px-8 py-3 bg-white text-black hover:bg-white/90 transition-colors duration-300 font-mono text-xs uppercase tracking-[0.2em]"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            </body>
        </html>
    )
}
