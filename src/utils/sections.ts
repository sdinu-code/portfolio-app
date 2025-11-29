import { contentData } from '@data/content';

/**
 * Utility to check if a section is enabled in the configuration
 */
export const isSectionEnabled = (sectionId: keyof typeof contentData.sections): boolean => {
  return contentData.sections[sectionId]?.enabled ?? false;
};

/**
 * Get the order of a section
 */
export const getSectionOrder = (sectionId: keyof typeof contentData.sections): number => {
  return contentData.sections[sectionId]?.order ?? 999;
};

/**
 * Get all enabled sections sorted by order
 */
export const getEnabledSections = () => {
  return Object.entries(contentData.sections)
    .filter(([_, config]) => config.enabled)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([id]) => id);
};

/**
 * Section metadata for navigation and display
 */
export const SECTION_METADATA = {
  projects: {
    label: 'Projects',
    description: 'My portfolio of work',
  },
  certifications: {
    label: 'Certifications',
    description: 'Professional achievements',
  },
  skills: {
    label: 'Skills',
    description: 'Technical expertise',
  },
  experience: {
    label: 'Experience',
    description: 'Work history',
  },
  hobbies: {
    label: 'Hobbies',
    description: 'Personal interests',
  },
  contact: {
    label: 'Contact',
    description: 'Get in touch',
  },
} as const;
