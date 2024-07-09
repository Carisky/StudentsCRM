import { createTheme } from '@mui/material/styles';

// Define a light and a dark theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // Define your light theme palette here
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // Define your dark theme palette here
  },
});
