
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-rgs-off-black flex items-center justify-center px-4">
            <div className="text-center max-w-xl mx-auto">
                <h1 className="text-9xl font-bold text-rgs-green mb-4 font-heading opacity-20">404</h1>
                <h2 className="text-4xl font-bold text-white mb-6 font-heading relative -mt-16">
                    Lost in the Lounge?
                </h2>
                <p className="text-xl text-gray-400 mb-10">
                    The page you are looking for has been devalued or doesn&apos;t exist.
                    Let&apos;s get you back to maximizing your points.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-8 py-3 bg-rgs-green text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-rgs-green/20"
                    >
                        Return Home
                    </Link>
                    <Link
                        href="/millionaire-guide"
                        className="px-8 py-3 bg-transparent border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all"
                    >
                        View The Guide
                    </Link>
                </div>
            </div>
        </div>
    )
}
