'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="min-h-screen bg-blue-900 text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl mb-4">DEBUG: CUSTOM ERROR (500)</h1>
            <pre className="bg-black/50 p-4 rounded max-w-2xl overflow-auto">
                {error.message}
                {error.stack}
            </pre>
            <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-white text-blue-900 rounded">
                Try again
            </button>
        </div>
    )
}
