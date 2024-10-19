'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {



    return (
        <section className="flex items-center justify-center gap-5 flex-col h-[500px]" >
            <h2 className="text-[35px] font-mono text-blue-800">OOPS  {error?.message}!</h2>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </section>
    )
}