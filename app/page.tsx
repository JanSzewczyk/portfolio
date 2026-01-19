import { Toaster } from "@szum-tech/design-system";
import { Footer, Navigation } from "~/components/layout";
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  SkillsSection
} from "~/components/sections";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
