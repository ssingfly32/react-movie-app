import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export function useMovieModal() {
  const { scrollY } = useScroll();

  // 현재 스크롤 위치를 저장할 상태 추가
  const [currentScrollY, setCurrentScrollY] = useState(0);

  // 컴포넌트가 마운트될 때와 scrollY가 변경될 때마다 현재 스크롤 위치 업데이트
  useEffect(() => {
    // 초기 스크롤 위치 설정
    setCurrentScrollY(scrollY.get());

    // scrollY 변화 감지하여 상태 업데이트
    const unsubscribe = scrollY.on("change", (value) => {
      setCurrentScrollY(value);
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, [scrollY]);

  return currentScrollY;
}
