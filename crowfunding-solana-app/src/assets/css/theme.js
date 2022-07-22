import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#89D87A',
      light: '#B9DF79',
      dark: '#62BF7B',
      contrastText: '#16202A',
    },
    secondary: {
      main: '#89D87A',
      light: '#B9DF79',
      dark: '#62BF7B',
      contrastText: '#16202A',
    },
    text: {
      primary: '#F3EDE6',
      secondary: '#848688',
      disabled: '#84868880',
      icon: '#F3EDE6',
    },
    divider: '#848688',
    background: {
      paper: '#1F2732',
      default: '#16202A',
    }
  },
  typography: {
    fontFamily: [
      'Jost',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 14,
    h1: {
      fontSize: '2em',
      fontWeight: 800,
    },
    h2: {
      fontSize: '1.75em',
      fontWeight: 800,
    },
    h3: {
      fontSize: '1.5em',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25em',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1em',
      fontWeight: 600,
    },
    subtitle1: { fontSize: 14, },
    subtitle2: { fontSize: 12, },
  },
});