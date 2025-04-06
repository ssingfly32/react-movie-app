import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import GlobalStyle from "./styles/style";
import { useState } from "react";

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleDark = () => setIsDark((current) => !current);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Header isDark={isDark} toggleDark={toggleDark} />
      <Outlet />
    </ThemeProvider>
  );
}
