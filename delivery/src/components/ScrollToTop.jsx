import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top whenever the route changes
    window.scrollTo({
      top: 0,
      behavior: "smooth", // you can use "auto" for instant scroll
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
