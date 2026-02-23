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
          personalInfo={portfolioPage.personalInfo}
          hero={portfolioPage.hero}
          documentId={portfolioPage._id}
          documentType={portfolioPage._type}
        />
        <AboutSection about={portfolioPage.about} documentId={portfolioPage._id} documentType={portfolioPage._type} />
        <SkillsSection
          skills={portfolioPage.skills}
          documentId={portfolioPage._id}
          documentType={portfolioPage._type}
        />
        <ProjectsSection
          projects={portfolioPage.projects}
          documentId={portfolioPage._id}
          documentType={portfolioPage._type}
        />
        <ExperienceSection
          experience={portfolioPage.experience}
          documentId={portfolioPage._id}
          documentType={portfolioPage._type}
        />
        <EducationSection
          education={portfolioPage.education}
          documentId={portfolioPage._id}
          documentType={portfolioPage._type}
        />
        <ContactSection
          personalInfo={portfolioPage.personalInfo}
          contact={portfolioPage.contact}
          documentId={portfolioPage._id}
          documentType={portfolioPage._type}
        />
      </main>
      <Footer personalInfo={portfolioPage.personalInfo} footer={portfolioPage.footer} />
    </>
  );
}
