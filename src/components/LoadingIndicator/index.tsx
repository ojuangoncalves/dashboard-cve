export default function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center h-64 space-x-2">
      <span className="text-lg font-medium">Loading</span>
      <div className="w-5 h-5 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}