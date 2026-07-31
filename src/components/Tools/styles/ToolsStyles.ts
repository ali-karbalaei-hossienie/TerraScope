import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  "toggle-button-group": {
    display: "flex !important",
    flexDirection: "column",
    width: "100% !important",
    alignItems: "center",
    minWidth: "auto",
    padding: `${theme.spacing(2.5)} !important`,
    "& svg": {
      fill: theme.palette.primary.contrastText,
    },
  },
  "draw-button": {
    borderBottom: `1px solid ${theme.palette.primary.contrastText} !important`,
    margin: "0 !important",
    width: "50px !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "center",
    padding: "20px !important",
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
    "&.Mui-selected": {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
  },
}));
