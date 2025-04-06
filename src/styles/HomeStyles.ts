import { motion } from "framer-motion";
import styled from "styled-components";

// 전체 컨테이너
export const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 80px; /* 헤더 높이만큼 추가 간격 */
`;

// 영화 목록 그리드
export const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
  :first-child {
    padding-left: 40px;
  }
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.overlay};
  z-index: 100;
  backdrop-filter: blur(2px);
`;
