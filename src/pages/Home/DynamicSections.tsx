import { CertificationsSkeleton } from '@components/skeletons/CertificationsSkeleton';
import { ContactSkeleton } from '@components/skeletons/ContactSkeleton';
import { ExperienceSkeleton } from '@components/skeletons/ExperienceSkeleton';
import { HobbiesSkeleton } from '@components/skeletons/HobbiesSkeleton';
import { ProjectsSkeleton } from '@components/skeletons/ProjectsSkeleton';
import { SkillsSkeleton } from '@components/skeletons/SkillsSkeleton';
import type { SectionConfig } from '@utils/sectionBuilder';
import { lazy, memo, Suspense } from 'react';
import styled from 'styled-components';

const Certifications = lazy(() => import('@pages/Certifications'));
const Contact = lazy(() => import('@pages/Contact'));
const Experience = lazy(() => import('@pages/Experience'));
const Hobbies = lazy(() => import('@pages/Hobbies'));
const Projects = lazy(() => import('@pages/Projects'));
const Skills = lazy(() => import('@pages/Skills'));

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 8rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 6rem 1.5rem 3rem;
  }
`;

interface DynamicSectionsProps {
  sections: SectionConfig[];
  sectionChecks: {
    hasProjects: boolean;
    hasCertifications: boolean;
    hasSkills: boolean;
    hasExperience: boolean;
    hasHobbies: boolean;
    hasContact: boolean;
  };
}

export const DynamicSections = memo(({ sections, sectionChecks }: DynamicSectionsProps) => {
  const { hasProjects, hasCertifications, hasSkills, hasExperience, hasHobbies, hasContact } = sectionChecks;

  const getFallback = (useSkeleton: boolean, SkeletonComponent: React.ComponentType) => {
    return useSkeleton ? <SkeletonComponent /> : <div style={{ minHeight: '80vh' }} />;
  };

  return (
    <>
      {sections.slice(1).map((section) => {
        const useSkeleton = section.useSkeleton ?? false;

        switch (section.id) {
          case 'projects':
            return hasProjects ? (
              <Section key={section.id} data-section="projects">
                <Suspense fallback={getFallback(useSkeleton, ProjectsSkeleton)}>
                  <Projects />
                </Suspense>
              </Section>
            ) : null;
          case 'certifications':
            return hasCertifications ? (
              <Section key={section.id} data-section="certifications">
                <Suspense fallback={getFallback(useSkeleton, CertificationsSkeleton)}>
                  <Certifications />
                </Suspense>
              </Section>
            ) : null;
          case 'skills':
            return hasSkills ? (
              <Section key={section.id} data-section="skills">
                <Suspense fallback={getFallback(useSkeleton, SkillsSkeleton)}>
                  <Skills />
                </Suspense>
              </Section>
            ) : null;
          case 'experience':
            return hasExperience ? (
              <Section key={section.id} data-section="experience">
                <Suspense fallback={getFallback(useSkeleton, ExperienceSkeleton)}>
                  <Experience />
                </Suspense>
              </Section>
            ) : null;
          case 'hobbies':
            return hasHobbies ? (
              <Section key={section.id} data-section="hobbies">
                <Suspense fallback={getFallback(useSkeleton, HobbiesSkeleton)}>
                  <Hobbies />
                </Suspense>
              </Section>
            ) : null;
          case 'contact':
            return hasContact ? (
              <Section key={section.id} data-section="contact">
                <Suspense fallback={getFallback(useSkeleton, ContactSkeleton)}>
                  <Contact />
                </Suspense>
              </Section>
            ) : null;
          default:
            return null;
        }
      })}
    </>
  );
});

DynamicSections.displayName = 'DynamicSections';
