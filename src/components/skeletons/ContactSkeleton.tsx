import { Skeleton } from '@components/ui/Skeleton';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

export const ContactSkeleton = () => (
  <Container>
    <Header>
      <Skeleton $width="250px" $height="3rem" style={{ margin: '0 auto 1rem' }} />
      <Skeleton $width="450px" $height="1.5rem" style={{ margin: '0 auto' }} />
    </Header>

    <Section>
      <SectionHeader>
        <Skeleton $width="150px" $height="1.5rem" />
      </SectionHeader>
      <Links>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} $width="150px" $height="2.5rem" $radius="0.5rem" />
        ))}
      </Links>
    </Section>

    <Section>
      <SectionHeader>
        <Skeleton $width="200px" $height="1.5rem" />
      </SectionHeader>
      <FormGroup>
        <Skeleton $width="100px" $height="1rem" style={{ marginBottom: '0.5rem' }} />
        <Skeleton $width="100%" $height="2.5rem" />
      </FormGroup>
      <FormGroup>
        <Skeleton $width="80px" $height="1rem" style={{ marginBottom: '0.5rem' }} />
        <Skeleton $width="100%" $height="2.5rem" />
      </FormGroup>
      <FormGroup>
        <Skeleton $width="90px" $height="1rem" style={{ marginBottom: '0.5rem' }} />
        <Skeleton $width="100%" $height="8rem" />
      </FormGroup>
      <Skeleton $width="150px" $height="2.5rem" />
    </Section>
  </Container>
);
