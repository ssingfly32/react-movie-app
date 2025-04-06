import React, { useState } from "react";
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
  const [delay, setDelay] = useState(0);
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
      onAnimationComplete={() => setDelay(0.2)}
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
