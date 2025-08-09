import FeatureSection from './_components/FeatureSection';
import HeroSection from './_components/HeroSection';
import WelcomeSentenceSection from './_components/WelcomeSentenceSection';

export default function Home() {
  return (
    <div className="p-4 space-y-8">
      <HeroSection />
      <FeatureSection />
      <WelcomeSentenceSection />
    </div>
  );
}
