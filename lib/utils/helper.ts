// ===============================
// 📌 FORMAT UANG (IDR)
// ===============================

export function formatCurrency(value: number | string): string {
  const num = Number(value || 0);

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(num);
}

// Contoh:
// formatCurrency(1500000) → "Rp1.500.000"

// ===============================
// 📌 FORMAT TANGGAL (Indonesia)
// ===============================

export function formatDate(date: Date | string | null): string {
  if (!date) return '-';

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

// Contoh:
// formatDate("2025-01-10") → "10 Januari 2025"

// ===============================
// 📌 GENERATOR NOMOR TRANSAKSI
// Format: TRX-YYYYMMDD-RANDOM4
// ===============================

export function generateTransactionNumber(date: Date = new Date()): string {
  const yyyy = date.getFullYear().toString();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  const random = Math.floor(1000 + Math.random() * 9000); // 4 digit

  return `TRX-${yyyy}${mm}${dd}-${random}`;
}

// Contoh:
// generateTransactionNumber()
// → "TRX-20250311-4821"

// ===============================
// 📌 GENERATOR GENERIK (Optional)
// ===============================

// untuk nomor realisasi: RLS-YYYYMMDD-xxxx
export function generateRealizationCode(date: Date = new Date()): string {
  const base = generateDateStamp(date);
  const rand = Math.floor(1000 + Math.random() * 9000);

  return `RLS-${base}-${rand}`;
}

// YYYYMMDD util
export function generateDateStamp(date: Date = new Date()): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return `${yyyy}${mm}${dd}`;
}
