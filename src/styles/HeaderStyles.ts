import { motion } from "framer-motion";
import styled from "styled-components";

export const Nav = styled(motion.nav)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: ${(props) => props.theme.text};
`;

export const ColLeft = styled.div`
  flex: 1;
`;

export const ColCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const ColRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.text};
  font-size: 18px;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

export const Items = styled.ul`
  display: flex;
  align-items: center;
`;

export const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.text};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.hoverEffect};
  }
`;

export const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #e51013;
`;
