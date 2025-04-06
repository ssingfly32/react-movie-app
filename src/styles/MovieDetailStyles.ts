import { motion } from "framer-motion";
import styled from "styled-components";

export const BigMovie = styled(motion.div)`
  position: absolute;
  width: 50vw;
  max-width: 900px;
  min-width: 320px;
  height: 80vh; /* 고정된 높이 */
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.background};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 101;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 90vw;
    height: 85vh;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 102;
  transition: all 0.2s ease;

  &:hover {
    background-color: #555555;
    transform: scale(1.1);
  }
`;

export const BigCover = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center center;
  position: relative;
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const CoverOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(20, 20, 20, 0) 0%,
    rgba(20, 20, 20, 0.7) 80%,
    rgba(20, 20, 20, 1) 100%
  );
`;

export const BigContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const HeaderInfo = styled.div`
  padding: 20px 30px 0;
  flex-shrink: 0;
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
`;

export const BigTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: ${(props) => props.theme.movieTitle};

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const ReleaseDate = styled.p`
  font-size: 16px;
  color: #aaa;
  margin: 0;
`;

export const Rating = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  margin: 0;
`;

export const ScrollableContent = styled.div`
  padding: 0 30px 20px;
  overflow-y: auto;
  flex: 1;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.scrollbarTrack};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollbarThumb};
    border-radius: 3px;
  }
`;

export const BigOverview = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${(props) => props.theme.infoTextColor};
  margin: 0 0 20px 0;
`;

export const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

export const GenreTag = styled.span`
  background-color: ${(props) => props.theme.genreTagBackground};
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 14px;
  color: ${(props) => props.theme.infoTextColor};
`;

export const AdditionalInfo = styled.div`
  margin-bottom: 16px;
`;

export const InfoTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.infoTitleColor};
  margin: 0 0 4px 0;
`;

export const InfoText = styled.p`
  font-size: 15px;
  color: ${(props) => props.theme.infoTextColor};
  margin: 0;
`;

export const InfoLink = styled.a`
  color: ${(props) => props.theme.infoTextColor};
  text-decoration: none;
  cursor: pointer;
`;

export const Spacing = styled.div`
  height: 20px;
`;
