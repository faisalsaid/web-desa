import Header from '@/components/Header';
import MobileNavigation from './_components/MobileNavigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
      <Header />
      {children}
      <div className="sticky bottom-0 w-full p-2">
        <MobileNavigation />
      </div>
    </div>
  );
}
