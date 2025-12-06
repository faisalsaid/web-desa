export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/auth/',
        '/idm/',
        '/organitations/',
        '/apbdesa/',
        '/families/',
        '/village/',
        '/residents/',
      ],
    },
    sitemap: 'https://web-desa-contoh.vercel.app/sitemap.xml',
  };
}
