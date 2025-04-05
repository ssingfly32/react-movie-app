const BASE_URL = "https://movies-api.nomadcoders.workers.dev";

interface IMovie {
  backdrop_path: string;
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  id: number;
  release_date: string;
  vote_average: number;
}

export interface IGetMoviesResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieData {
  budget: number;
  revenue: number;
  genres: { id: number; name: string }[];
  runtime: number;
  homepage: string;
}

export function getPopular() {
  return fetch(`${BASE_URL}/popular`).then((r) => r.json());
}

export function getNowPlaying() {
  return fetch(`${BASE_URL}/now-playing`).then((r) => r.json());
}

export function getComingSoon() {
  return fetch(`${BASE_URL}/coming-soon`).then((r) => r.json());
}

export function getMovie(id: number) {
  return fetch(`${BASE_URL}/movie?id=${id}`).then((r) => r.json());
}

export function makeImagePath(image: string, size?: string) {
  return `https://image.tmdb.org/t/p/${size ? size : "w500"}${image}`;
}

export function makeBgPath(image: string) {
  return `https://image.tmdb.org/t/p/original${image}`;
}
