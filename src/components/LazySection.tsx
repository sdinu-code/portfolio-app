import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
}

/**
 * LazySection component that only renders its children when the section comes into view.
 * Uses IntersectionObserver to detect when the section is approaching the viewport.
 * If URL has a hash, all sections load immediately to ensure proper scroll positioning.
 */
export const LazySection = ({ children, fallback = null, rootMargin = '400px' }: LazySectionProps) => {
  // If there's a hash in URL, load immediately to ensure scroll target exists
  const hasHash = typeof window !== 'undefined' && window.location.hash.length > 1;
  const [isInView, setIsInView] = useState(hasHash);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin, // Load content when section is 400px away from viewport
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isInView, rootMargin]);

  return <div ref={sectionRef} style={{ width: '100%' }}>{isInView ? children : fallback}</div>;
};
