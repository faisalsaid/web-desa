import Header from '@/app/(root)/_components/Header';
import MobileNavigation from './_components/MobileNavigation';
import Footer from './_components/Footer';
import { getVillageConfig } from './_lib/home.actions';
import VillageProvider from './_lib/VillageProvider';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const villageInfo = await getVillageConfig();
  return (
    <VillageProvider village={villageInfo}>
      <div className="relative min-h-screen ">
        <Header />
        <div className="container mx-auto">{children}</div>
        <Footer />
        <div className="sticky bottom-0 w-full p-2 z-50 md:hidden">
          <MobileNavigation />
        </div>
      </div>
    </VillageProvider>
  );
}
