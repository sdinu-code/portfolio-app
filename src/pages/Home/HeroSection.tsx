import Blinker from '@components/Blinker/Blinker';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Loader as LoaderIcon, Sparkles } from 'lucide-react';
import { memo } from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Greeting = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.foreground} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.foreground};
  color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.foreground};
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.foreground};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Stats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  justify-items: center;

  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

interface HeroSectionProps {
  name: string;
  age: number;
  position: string;
  location: string;
  yearsOfExperience: number;
  projectsCount: number;
  technologiesCount: number;
  hasProjects: boolean;
  firstSectionId?: string;
  isGeneratingPDF: boolean;
  onViewWork: () => void;
  onDownloadCV: () => void;
}

export const HeroSection = memo(({
  name,
  age,
  position,
  location,
  yearsOfExperience,
  projectsCount,
  technologiesCount,
  hasProjects,
  firstSectionId,
  isGeneratingPDF,
  onViewWork,
  onDownloadCV,
}: HeroSectionProps) => {
  const firstName = name.split(' ')[0];

  return (
    <HeroContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Greeting variants={itemVariants}>
          <Sparkles size={16} />
          Welcome to my portfolio
        </Greeting>

        <Title variants={itemVariants}>
          <Blinker text={`Hi, I'm ${firstName}`} />
        </Title>

        <Subtitle variants={itemVariants}>
          {age}-year-old {position} based in {location}.
          Building exceptional digital experiences with modern web technologies.
        </Subtitle>

        <ButtonGroup variants={itemVariants}>
          <PrimaryButton onClick={onViewWork} disabled={!firstSectionId}>
            View My Work
            <ArrowRight size={20} />
          </PrimaryButton>
          <SecondaryButton onClick={onDownloadCV} disabled={isGeneratingPDF}>
            {isGeneratingPDF ? (
              <>
                <LoaderIcon size={20} style={{ animation: 'spin 1s linear infinite' }} />
                Downloading...
              </>
            ) : (
              <>
                <Download size={20} />
                Download CV
              </>
            )}
          </SecondaryButton>
        </ButtonGroup>

        <Stats variants={itemVariants}>
          <Stat>
            <StatValue>{yearsOfExperience}+</StatValue>
            <StatLabel>Years Experience</StatLabel>
          </Stat>
          {hasProjects && (
            <Stat>
              <StatValue>{projectsCount}+</StatValue>
              <StatLabel>Projects Completed</StatLabel>
            </Stat>
          )}
          {technologiesCount > 0 && (
            <Stat>
              <StatValue>{technologiesCount}+</StatValue>
              <StatLabel>Technologies</StatLabel>
            </Stat>
          )}
        </Stats>
      </motion.div>
    </HeroContainer>
  );
});

HeroSection.displayName = 'HeroSection';
