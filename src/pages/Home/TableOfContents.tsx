import type { SectionConfig } from '@utils/sectionBuilder';
import { memo } from 'react';
import styled from 'styled-components';

const TableOfContentsNav = styled.nav`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out 1s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @media (max-width: 968px) {
    right: 1rem;
    padding: 0.75rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const TocList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  padding-left: 1.5rem;
  justify-content: stretch;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    left: 3px;
    top: 1rem;
    bottom: 1rem;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const TocButton = styled.button<{ $active: boolean }>`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.75rem 1rem 0.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  color: ${({ theme, $active }) => $active ? theme.colors.foreground : theme.colors.secondary};
  transition: all ${({ theme }) => theme.transitions.fast};
  border-radius: 0.5rem;
  white-space: nowrap;

  &::before {
    content: '';
    position: absolute;
    left: -1.5rem;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme, $active }) => $active ? theme.colors.foreground : theme.colors.secondary};
    transition: all ${({ theme }) => theme.transitions.fast};
    z-index: 2;
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.foreground};
    background-color: ${({ theme }) => theme.colors.accent};

    &::before {
      background-color: ${({ theme }) => theme.colors.foreground};
      transform: scale(1.4);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.foreground};
    outline-offset: 2px;
  }

  ${({ $active, theme }) => $active && `
    background-color: ${theme.colors.accent};

    &::before {
      transform: scale(1.4);
    }
  `}
`;

const TocLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;

  @media (max-width: 968px) {
    display: none;
  }
`;

interface TableOfContentsProps {
  sections: SectionConfig[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const TableOfContents = memo(({ sections, activeSection, onNavigate }: TableOfContentsProps) => {
  return (
    <TableOfContentsNav>
      <TocList>
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <TocButton
              key={section.id}
              $active={activeSection === section.id}
              onClick={() => onNavigate(section.id)}
              aria-label={`Go to ${section.label}`}
            >
              <Icon size={18} />
              <TocLabel>{section.label}</TocLabel>
            </TocButton>
          );
        })}
      </TocList>
    </TableOfContentsNav>
  );
});

TableOfContents.displayName = 'TableOfContents';
