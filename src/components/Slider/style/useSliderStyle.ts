import { makeStyles } from "tss-react/mui";

export const useSliderStyle = makeStyles()((theme) => ({
  sliderContainer: {
    position: "relative",
    width: "50vw",
    margin: "0 10px",
    display: "flex",
    gap: 8,
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
      width: "50vw",
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
      height: "40px",
      top: 0,
      transform: "none",
      width: 1,
      backgroundColor: theme.palette.divider,
      "&.MuiSlider-mark[style*='left: 0%']": {
        backgroundColor: "transparent",
      },
    },
    "& .MuiSlider-markLabel": {
      position: "absolute",
      marginLeft: "16px",
      top: 5,
      height: 35,
      transform: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.text.primary,
      fontSize: "0.7rem",
      boxSizing: "border-box",
    },
    "& .MuiSlider-valueLabel": {
      backgroundColor: theme.palette.primary.main,
      boxShadow: "0 0 4px #000",
      width: "auto",
      transform: "translateY(-100%) scale(1)",
      "&::before": {
        display: "none",
      },
    },
  },
}));
