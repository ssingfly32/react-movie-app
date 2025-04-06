import { useAnimation, useScroll } from "framer-motion";
import { useEffect } from "react";

export function useHeaderAnimation(isDark: boolean) {
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();

  useEffect(() => {
    const updateNavAnimation = () => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    };

    scrollY.on("change", updateNavAnimation);

    updateNavAnimation();

    return () => {
      scrollY.clearListeners();
    };
  }, [scrollY, navAnimation]);

  useEffect(() => {
    if (scrollY.get() > 80) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  }, [scrollY, navAnimation, isDark]);

  const navVariants = {
    top: {
      backgroundColor: isDark ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 0)",
      boxShadow: "none",
    },
    scroll: {
      backgroundColor: isDark
        ? "rgba(0, 0, 0, 0.9)"
        : "rgba(255, 255, 255, 0.9)", // 약간의 투명도 추가
      boxShadow: isDark ? "none" : "0 2px 10px rgba(0, 0, 0, 0.1)",
      zIndex: 100,
    },
  };

  return { navAnimation, navVariants };
}
