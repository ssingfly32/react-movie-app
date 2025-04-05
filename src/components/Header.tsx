import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect } from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const homeMatch = useMatch("/");
  const popularMatch = useMatch("/popular/:movieId");
  const comingSoonMatch = useMatch("/coming-soon");
  const nowPlayingMatch = useMatch("/now-playing");
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();

  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Items>
          <Item>
            <Link to="/">
              POPULAR{" "}
              {(homeMatch || popularMatch) && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/coming-soon">
              COMING SOON {comingSoonMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/now-playing">
              NOW PLAYING {nowPlayingMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
    </Nav>
  );
}

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    zIndex: 999,
  },
};

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;
