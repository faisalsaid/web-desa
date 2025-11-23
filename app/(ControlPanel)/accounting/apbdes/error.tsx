'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-red-600 mb-4">
        Terjadi Kesalahan
      </h2>

      <p className="mb-4 text-sm text-gray-600">
        {error.message || 'Gagal memuat data.'}
      </p>

      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Coba Lagi
      </button>
    </div>
  );
}
