import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/themeProvider';
import { Toaster } from 'sonner';
import { getVillageConfig } from './(root)/_lib/home.actions';
import { auth } from '@/auth';
import { getCurrentUser } from './_lib/actions/users.actions';
import ClientStoreInitializer from '@/components/ClientStoreInitializer';
import Providers from '@/components/Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const village = await getVillageConfig();
  const name = village?.villageName || 'Contoh Desa';
  // const logo = village?.logoUrl || '/img/logo-desa.jpg';
  const domain = 'https://web-desa-contoh.vercel.app/';
  const ogImage = '/img/og-image.jpg';

  return {
    metadataBase: new URL(domain),

    title: {
      default: `Desa ${name}`,
      template: '%s | WEBSITE DESA',
    },

    description: `Website resmi Desa ${name}. Informasi lengkap tentang pemerintahan, layanan publik, dan berita desa.`,

    openGraph: {
      title: `Desa ${name}`,
      description: `Website resmi Desa ${name}`,
      url: domain,
      siteName: `Desa ${name}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Logo Desa ${name}`,
        },
      ],
      locale: 'id_ID',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: `Desa ${name}`,
      description: `Website resmi Desa ${name}`,
      images: [ogImage],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  let fullUser = null;

  if (session?.user?.email) {
    // 1. Ambil email
    const email = session.user.email;

    // 2. Fetch data pengguna lengkap
    fullUser = await getCurrentUser(email);
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary-foreground`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClientStoreInitializer user={fullUser} />
            {children}
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
