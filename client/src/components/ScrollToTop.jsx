import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Instantly scroll to the top of the page.
  }, [pathname]); // The effect depends on the pathname.


  return null;
}

export default ScrollToTop;
