import {
  getComingSoon,
  getMovie,
  getNowPlaying,
  getPopular,
  IGetMoviesResult,
  IMovieData,
  makeImagePath,
} from "../api";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import {
  useLocation,
  useMatch,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  useSearchParams;
  const [delay, setDelay] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const location = useLocation();
  const path = location.pathname;
  const { isLoading, data: datas } = useQuery<IGetMoviesResult>([path], () => {
    if (path === "/popular") {
      return getPopular();
    } else if (path === "/coming-soon") {
      return getComingSoon();
    } else if (path === "/now-playing") {
      return getNowPlaying();
    }
    return getPopular(); // 기본값으로 인기 영화 데이터
  });

  const { data: movieDetail, isLoading: isDetailLoading } =
    useQuery<IMovieData>(
      ["movieDetail", selectedId],
      () => getMovie(Number(selectedId!)),
      {
        enabled: !!selectedId, // selectedId가 존재할 때만 요청함
      }
    );
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number) => {
    navigate(`/popular/${movieId}`);
    setSelectedId(`${movieId}`);
  };
  const bigMovieMatch = useMatch("/popular/:movieId");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    datas?.results.find(
      (movie) => movie.id === Number(bigMovieMatch.params.movieId)
    );
  console.log(clickedMovie);
  const onOverlayClick = () => navigate(-1);
  const { scrollY } = useScroll();
  // console.log(datas);

  const cardVariants = {
    hidden: { scale: 0 },
    visible: (i: number) => {
      const realDelay = delay === 0 ? i * 0.2 : delay;

      return {
        scale: 1,
        transition: {
          delay: realDelay,
          duration: 0.2,
          ease: "easeInOut",
        },
      };
    },
  };

  // 모달 애니메이션 변수
  const modalVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  return (
    <HomeContainer>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MovieGrid>
            <AnimatePresence>
              {datas?.results.map((movie, index) => (
                <MovieCard
                  key={`popular_${movie.id}`}
                  custom={index} // 커스텀 값 전달
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.1,
                      ease: "easeInOut",
                      delay: 0.2,
                    }, // Hover 상태에서는 빠르게 커짐
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1, ease: "easeInOut" }, // Tap 상태에서는 빠르게 축소됨
                  }}
                  onAnimationComplete={() => setDelay(0.2)}
                  onClick={() => onBoxClicked(movie.id)}
                >
                  <MoviePoster
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.original_title}
                  />
                  <MovieInfo>
                    <MovieTitle>
                      {movie.title || movie.original_title}
                    </MovieTitle>
                  </MovieInfo>
                </MovieCard>
              ))}
            </AnimatePresence>
          </MovieGrid>

          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 50 }}
                  layoutId={bigMovieMatch.params.movieId}
                  variants={modalVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {clickedMovie && (
                    <>
                      <CloseButton onClick={onOverlayClick}>✕</CloseButton>
                      <BigCover
                        style={{
                          backgroundImage: `url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "original" // 원본 크기 이미지 사용
                          )})`,
                        }}
                      >
                        <CoverOverlay />
                      </BigCover>

                      <BigContent>
                        <HeaderInfo>
                          <BigTitle>{clickedMovie.title}</BigTitle>
                          <MetaInfo>
                            {clickedMovie.release_date && (
                              <ReleaseDate>
                                Released:{" "}
                                {new Date(
                                  clickedMovie.release_date
                                ).toLocaleDateString()}
                              </ReleaseDate>
                            )}
                            {clickedMovie.vote_average > 0 && (
                              <Rating>
                                ★ {clickedMovie.vote_average.toFixed(1)}/10
                              </Rating>
                            )}
                          </MetaInfo>
                        </HeaderInfo>

                        <ScrollableContent>
                          <BigOverview>{clickedMovie.overview}</BigOverview>
                          {!isDetailLoading && movieDetail && (
                            <>
                              {movieDetail.genres && (
                                <GenreList>
                                  {movieDetail.genres.map((genre) => (
                                    <GenreTag key={genre.id}>
                                      {genre.name}
                                    </GenreTag>
                                  ))}
                                </GenreList>
                              )}
                              <AdditionalInfo>
                                <InfoTitle>Budget</InfoTitle>
                                <InfoText>
                                  {movieDetail.budget > 0
                                    ? `$${movieDetail.budget.toLocaleString()}`
                                    : "none"}
                                </InfoText>
                              </AdditionalInfo>
                              <AdditionalInfo>
                                <InfoTitle>Revenue</InfoTitle>
                                <InfoText>
                                  {movieDetail.revenue > 0
                                    ? `$${movieDetail.revenue.toLocaleString()}`
                                    : "none"}
                                </InfoText>
                              </AdditionalInfo>
                              <AdditionalInfo>
                                <InfoTitle>Runtime</InfoTitle>
                                <InfoText>
                                  {movieDetail.runtime
                                    ? `${movieDetail.runtime} minutes`
                                    : "none"}
                                </InfoText>
                              </AdditionalInfo>
                              <AdditionalInfo>
                                <InfoTitle>Homepage</InfoTitle>
                                {movieDetail.homepage ? (
                                  <InfoLink
                                    href={movieDetail.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {movieDetail.homepage}
                                  </InfoLink>
                                ) : (
                                  <InfoText>none</InfoText>
                                )}
                              </AdditionalInfo>
                            </>
                          )}
                          <Spacing />
                        </ScrollableContent>
                      </BigContent>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </HomeContainer>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  backdrop-filter: blur(2px);
`;

const BigMovie = styled(motion.div)`
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
  background-color: #141414;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 101;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 90vw;
    height: 85vh;
  }
`;

const CloseButton = styled.button`
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
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const BigCover = styled.div`
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

const CoverOverlay = styled.div`
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

const BigContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const HeaderInfo = styled.div`
  padding: 20px 30px 0;
  flex-shrink: 0;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
`;

const BigTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: white;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ReleaseDate = styled.p`
  font-size: 16px;
  color: #aaa;
  margin: 0;
`;

const Rating = styled.div`
  font-size: 16px;
  color: #ffd700;
  font-weight: 600;
  margin: 0;
`;

const ScrollableContent = styled.div`
  padding: 0 30px 20px;
  overflow-y: auto;
  flex: 1;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

const BigOverview = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #ddd;
  margin: 0 0 20px 0;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const GenreTag = styled.span`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 14px;
  color: #ddd;
`;

const AdditionalInfo = styled.div`
  margin-bottom: 16px;
`;

const InfoTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #aaa;
  margin: 0 0 4px 0;
`;

const InfoText = styled.p`
  font-size: 15px;
  color: #ddd;
  margin: 0;
`;

const InfoLink = styled.a`
  color: #ddd;
  text-decoration: none;
  cursor: pointer;
`;

const Spacing = styled.div`
  height: 20px;
`;

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
