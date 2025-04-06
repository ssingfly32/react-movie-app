import React from "react";
import {
  MovieCardContainer,
  MovieInfo,
  MoviePoster,
  MovieTitle,
} from "../styles/MovieCardStyles";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  index: number;
  onCardClick: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterPath,
  index,
  onCardClick,
}) => {
  const cardVariants = {
    hidden: { scale: 0 },
    visible: (i: number) => ({
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.2,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <MovieCardContainer
      key={id}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{
        scale: 1.1,
        transition: {
          duration: 0.1,
          ease: "easeInOut",
          delay: 0.2,
        },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1, ease: "easeInOut" },
      }}
      onClick={() => onCardClick(id)}
    >
      <MoviePoster
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
      />
      <MovieInfo>
        <MovieTitle>{title}</MovieTitle>
      </MovieInfo>
    </MovieCardContainer>
  );
};

export default MovieCard;
