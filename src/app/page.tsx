import {
  HeroSection,
  FeaturesSection,
  TechStackAndComparison,
  VideoPlayer,
} from "@/components";
import RupeeBeeFeaturedSection from "@/components/rupeebee-featured-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <main className="">
        <HeroSection />
        <VideoPlayer 
          googleDriveUrl="https://drive.google.com/file/d/15seKzvGMQ7FyoY0sgs7W29Ds6kY1I2_A/view?usp=drive_link"
          title="Discover RupeeBee"
          description=""
        />
        <FeaturesSection />
        {/* <ForIndiaSection /> */}
        <TechStackAndComparison />
        <RupeeBeeFeaturedSection />
      </main>
    </div>
  );
}
