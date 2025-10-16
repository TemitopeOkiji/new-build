import { Hero } from "@/components/Hero";
import { ThreePillars } from "@/components/ThreePillars";
import { VendorShowcase } from "@/components/VendorShowcase";
import { AIPlanning } from "@/components/AIPlanning";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ThreePillars />
      <VendorShowcase />
      <AIPlanning />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
