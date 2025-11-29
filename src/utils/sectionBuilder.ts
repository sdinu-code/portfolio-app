import type { ContentData } from '@data/types';
import { Award, Briefcase, Camera, FolderGit2, Home as HomeIcon, Lightbulb, User } from 'lucide-react';

export interface SectionConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  enabled: boolean;
  order: number;
  useSkeleton?: boolean;
}

export interface SectionChecks {
  hasProjects: boolean;
  hasCertifications: boolean;
  hasSkills: boolean;
  hasExperience: boolean;
  hasHobbies: boolean;
  hasContact: boolean;
}

export const checkSectionAvailability = (contentData: ContentData): SectionChecks => {
  const { projects, certifications, skills, experience, photography, games, speedSkating, contact, sections: sectionsConfig } = contentData;

  return {
    hasProjects: sectionsConfig.projects.enabled && projects && projects.length > 0,
    hasCertifications: sectionsConfig.certifications.enabled && certifications && certifications.length > 0,
    hasSkills: sectionsConfig.skills.enabled && skills && (skills.professional?.length > 0 || skills.languages?.length > 0),
    hasExperience: sectionsConfig.experience.enabled && experience && experience.length > 0,
    hasHobbies: sectionsConfig.hobbies.enabled && ((photography && photography.length > 0) || (games && games.length > 0) || !!speedSkating),
    hasContact: sectionsConfig.contact.enabled && contact && !!(contact.email || contact.linkedin || contact.calendly),
  };
};

export const buildSections = (contentData: ContentData, checks: SectionChecks): SectionConfig[] => {
  const { sections: sectionsConfig } = contentData;

  const allSections: SectionConfig[] = [
    { id: 'home', label: 'Home', icon: HomeIcon, enabled: true, order: 0 },
    { id: 'projects', label: 'Projects', icon: FolderGit2, enabled: checks.hasProjects, order: sectionsConfig.projects.order, useSkeleton: sectionsConfig.projects.useSkeleton },
    { id: 'certifications', label: 'Certifications', icon: Award, enabled: checks.hasCertifications, order: sectionsConfig.certifications.order, useSkeleton: sectionsConfig.certifications.useSkeleton },
    { id: 'skills', label: 'Skills', icon: Lightbulb, enabled: checks.hasSkills, order: sectionsConfig.skills.order, useSkeleton: sectionsConfig.skills.useSkeleton },
    { id: 'experience', label: 'Experience', icon: Briefcase, enabled: checks.hasExperience, order: sectionsConfig.experience.order, useSkeleton: sectionsConfig.experience.useSkeleton },
    { id: 'hobbies', label: 'Hobbies', icon: Camera, enabled: checks.hasHobbies, order: sectionsConfig.hobbies.order, useSkeleton: sectionsConfig.hobbies.useSkeleton },
    { id: 'contact', label: 'Contact', icon: User, enabled: checks.hasContact, order: sectionsConfig.contact.order, useSkeleton: sectionsConfig.contact.useSkeleton },
  ];

  return allSections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);
};
