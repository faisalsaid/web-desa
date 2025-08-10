import AbstractionSection from './_components/AbstractionSection';
import BudgetSection from './_components/BudgetSection';
import FeatureSection from './_components/FeatureSection';
import HeroSection from './_components/HeroSection';
import ImagesSection from './_components/ImagesSection';
import MapLocationSection from './_components/MapLocationSection';
import NewsSection from './_components/NewsSection';
import OrganizationlSection from './_components/OrganizationlSection';
import PotentialSection from './_components/PotentialSection';

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
      <BudgetSection />
      <NewsSection />
      <PotentialSection />
      <ImagesSection />
    </div>
  );
}
