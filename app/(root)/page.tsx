import AbstractionSection from './_components/AbstractionSection';
import BudgetRealizationSection from './_components/BudgetRealizationSection';
// import BudgetSection from './_components/BudgetSection';
import FeatureSection from './_components/FeatureSection';
import GalerySection from './_components/GalerySection';
import HeroSection from './_components/HeroSection';
import MapLocationSection from './_components/MapLocationSection';
import NewsSection from './_components/NewsSection';
import OrganizationlSection from './_components/OrganizationlSection';
import PotentialSection from './_components/PotentialSection';
import ShopSection from './_components/ShopSection';
import TourSection from './_components/TourSection';

import WelcomeSentenceSection from './_components/WelcomeSentenceSection';
import {
  getAllStaff,
  getCurrentBudgetYearSummaryReport,
} from './_lib/home.actions';

export default async function Home() {
  const allStaff = await getAllStaff();
  const apbdesaReport = await getCurrentBudgetYearSummaryReport();

  return (
    <div className="space-y-12">
      <HeroSection />
      <div className="p-4 space-y-12">
        <FeatureSection />
        <WelcomeSentenceSection />
        <MapLocationSection />
        <OrganizationlSection allStaff={allStaff} />
        <AbstractionSection />
        {apbdesaReport ? (
          <BudgetRealizationSection data={apbdesaReport} />
        ) : null}

        {/* <BudgetSection report={apbdesaReport} /> */}
        <NewsSection />
        <PotentialSection />
        <TourSection />
        <ShopSection />
        <GalerySection />
      </div>
    </div>
  );
}
