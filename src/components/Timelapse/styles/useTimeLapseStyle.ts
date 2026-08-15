import { makeStyles } from "tss-react/mui";

export const useTimeLapseStyle = makeStyles()((theme) => ({
  panelTitle: {
    textTransform: "capitalize",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  timeLapseContainer: {
    border: `2px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(2),
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
  },
}));
