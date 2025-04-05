import { getPopular, IGetMoviesResult } from "../api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  const { isLoading, data: datas } = useQuery<IGetMoviesResult>(
    ["popular"],
    getPopular
  );
  const navigate = useNavigate();
  console.log(datas);
  return (
    <HomeContainer>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <MovieGrid>
          {datas?.results.map((movie, index) => (
            <MovieCard
              key={`popular_${movie.id}`}
              custom={index} // 커스텀 값 전달
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.1, ease: "easeInOut" }, // Hover 상태에서는 빠르게 커짐
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1, ease: "easeInOut" }, // Tap 상태에서는 빠르게 축소됨
              }}
            >
              <MoviePoster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.original_title}
              />
              <MovieInfo>
                <MovieTitle>{movie.title || movie.original_title}</MovieTitle>
              </MovieInfo>
            </MovieCard>
          ))}
        </MovieGrid>
      )}
    </HomeContainer>
  );
}

const cardVariants = {
  hidden: { scale: 0 },
  visible: (i: number) => ({
    scale: 1,
    transition: {
      delay: i * 0.2, // 순차적으로 나타나는 딜레이 설정
      duration: 0.2,
      ease: "easeInOut",
    },
  }),
};

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 전체 컨테이너
const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 80px; /* 헤더 높이만큼 추가 간격 */
`;

// 영화 목록 그리드
const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MovieCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
`;

const MoviePoster = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3; // 이미지만 비율 유지
  object-fit: cover;
  border-radius: 16px 16px 0 0; // 상단 모서리만 둥글게
`;

const MovieInfo = styled.div`
  padding: 16px;
  background-color: #1a1a1a; // 어두운 배경색
`;

const MovieTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-align: center;
`;
