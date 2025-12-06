export default function sitemap() {
  const base = 'https://web-desa-contoh.vercel.app';

  const pages = [
    '',
    '/profil',
    '/idm-info',
    '/berita',
    '/belanja',
    '/pengaduan',
  ];

  return pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date().toISOString(),
  }));
}

// conotoh dinamis untuk berita (dinamic sitemap)
// untuk berita hanya butuh slag dan tanggal last update

// import { getAllNews } from "@/lib/db";

// export default async function sitemap() {
//   const base = 'https://web-desa-contoh.vercel.app';

//   // ambil berita dari DB
//   const news = await getAllNews();

//   return [
//     {
//       url: base,
//       lastModified: new Date(),
//     },
//     {
//       url: `${base}/profil`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${base}/idm-info`,
//       lastModified: new Date(),
//     },

//     // halaman berita dinamis
//     ...news.map((item) => ({
//       url: `${base}/berita/${item.slug}`,
//       lastModified: item.updatedAt,
//     })),
//   ];
// }
