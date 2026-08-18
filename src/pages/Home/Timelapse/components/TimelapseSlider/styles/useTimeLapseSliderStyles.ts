import { makeStyles } from "tss-react/mui";

export const useTimeLapseSliderStyles = makeStyles()((theme) => ({
  timeLapseSlider: {
    position: "relative",
    "& .MuiSlider-rail": {
      opacity: 1,
      height: 40,
      top: "17px",
      transform: "none",
      backgroundColor: theme.palette.background.default,
      padding: "16px",
    },
    "& .MuiSlider-track": {
      height: 1,
    },
    "& .MuiSlider-thumb": {
      height: 75,
      width: 3,
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
      height: 10,
      top: "74%",
      color: theme.palette.text.primary,
    },
    "& .MuiSlider-markLabel": {
      position: "absolute",
      marginLeft: "-10px",
      height: 35,
      transform: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.text.primary,
      fontSize: "0.7rem",
      boxSizing: "border-box",
      "&[data-index='0']": {
        marginLeft: "10px",
      },
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
  splitTimeLapsSlider: {
    "& .MuiSlider-thumb[data-index='0']": {
      top: "23%",
      transform: "translateY(-9px)",
      height: "91px",
      "&::after": { display: "none" },
      "&::before": {
        display: "none",
      },
      "& .MuiSlider-valueLabel": {
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0 0 4px #000",
        width: "20px",
        height: "20px",
        transform: "translateX(-10px)",

        borderRadius: "10px 0 0 10px",
        "& .MuiSlider-valueLabelLabel": {
          display: "none",
        },
      },
    },
    "& .MuiSlider-thumb[data-index='1']": {
      top: "23%",
      transform: "translateY(-9px)",
      height: "91px",
      "&::after": { display: "none" },
      "&::before": {
        display: "none",
      },
      "& .MuiSlider-valueLabel": {
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0 0 4px #000",
        width: "20px",
        height: "20px",
        transform: "translateX(10px)",

        borderRadius: "0 10px 10px 0",
        "& .MuiSlider-valueLabelLabel": {
          display: "none",
        },
      },
    },
  },
}));
