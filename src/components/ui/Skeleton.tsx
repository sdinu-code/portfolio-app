import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const Skeleton = styled.div<{ $width?: string; $height?: string; $radius?: string }>`
  display: inline-block;
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '1rem'};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent} 0%,
    ${({ theme }) => theme.colors.border} 50%,
    ${({ theme }) => theme.colors.accent} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: ${({ $radius }) => $radius || '0.5rem'};
`;

export const SkeletonCircle = styled(Skeleton)`
  border-radius: 50%;
`;

export const SkeletonText = styled(Skeleton)`
  height: 1rem;
  margin-bottom: 0.5rem;
`;
