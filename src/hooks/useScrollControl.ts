import { useEffect } from "react";

export default function useScrollControl(bigMovieMatch: boolean) {
  useEffect(() => {
    if (bigMovieMatch) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [bigMovieMatch]);
}
