// format number ke rupiah / ribuan
export function formatCurrency(value: string | number): string {
  if (!value) return '';
  const numeric =
    typeof value === 'string' ? parseInt(value.replace(/\D/g, ''), 10) : value;
  if (isNaN(numeric)) return '';
  return numeric.toLocaleString('id-ID');
}
// parse string formatted ke number
export function parseCurrency(value: string): number {
  if (!value) return 0;
  return parseInt(value.replace(/\./g, '').replace(/\D/g, ''), 10);
}

// app/lib/decimal.ts
export function toDecimal(input: string): string {
  const clean = input.replace(/[^0-9.]/g, '');

  if (clean === '' || Number.isNaN(Number(clean))) {
    throw new Error(`Invalid decimal value: ${input}`);
  }

  return clean;
}

/**
 * Format number string menjadi versi singkat
 * Contoh:
 * "1500000" => "1,5 Jt"
 * "500000"  => "500 Rb"
 * "1000000000" => "1 M"
 */
export function formatCurrencyShort(value: string | number): string {
  const num = typeof value === 'string' ? Number(value) : value;

  if (isNaN(num)) return '0';

  if (num >= 1_000_000_000) {
    // Miliar
    return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')} M`;
  } else if (num >= 1_000_000) {
    // Juta
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')} Jt`;
  } else if (num >= 1_000) {
    // Ribu
    return `${(num / 1_000).toFixed(0)} Rb`;
  } else {
    return num.toString();
  }
}
