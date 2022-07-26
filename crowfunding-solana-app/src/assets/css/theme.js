import { createTheme } from '@mui/material/styles';

const commonFonts = [
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
].join(',');

const typography = {
  fontFamily: 'Nunito, ' + commonFonts,
  fontSize: 14,
  h1: {
    fontFamily: 'Poppins, Nunito, ' + commonFonts,
    fontSize: '3em',
    fontWeight: 700,
  },
  h2: {
    fontFamily: 'Poppins, Nunito, ' + commonFonts,
    fontSize: '2em',
    fontWeight: 700,
  },
  h3: {
    fontFamily: 'Poppins, Nunito, ' + commonFonts,
    fontSize: '1.5em',
    fontWeight: 700,
  },
  h4: {
    fontFamily: 'Poppins, Nunito, ' + commonFonts,
    fontSize: '1.25em',
    fontWeight: 700,
  },
  h5: {
    fontFamily: 'Poppins, Nunito, ' + commonFonts,
    fontSize: '1em',
    fontWeight: 700,
  },
  subtitle1: { fontSize: 14, },
  subtitle2: { fontSize: 12, },
  button: {
    fontWeight: 900,
  },
};

const shadows = {
  1: "0px 2px 4px 0px rgba(0,0,0,0.1), 0px -2px 2px 0px rgba(255,255,255,0.1)",
  2: "0px 8px 12px 0px rgba(0,0,0,0.1), 0px -4px 8px 0px rgba(255,255,255,0.1)",
}

const lightPalette = {
  mode: 'light',
  primary: {
    main: '#00C087',
    light: '#18ED98',
    dark: '#00B796',
    contrastText: '#2A2843',
  },
  secondary: {
    main: '#AA68FE',
    light: '#CC78FF',
    dark: '#875AE4',
    contrastText: '#EFF1F4',
  },
  text: {
    primary: '#4D4A75',
    secondary: '#4D4A75AA',
    disabled: '#A2AFC5',
    icon: '#4D4A75',
  },
  warning: {
    main: '#FFEC42',
    light: '#FFF842',
    dark: '#FFDD42',
    contrastText: '#2A2843',
  },
  success: {
    main: '#79F09A',
    light: '#88F890',
    dark: '#50E78B',
    contrastText: '#2A2843',
  },
  divider: '#4D4A7580',
  background: {
    // paper: '#EFF1F4',
    paper: '#F9F9FB',
    default: '#F9F9FB',
  }
}

const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#18ED98',
    light: '#64FAB2',
    dark: '#00C087',
    contrastText: '#2A2843',
  },
  secondary: {
    main: '#AA68FE',
    light: '#CC78FF',
    dark: '#875AE4',
    contrastText: '#EFF1F4',
  },
  text: {
    primary: '#D6DDE8',
    secondary: '#D6DDE8AA',
    disabled: '#697A95',
    icon: '#D6DDE8',
  },
  divider: '#D6DDE880',
  background: {
    // paper: '#2A2843',
    paper: '#1E1C35',
    default: '#1E1C35',
  }
}


export const theme = createTheme({
  palette: lightPalette,
  typography: typography,
  shadows: shadows,
});
export const darkTheme = createTheme({
  palette: darkPalette,
  typography: typography,
  shadows: shadows,
});