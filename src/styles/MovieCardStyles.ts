import { motion } from "framer-motion";
import styled from "styled-components";

export const MovieCardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
`;

export const MoviePoster = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3; // 이미지만 비율 유지
  object-fit: cover;
  border-radius: 16px 16px 0 0; // 상단 모서리만 둥글게
`;

export const MovieInfo = styled.div`
  padding: 16px;
  background-color: ${(props) => props.theme.cardBackground};
`;

export const MovieTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.text};
  text-align: center;
`;
