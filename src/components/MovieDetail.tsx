import { useScroll } from "framer-motion";
import React from "react";
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
        style={{ top: scrollY.get() + 50 }}
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
