import { contentData } from '@data/content';
import { motion } from 'framer-motion';
import { Award, Code, Globe, Lightbulb, Trophy, Wrench } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

const SkillsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  gap: 3rem;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const SkillSection = styled(motion.section)`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 2.5rem;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.foreground};
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SectionIcon = styled.div<{ $color?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  background: linear-gradient(
    135deg,
    ${({ theme, $color }) => $color || theme.colors.foreground} 0%,
    ${({ theme }) => theme.colors.accent} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.background};
  flex-shrink: 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Professional Skills
const SkillsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const SkillItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 0.5rem;
  }
`;

const SkillBarContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    height: 40px;
    align-items: center;
    position: relative;
  }
`;

const SkillBar = styled(motion.div)<{ $level: number }>`
  width: 100%;
  max-width: 60px;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.foreground} 0%,
    ${({ theme }) => theme.colors.accent} 100%
  );
  border-radius: 0.5rem 0.5rem 0 0;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0.5rem;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  @media (max-width: 768px) {
    max-width: none;
    height: 100%;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.foreground} 0%,
      ${({ theme }) => theme.colors.accent} 100%
    );
    border-radius: 0.5rem 0 0 0.5rem;
    align-items: center;
    justify-content: flex-start;
    padding: 0 0.75rem;

    &:hover {
      transform: translateX(4px);
    }
  }
`;

const SkillLevel = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.background};
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const SkillName = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  text-align: center;
  word-break: break-word;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    text-align: left;
    order: -1;
    margin-bottom: 0.25rem;
  }
`;

// Languages & Tools
const TagsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Tag = styled.div`
  padding: 0.75rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: default;

  &:hover {
    border-color: ${({ theme }) => theme.colors.foreground};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

// Personal Skills
const PersonalSkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PersonalSkillCard = styled.div`
  padding: 1rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.foreground};
    transform: scale(1.02);
  }
`;

// Codewars Styles
const CodewarsStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;

    & > *:nth-child(3) {
      grid-column: 1 / -1;
      max-width: 200px;
    }
  }
`;

const CodewarsStat = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
    border-color: ${({ theme }) => theme.colors.foreground};
  }
`;

const CodewarsStatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

const CodewarsStatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CodewarsLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.foreground};
  color: ${({ theme }) => theme.colors.background};
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
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

interface CodewarsData {
  username: string;
  honor: number;
  ranks: {
    overall: {
      rank: number;
      name: string;
      color: string;
      score: number;
    };
  };
  codeChallenges: {
    totalCompleted: number;
  };
}

const Skills = memo(() => {
  const { skills, codewars } = contentData;
  const [codewarsData, setCodewarsData] = useState<CodewarsData | null>(null);
  const [codewarsLoading, setCodewarsLoading] = useState(true);

  useEffect(() => {
    const fetchCodewarsData = async () => {
      if (!codewars?.enabled || !codewars?.username) {
        setCodewarsLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://www.codewars.com/api/v1/users/${codewars.username}`);
        if (response.ok) {
          const data = await response.json();
          setCodewarsData(data);
        }
      } catch (error) {
        console.error('Failed to fetch Codewars data:', error);
      } finally {
        setCodewarsLoading(false);
      }
    };

    fetchCodewarsData();
  }, [codewars]);

  // Only render if skills exist
  if (!skills) {
    return null;
  }

  const { professional, languages, developmentTools, personal } = skills;

  return (
    <SkillsContainer>
      <Header>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skills & Expertise
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          My technical and professional capabilities
        </Subtitle>
      </Header>

      <SkillsGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Professional Skills */}
        {professional && professional.length > 0 && (
          <SkillSection variants={itemVariants}>
            <SectionHeader>
              <SectionIcon $color="#3b82f6">
                <Code size={24} />
              </SectionIcon>
              <SectionTitle>Technical Skills</SectionTitle>
            </SectionHeader>
            <SkillsList>
              {professional
                .sort((a, b) => b.level - a.level)
                .map((skill, index) => (
                  <SkillItem key={index}>
                    <SkillBarContainer>
                      <SkillBar
                        $level={skill.level}
                        initial={{ height: 0, width: 0 }}
                        animate={{
                          height: `${skill.level}%`,
                          width: `${skill.level}%`
                        }}
                        transition={{ duration: 1, delay: index * 0.05 }}
                      >
                        <SkillLevel>{skill.level}%</SkillLevel>
                      </SkillBar>
                    </SkillBarContainer>
                    <SkillName>{skill.name}</SkillName>
                  </SkillItem>
                ))}
            </SkillsList>
          </SkillSection>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <SkillSection variants={itemVariants}>
            <SectionHeader>
              <SectionIcon $color="#10b981">
                <Globe size={24} />
              </SectionIcon>
              <SectionTitle>Languages</SectionTitle>
            </SectionHeader>
            <TagsGrid>
              {languages.map((language, index) => (
                <Tag key={index}>{language}</Tag>
              ))}
            </TagsGrid>
          </SkillSection>
        )}

        {/* Development Tools */}
        {developmentTools && developmentTools.length > 0 && (
          <SkillSection variants={itemVariants}>
            <SectionHeader>
              <SectionIcon $color="#f59e0b">
                <Wrench size={24} />
              </SectionIcon>
              <SectionTitle>Development Tools</SectionTitle>
            </SectionHeader>
            <TagsGrid>
              {developmentTools.map((tool, index) => (
                <Tag key={index}>{tool}</Tag>
              ))}
            </TagsGrid>
          </SkillSection>
        )}

        {/* Codewars */}
        {codewars?.enabled && codewarsData && !codewarsLoading && (
          <SkillSection variants={itemVariants}>
            <SectionHeader>
              <SectionIcon $color="#f59e0b">
                <Trophy size={24} />
              </SectionIcon>
              <SectionTitle>Codewars Progress</SectionTitle>
            </SectionHeader>
            <CodewarsStats>
              <CodewarsStat>
                <CodewarsStatValue>
                  <Trophy size={20} />
                  {codewarsData.ranks.overall.name}
                </CodewarsStatValue>
                <CodewarsStatLabel>Current Rank</CodewarsStatLabel>
              </CodewarsStat>
              <CodewarsStat>
                <CodewarsStatValue>
                  <Award size={20} />
                  {codewarsData.honor.toLocaleString()}
                </CodewarsStatValue>
                <CodewarsStatLabel>Honor Points</CodewarsStatLabel>
              </CodewarsStat>
              <CodewarsStat>
                <CodewarsStatValue>
                  <Code size={20} />
                  {codewarsData.codeChallenges.totalCompleted}
                </CodewarsStatValue>
                <CodewarsStatLabel>Completed Kata</CodewarsStatLabel>
              </CodewarsStat>
            </CodewarsStats>
            <div style={{ textAlign: 'center' }}>
              <CodewarsLink
                href={`https://www.codewars.com/users/${codewars.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Trophy size={16} />
                View Profile on Codewars
              </CodewarsLink>
            </div>
          </SkillSection>
        )}

        {/* Personal Skills */}
        {personal && personal.length > 0 && (
          <SkillSection variants={itemVariants}>
            <SectionHeader>
              <SectionIcon $color="#8b5cf6">
                <Lightbulb size={24} />
              </SectionIcon>
              <SectionTitle>Soft Skills</SectionTitle>
            </SectionHeader>
            <PersonalSkillsGrid>
              {personal.map((skill, index) => (
                <PersonalSkillCard key={index}>{skill}</PersonalSkillCard>
              ))}
            </PersonalSkillsGrid>
          </SkillSection>
        )}
      </SkillsGrid>
    </SkillsContainer>
  );
});

Skills.displayName = 'Skills';

export default Skills;
