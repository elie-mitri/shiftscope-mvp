// src/components/layout/footer.tsx

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; 2025 ShiftScope. Made for NYC restaurant workers.</p>
          <p className="mt-2">
            <a href="/about" className="hover:text-gray-700">About</a>
            {' · '}
            <a href="/privacy" className="hover:text-gray-700">Privacy Policy</a>
            {' · '}
            <a href="/terms" className="hover:text-gray-700">Terms of Service</a>
            {' · '}
            <a href="/guidelines" className="hover:text-gray-700">Community Guidelines</a>
          </p>
        </div>
      </div>
    </footer>
  )
}