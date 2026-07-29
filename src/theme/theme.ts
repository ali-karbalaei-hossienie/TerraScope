import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e5a913",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffe3a1",
    },
    background: {
      default: "#1a1a1a",
      paper: "#2d2d2d",
    },
    error: {
      main: "#9d0300",
    },
    success: {
      main: "#00b300",
    },

    text: {
      primary: "#ececec",
      secondary: "#fff3e1",
    },
  },
  typography: {
    fontFamily: "Vazirmatn, Arial, sans-serif",
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: "none !important",
          textTransform: "none",
          "&:hover": {
            backgroundColor: `${theme.palette.primary.main} !important`,
          },
        }),
      },
    },
  },
});
