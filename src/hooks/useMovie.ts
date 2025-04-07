import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import {
  getComingSoon,
  getMovie,
  getNowPlaying,
  getPopular,
  IGetMoviesResult,
  IMovieData,
} from "../api";

export function useMovies() {
  const location = useLocation();
  const category = location.pathname.split("/")[1] || "popular";

  const { isLoading, data } = useQuery<IGetMoviesResult>([category], () => {
    if (category === "popular") {
      return getPopular();
    } else if (category === "coming-soon") {
      return getComingSoon();
    } else if (category === "now-playing") {
      return getNowPlaying();
    }
    return getPopular(); // 기본값으로 인기 영화 데이터
  });

  return {
    isLoading,
    movies: data?.results || [],
    category,
  };
}

export function useMovieDetail(movieId: string | null) {
  const { data, isLoading } = useQuery<IMovieData>(
    ["movieDetail", movieId],
    () => getMovie(Number(movieId)),
    {
      enabled: !!movieId, // movieId가 존재할 때만 요청함
    }
  );

  return {
    movieDetail: data,
    isDetailLoading: isLoading,
  };
}
