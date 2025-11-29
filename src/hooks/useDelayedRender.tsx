import { Loader } from '@components/Loader/Loader';
import { JSX, useEffect, useState } from 'react';

const useDelayedRender = (Component: JSX.Element, ms: number = 300) => {
  const [isPageRendered, setIsPageRendered] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsPageRendered(true);
    }, ms);

    return () => {
      clearTimeout(delay);
    };
  }, [ms]);

  return isPageRendered ? Component : <Loader />;
};

export default useDelayedRender;
