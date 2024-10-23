import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export function useBreakpoint() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const xs = useMediaQuery('(min-width: 440px)');
  const sm = useMediaQuery('(min-width: 640px)');
  const md = useMediaQuery('(min-width: 768px)');
  const lg = useMediaQuery('(min-width: 1024px)');
  const xl = useMediaQuery('(min-width: 1280px)');

  return isClient ? { xs, sm, md, lg, xl } : { xs: false, sm: false, md: false, lg: false, xl: false };
}

