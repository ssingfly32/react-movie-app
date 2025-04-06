import { useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { makeImagePath } from "../api";
import { useMovieDetail } from "../hooks/useMovie";
import {
  AdditionalInfo,
  BigContent,
  BigCover,
  BigMovie,
  BigOverview,
  BigTitle,
  CloseButton,
  CoverOverlay,
  GenreList,
  GenreTag,
  HeaderInfo,
  InfoLink,
  InfoText,
  InfoTitle,
  MetaInfo,
  Rating,
  ReleaseDate,
  ScrollableContent,
  Spacing,
} from "../styles/MovieDetailStyles";
import { Overlay } from "../styles/HomeStyles";

interface MovieDetailProps {
  movieId: string;
  movie: any; // 기본 영화 정보
  onClose: () => void;
  category: string;
}

const MovieDetail: React.FC<MovieDetailProps> = ({
  movieId,
  movie,
  onClose,
}) => {
  const { movieDetail, isDetailLoading } = useMovieDetail(movieId);
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
    <>
      <Overlay
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <BigMovie
        style={{ top: currentScrollY + 50 }}
        layoutId={movieId}
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <CloseButton onClick={onClose}>✕</CloseButton>
        <BigCover
          style={{
            backgroundImage: `url(${makeImagePath(
              movie.backdrop_path,
              "original"
            )})`,
          }}
        >
          <CoverOverlay />
        </BigCover>

        <BigContent>
          <HeaderInfo>
            <BigTitle>{movie.title}</BigTitle>
            <MetaInfo>
              {movie.release_date && (
                <ReleaseDate>
                  Released: {new Date(movie.release_date).toLocaleDateString()}
                </ReleaseDate>
              )}
              {movie.vote_average > 0 && (
                <Rating>★ {movie.vote_average.toFixed(1)}/10</Rating>
              )}
            </MetaInfo>
          </HeaderInfo>

          <ScrollableContent>
            <BigOverview>{movie.overview}</BigOverview>
            {!isDetailLoading && movieDetail && (
              <>
                {movieDetail.genres && (
                  <GenreList>
                    {movieDetail.genres.map((genre) => (
                      <GenreTag key={genre.id}>{genre.name}</GenreTag>
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
      </BigMovie>
    </>
  );
};

export default MovieDetail;
