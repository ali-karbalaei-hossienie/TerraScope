import { makeStyles } from "tss-react/mui";

export const MapButtonStyles = makeStyles()((theme) => ({
  "mapLayers-button-container": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  "mapLayers-button": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100% !important",
    height: "100% !important",
    padding: `${theme.spacing(1)} !important`,

    zIndex: 1200,
    "&:hover": {
      backgroundColor: "inherit !important",
    },
  },
}));
