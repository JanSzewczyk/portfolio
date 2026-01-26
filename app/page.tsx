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
  SECTION_HEADINGS,
  SKILL_GROUPS,
  SOCIAL_LINKS,
  STATS,
  TECH_LOGOS
} from "~/constants/portfolio";
import { Section } from "~/constants/sections";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection personalInfo={PERSONAL_INFO} />
        <AboutSection personalInfo={PERSONAL_INFO} stats={STATS} heading={SECTION_HEADINGS[Section.ABOUT]} />
        <SkillsSection skillGroups={SKILL_GROUPS} techLogos={TECH_LOGOS} heading={SECTION_HEADINGS[Section.SKILLS]} />
        <ProjectsSection
          projects={PROJECTS}
          projectCategories={PROJECT_CATEGORIES}
          heading={SECTION_HEADINGS[Section.PROJECTS]}
        />
        <ExperienceSection experiences={EXPERIENCES} heading={SECTION_HEADINGS[Section.EXPERIENCE]} />
        <EducationSection education={EDUCATION} heading={SECTION_HEADINGS[Section.EDUCATION]} />
        <ContactSection
          personalInfo={PERSONAL_INFO}
          socialLinks={SOCIAL_LINKS}
          heading={SECTION_HEADINGS[Section.CONTACT]}
        />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
