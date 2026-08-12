import { makeStyles } from "tss-react/mui";

export const usePlayerStyles = makeStyles()((theme) => ({
  player: {
    backgroundColor: `${theme.palette.primary.dark} !important`,
    borderRadius: "100% !important",
    "&:hover": {
      backgroundColor: `${theme.palette.primary.dark} !important`,
    },
  },
}));
