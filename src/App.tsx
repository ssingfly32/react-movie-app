import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyle from './style';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Outlet />
    </ThemeProvider>
  );
}
