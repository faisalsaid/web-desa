import AbstractionSection from './_components/AbstractionSection';
import FeatureSection from './_components/FeatureSection';
import HeroSection from './_components/HeroSection';
import MapLocationSection from './_components/MapLocationSection';
import OrganizationlSection from './_components/OrganizationlSection';

import WelcomeSentenceSection from './_components/WelcomeSentenceSection';

export default function Home() {
  return (
    <div className="p-4 space-y-12">
      <HeroSection />
      <FeatureSection />
      <WelcomeSentenceSection />
      <MapLocationSection />
      <OrganizationlSection />
      <AbstractionSection />
    </div>
  );
}
