import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  "map-button": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.contrastText,
    borderRadius: "16px !important",
    width: "45px",
    margin: "0 auto",
    overflow: "hidden",
  },
  "map-button__summary": {
    flexDirection: "column",
    backgroundColor: `${theme.palette.background.paper} !important`,
    minHeight: "100px !important",
    width: "100% !important",
    "& .MuiAccordionSummary-content": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: 0,
      gap: "8px",
    },
  },
  "map-button__text": {
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    whiteSpace: "nowrap",
    fontWeight: "bold",
    letterSpacing: "2px",
    fontSize: "14px",
  },
  "map-button__details": {
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  "map-button__body": {
    minHeight: "120px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
    color: theme.palette.primary.contrastText,
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
  },
  "map-button__footer": {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 0",
    width: "100% !important",
    "& button:hover": {
      backgroundColor: "transparent !important",
    },
  },
}));
