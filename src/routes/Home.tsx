import { AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useMovies } from "../hooks/useMovie";
import { HomeContainer, Loader, MovieGrid } from "../styles/HomeStyles";
import MovieCard from "../components/MovieCard";
import MovieDetail from "../components/MovieDetail";

export default function Home() {
  const { isLoading, movies, category } = useMovies();
  const navigate = useNavigate();

  const bigMovieMatch = useMatch(`/${category}/:movieId`);

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    movies.find((movie) => movie.id === Number(bigMovieMatch.params.movieId));

  const handleCardClick = (movieId: number) => {
    navigate(`/${category}/${movieId}`);
  };

  const handleDetailClose = () => {
    navigate(`${category === "popular" ? "/" : "/" + category}`);
  };

  return (
    <HomeContainer>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MovieGrid>
            <AnimatePresence>
              {movies.map((movie, index) => (
                <MovieCard
                  key={`${category}_${movie.id}`}
                  id={movie.id}
                  title={movie.title || movie.original_title}
                  posterPath={movie.poster_path}
                  index={index}
                  onCardClick={handleCardClick}
                />
              ))}
            </AnimatePresence>
          </MovieGrid>

          <AnimatePresence>
            {bigMovieMatch && clickedMovie && (
              <MovieDetail
                movieId={bigMovieMatch.params.movieId!}
                movie={clickedMovie}
                onClose={handleDetailClose}
                category={category}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </HomeContainer>
  );
}
