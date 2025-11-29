import { Skeleton, SkeletonText } from '@components/ui/Skeleton';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Section = styled.div`
  margin-bottom: 4rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;
`;

const BarGraphGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Bar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Tags = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
`;

export const SkillsSkeleton = () => (
  <Container>
    <Header>
      <Skeleton $width="250px" $height="3rem" style={{ margin: '0 auto 1rem' }} />
      <Skeleton $width="450px" $height="1.5rem" style={{ margin: '0 auto' }} />
    </Header>

    {/* Technical Skills - Bar Graph */}
    <Section>
      <SectionHeader>
        <Skeleton $width="200px" $height="2rem" style={{ marginBottom: '0.5rem' }} />
        <SkeletonText $width="350px" />
      </SectionHeader>
      <BarGraphGrid>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Bar key={i}>
            <Skeleton $width="80px" $height={`${100 + i * 20}px`} />
            <Skeleton $width="60px" $height="1rem" />
          </Bar>
        ))}
      </BarGraphGrid>
    </Section>

    {/* Languages */}
    <Section>
      <SectionHeader>
        <Skeleton $width="150px" $height="2rem" style={{ marginBottom: '0.5rem' }} />
      </SectionHeader>
      <Tags>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} $width="100px" $height="2.5rem" $radius="2rem" />
        ))}
      </Tags>
    </Section>

    {/* Tools */}
    <Section>
      <SectionHeader>
        <Skeleton $width="200px" $height="2rem" style={{ marginBottom: '0.5rem' }} />
      </SectionHeader>
      <CardsGrid>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <Skeleton $width="40px" $height="40px" style={{ marginBottom: '1rem' }} />
            <Skeleton $width="70%" $height="1.5rem" />
          </Card>
        ))}
      </CardsGrid>
    </Section>

    {/* Soft Skills */}
    <Section>
      <SectionHeader>
        <Skeleton $width="150px" $height="2rem" style={{ marginBottom: '0.5rem' }} />
      </SectionHeader>
      <Tags>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} $width="120px" $height="2.5rem" $radius="2rem" />
        ))}
      </Tags>
    </Section>
  </Container>
);
