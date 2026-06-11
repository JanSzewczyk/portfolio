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
import { sendContactEmail } from "~/features/contact/server";
import { createLogger } from "~/lib/logger";
import { getPortfolioPageData } from "~/lib/sanity/services";
import { getTopSkills } from "~/services/tech.service";

const logger = createLogger({ module: "home-page" });

async function loadData() {
  const [error, portfolioPage] = await getPortfolioPageData();

  if (error) {
    logger.error({ errorMessage: error.message, errorName: error.name }, "Failed to load portfolio page data");

    // Expected "no content" → 404; anything else is an unexpected server error → error boundary
    if (error.name === "PortfolioPageNotFoundError") {
      notFound();
    }

    throw error;
  }

  const topSkills = getTopSkills(portfolioPage);

  logger.info({ portfolioPageId: portfolioPage._id, topSkillsCount: topSkills.length }, "Loaded portfolio page data");

  return { portfolioPage, topSkills };
}

export default async function HomePage() {
  const { portfolioPage, topSkills } = await loadData();

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
          topSkills={topSkills}
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
          sendContactAction={sendContactEmail}
        />
      </main>
      <Footer footer={portfolioPage.footer} personalInfo={portfolioPage.personalInfo} />
    </>
  );
}
