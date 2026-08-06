import { makeStyles } from "tss-react/mui";

export const useSlider = makeStyles()((theme) => ({
  sliderContainer: {
    position: "relative",
    width: "50vw",
    margin: "0 20px",
    display: "grid",
    gridTemplateColumns: "50px 1fr",
    "& .MuiSlider-root": {
      padding: 0,
      margin: 0,
    },
  },
  slider: {
    position: "relative",
    "& .MuiSlider-rail": {
      opacity: 1,
      height: 40,
      width: "100%",
      top: 0,
      transform: "none",
      backgroundColor: theme.palette.background.paper,
    },

    "& .MuiSlider-track": {
      height: 4,
      top: 0,
      transform: "none",
      backgroundColor: theme.palette.primary.contrastText,
      border: "none",
      zIndex: 2,
    },
    "& .MuiSlider-thumb": {
      height: 40,
      width: 3,
      top: 0,
      transform: "translateX(-50%)",
      backgroundColor: theme.palette.primary.contrastText,
      borderRadius: 0,
      zIndex: 3,
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "none",
      },
      "&::after": { display: "none" },
      "&::before": {
        content: '""',
        position: "absolute",
        top: -12,
        left: "50%",
        transform: "translateX(-50%)",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderTop: `10px solid ${theme.palette.primary.main}`,
        backgroundColor: "transparent",
        boxShadow: "none",
      },
    },
    "& .MuiSlider-mark": {
      display: "none",
    },
    "& .MuiSlider-markLabel": {
      position: "absolute",

      top: 5,
      height: 35,
      width: "10%",
      transform: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.text.primary,
      fontSize: "0.7rem",
      borderRight: `1px solid ${theme.palette.text.secondary}`,
      boxSizing: "border-box",
      '&[data-index="9"]': {
        borderRight: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      backgroundColor: theme.palette.primary.main,
      boxShadow: "0 0 4px #000",
      width: "auto",
      "&::before": {
        display: "none",
      },
    },
  },
}));
