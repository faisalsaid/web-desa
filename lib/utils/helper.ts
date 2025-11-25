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

// src/lib/decimal.ts
export function toDecimal(input: string): string {
  const clean = input.replace(/[^0-9.]/g, '');

  if (clean === '' || Number.isNaN(Number(clean))) {
    throw new Error(`Invalid decimal value: ${input}`);
  }

  return clean;
}
