import { Toaster } from "@szum-tech/design-system";
import { Footer, Navigation } from "~/components/layout";
import {
  AboutSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  SkillsSection
} from "~/components/sections";
import {
  EDUCATION,
  EXPERIENCES,
  PERSONAL_INFO,
  PROJECT_CATEGORIES,
  PROJECTS,
  SKILL_GROUPS,
  SOCIAL_LINKS,
  STATS,
  TECH_LOGOS
} from "~/constants/portfolio";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection personalInfo={PERSONAL_INFO} />
        <AboutSection personalInfo={PERSONAL_INFO} stats={STATS} />
        <SkillsSection skillGroups={SKILL_GROUPS} techLogos={TECH_LOGOS} />
        <ProjectsSection projects={PROJECTS} projectCategories={PROJECT_CATEGORIES} />
        <ExperienceSection experiences={EXPERIENCES} />
        <EducationSection education={EDUCATION} />
        <ContactSection personalInfo={PERSONAL_INFO} socialLinks={SOCIAL_LINKS} />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
