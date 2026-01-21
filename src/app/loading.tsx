export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-rgs-green"></div>
        <p className="mt-4 text-gray-600 font-semibold">Loading...</p>
      </div>
    </div>
  )
}
