import { useRouteMatches } from "../hooks/useRouteMatches";
import { useHeaderAnimation } from "../hooks/useHeaderAnimation";
import {
  Circle,
  ColCenter,
  ColLeft,
  ColRight,
  Item,
  Items,
  Nav,
  ToggleButton,
} from "../styles/HeaderStyles";
import { Link } from "react-router-dom";
interface IHeaderProps {
  isDark: boolean;
  toggleDark: () => void;
}
export default function Header({ isDark, toggleDark }: IHeaderProps) {
  const { isHomeActive, isComingSoonActive, isNowPlayingActive } =
    useRouteMatches();
  const { navAnimation, navVariants } = useHeaderAnimation(isDark);

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <ColLeft></ColLeft>
      <ColCenter>
        <Items>
          <Item>
            <Link to={`/`}>
              POPULAR {isHomeActive && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to={`/coming-soon`}>
              COMING SOON {isComingSoonActive && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to={`/now-playing`}>
              NOW PLAYING {isNowPlayingActive && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </ColCenter>
      <ColRight>
        <ToggleButton onClick={toggleDark}>{isDark ? "🌙" : "☀️"}</ToggleButton>
      </ColRight>
    </Nav>
  );
}
