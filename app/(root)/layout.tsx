import Header, { HeadOfVillage } from '@/app/(root)/_components/Header';
import MobileNavigation from './_components/MobileNavigation';
import Footer from './_components/Footer';
import { getHeadOfVillage, getVillageConfig } from './_lib/home.actions';
import { HeaderComp } from './_components/HeaderComp';
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const villageInfo = await getVillageConfig();
  const headOfVIllage = await getHeadOfVillage();
  return (
    <div className="relative min-h-screen ">
      <HeaderComp
        initialVillage={villageInfo ? villageInfo : null}
        initialHeadOfVillage={headOfVIllage as HeadOfVillage}
      />
      {/* <Header
        initialVillage={villageInfo ? villageInfo : null}
        initialHeadOfVillage={headOfVIllage as HeadOfVillage}
      /> */}
      <div className="container mx-auto">{children}</div>
      <Footer />
      <div className="sticky bottom-0 w-full p-2 z-50 md:hidden">
        <MobileNavigation />
      </div>
    </div>
  );
}
