// pages/_app.tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../styles/theme'; // Import your custom theme
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
