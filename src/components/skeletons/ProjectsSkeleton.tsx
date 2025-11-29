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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
`;

const CardHeader = styled.div`
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

export const ProjectsSkeleton = () => (
  <Container>
    <Header>
      <Skeleton $width="300px" $height="3rem" style={{ margin: '0 auto 1rem' }} />
      <Skeleton $width="500px" $height="1.5rem" style={{ margin: '0 auto' }} />
    </Header>
    <Grid>
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <Skeleton $width="100%" $height="200px" $radius="0.5rem" style={{ marginBottom: '1.5rem' }} />
          <CardHeader>
            <Skeleton $width="70%" $height="2rem" style={{ marginBottom: '0.5rem' }} />
            <SkeletonText $width="100%" />
            <SkeletonText $width="90%" />
          </CardHeader>
          <CardContent>
            <SkeletonText $width="95%" />
            <SkeletonText $width="85%" />
          </CardContent>
          <Tags>
            <Skeleton $width="60px" $height="1.5rem" />
            <Skeleton $width="70px" $height="1.5rem" />
            <Skeleton $width="80px" $height="1.5rem" />
            <Skeleton $width="65px" $height="1.5rem" />
          </Tags>
        </Card>
      ))}
    </Grid>
  </Container>
);
