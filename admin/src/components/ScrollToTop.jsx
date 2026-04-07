import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const scrollToTop = () => {
      const mainScroller = document.getElementById("admin-scroll-container");

      if (mainScroller) {
        mainScroller.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    scrollToTop();

    const frameId = window.requestAnimationFrame(scrollToTop);

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
