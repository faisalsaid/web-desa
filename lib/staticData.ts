export const webTitle = 'Website Desa';

// constants/dusun.ts

export type DusunOption = {
  key: string; // ID atau kode internal
  value: string; // Nama dusun yang ditampilkan
};

export const DUSUN_LIST: DusunOption[] = [
  { key: 'dusun_a', value: 'Dusun A' },
  { key: 'dusun_b', value: 'Dusun B' },
  { key: 'dusun_c', value: 'Dusun C' },
  { key: 'dusun_d', value: 'Dusun D' },
];

// constants/rw-rt.ts

export type Option = {
  key: string; // ID atau kode internal
  value: string; // Label yang ditampilkan
};

// Misal RW 1–20
export const RW_LIST: Option[] = Array.from({ length: 4 }, (_, i) => {
  const val = (i + 1).toString().padStart(2, '0'); // "01", "02", ...
  return { key: val, value: val };
});

// RT juga 1–20
export const RT_LIST: Option[] = Array.from({ length: 12 }, (_, i) => {
  const val = (i + 1).toString().padStart(2, '0');
  return { key: val, value: val };
});
