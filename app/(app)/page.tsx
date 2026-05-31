import { notFound } from "next/navigation";
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
import { getPortfolioPageData } from "~/lib/sanity/services";

async function loadData() {
  const [error, portfolioPage] = await getPortfolioPageData();

  if (error) {
    notFound();
  }

  return { portfolioPage };
}

export default async function HomePage() {
  const { portfolioPage } = await loadData();

  return (
    <>
      <Navigation personalInfo={portfolioPage.personalInfo} />
      <main>
        <HeroSection
          documentId={portfolioPage._id}
          documentType={portfolioPage._type}
          hero={portfolioPage.hero}
          personalInfo={portfolioPage.personalInfo}
        />
        <AboutSection about={portfolioPage.about} documentId={portfolioPage._id} documentType={portfolioPage._type} />
        <SkillsSection
          documentId={portfolioPage._id}
          documentType={portfolioPage._type}
          skills={portfolioPage.skills}
        />
        <ProjectsSection
          documentId={portfolioPage._id}
          documentType={portfolioPage._type}
          projects={portfolioPage.projects}
        />
        <ExperienceSection
          documentId={portfolioPage._id}
          documentType={portfolioPage._type}
          experience={portfolioPage.experience}
        />
        <EducationSection
          documentId={portfolioPage._id}
          documentType={portfolioPage._type}
          education={portfolioPage.education}
        />
        <ContactSection
          contact={portfolioPage.contact}
          documentId={portfolioPage._id}
          documentType={portfolioPage._type}
          personalInfo={portfolioPage.personalInfo}
        />
      </main>
      <Footer footer={portfolioPage.footer} personalInfo={portfolioPage.personalInfo} />
    </>
  );
}
