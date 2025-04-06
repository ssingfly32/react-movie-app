import { useMatch } from "react-router-dom";

export function useRouteMatches() {
  const homeMatch = useMatch("/");
  const populaMovierMatch = useMatch("/popular/:movieId");
  const comingSoonMatch = useMatch("/coming-soon");
  const comingSoonMovieMatch = useMatch("/coming-soon/:movieId");
  const nowPlayingMatch = useMatch("/now-playing");
  const nowPlayingMovieMatch = useMatch("/now-playing/:movieId");

  return {
    isHomeActive: Boolean(homeMatch || populaMovierMatch),
    isComingSoonActive: Boolean(comingSoonMatch || comingSoonMovieMatch),
    isNowPlayingActive: Boolean(nowPlayingMatch || nowPlayingMovieMatch),
  };
}
