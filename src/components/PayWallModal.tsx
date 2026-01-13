'use client';

// Named Export 
export function PayWallModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800 text-center">
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Premium Feature 💎</h2>
        <p className="text-gray-500 mb-6">Please upgrade to access this insight.</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 w-full"
        >
          Unlock Now
        </button>
      </div>
    </div>
  );
}
