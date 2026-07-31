import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  "tools__draw-button": {
    display: "flex !important",
    width: "100% !important",
    alignItems: "center",
    minWidth: "auto",
    padding: `${theme.spacing(2.5)} !important`,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
    "& svg": {
      fill: theme.palette.primary.contrastText,
    },
  },
}));
