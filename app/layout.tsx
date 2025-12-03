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

const villageInfo = await getVillageConfig();

export const metadata: Metadata = {
  title: `Desa ${
    villageInfo?.villageName ? villageInfo.villageName : 'Contoh'
  }`,
  description: `Website resmi Desa ${
    villageInfo?.villageName ? villageInfo.villageName : 'Contoh'
  } — informasi desa, layanan publik, dan berita terbaru.`,
  metadataBase: new URL('https://web-desa-contoh.vercel.app'),

  openGraph: {
    title: `Desa ${
      villageInfo?.villageName ? villageInfo.villageName : 'Contoh'
    }`,
    description: `Informasi resmi Desa ${
      villageInfo?.villageName ? villageInfo.villageName : 'Contoh'
    }.`,
    url: 'https://web-desa-contoh.vercel.app',
    siteName: `Desa ${
      villageInfo?.villageName ? villageInfo.villageName : 'Contoh'
    }`,
    images: [
      {
        url: '/img/logo-desa.png', // gambar logo / banner desa
        width: 1200,
        height: 630,
        alt: `Website Desa ${
          villageInfo?.villageName ? villageInfo.villageName : 'Contoh'
        }`,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: `Desa ${
      villageInfo?.villageName ? villageInfo.villageName : 'Contoh'
    }`,
    description: `Website resmi Desa ${
      villageInfo?.villageName ? villageInfo.villageName : 'Contoh'
    }`,
    images: ['/img/logo-desa.png'],
  },
};

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
