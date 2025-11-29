import { Header } from '@components/Header/Header';
import { contentData } from '@data/content';
import { useSectionScroll } from '@hooks/useSectionScroll';
import { DynamicSections } from '@pages/Home/DynamicSections';
import { HeroSection } from '@pages/Home/HeroSection';
import { TableOfContents } from '@pages/Home/TableOfContents';
import { calculateAge, calculateYearsOfExperience } from '@utils/dateUtils';
import { downloadCV } from '@utils/pdfGenerator';
import { buildSections, checkSectionAvailability } from '@utils/sectionBuilder';
import { memo, useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const HomeSection = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Home = memo(() => {
  const { contact, projects, technologies } = contentData;
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const age = calculateAge(contact.birthDate);
  const yearsOfExperience = calculateYearsOfExperience(contact.firstJobDate);

  // Build sections configuration
  const sectionChecks = checkSectionAvailability(contentData);
  const sections = buildSections(contentData, sectionChecks);
  const firstSection = sections.find(section => section.id !== 'home');

  // Use section scroll hook
  const { activeSection, containerRef, scrollToSection} = useSectionScroll();

  const handleDownloadCV = async () => {
    setIsGeneratingPDF(true);
    try {
      await downloadCV();
    } catch (error) {
      console.error('Failed to download CV:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleViewWork = () => {
    if (firstSection) {
      scrollToSection(firstSection.id);
    }
  };

  return (
    <>
      <Header
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      <PageContainer ref={containerRef}>
        <TableOfContents
          sections={sections}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />

        <HomeSection data-section="home">
          <HeroSection
            name={contact.name}
            age={age}
            position={contact.position}
            location={contact.location}
            yearsOfExperience={yearsOfExperience}
            projectsCount={projects.length}
            technologiesCount={technologies?.items?.length || 0}
            hasProjects={sectionChecks.hasProjects}
            firstSectionId={firstSection?.id}
            isGeneratingPDF={isGeneratingPDF}
            onViewWork={handleViewWork}
            onDownloadCV={handleDownloadCV}
          />
        </HomeSection>

        <DynamicSections sections={sections} sectionChecks={sectionChecks} />
      </PageContainer>
    </>
  );
});

export default Home;
