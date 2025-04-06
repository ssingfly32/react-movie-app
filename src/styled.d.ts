import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    text: string;
    accent: string;
    cardBackground: string;
    overlay: string;
    modalBackground: string;
    hoverEffect: string;
    movieTitle: string;
    genreTagBackground: string;
    infoTextColor: string;
    infoTitleColor: string;
    scrollbarTrack: string;
    scrollbarThumb: string;
  }
}
