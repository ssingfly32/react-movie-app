import { useMatch } from "react-router-dom";

export function useRouteMatches() {
  const homeMatch = useMatch("/");
  const popularMovierMatch = useMatch("/popular/:movieId");
  const comingSoonMatch = useMatch({ path: "/coming-soon/*" });
  const nowPlayingMatch = useMatch({ path: "/now-playing/*" });

  return {
    isHomeActive: Boolean(homeMatch || popularMovierMatch),
    isComingSoonActive: Boolean(comingSoonMatch),
    isNowPlayingActive: Boolean(nowPlayingMatch),
  };
}
