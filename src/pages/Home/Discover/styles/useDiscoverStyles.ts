import { makeStyles } from "tss-react/mui";

export const useDiscoverStyles = makeStyles()((theme) => ({
  panelTitle: {
    textTransform: "capitalize",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  discoverContainer: {
    border: `2px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(2),
    transition: "all 0.3s ease-in-out",
    transform: "scale(1)",
  },
  activeContainer: {
    borderColor: theme.palette.primary.dark,
    transform: "scale(1.04)",
  },
  discoverButton: {
    width: "100%",
    gap: theme.spacing(2),
    padding: 0,
    overflow: "hidden",
    display: "flex",
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  discoverImageWrapper: {
    objectFit: "cover",
    padding: 0,
    flexBasis: "90px",
    height: "100%",
    lineHeight: 0,
    aspectRatio: "1/1",
  },
  discoverImage: {
    width: "100%",
    height: "100%",
  },
  discoverContent: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    flex: 1,
  },
  discoverTitle: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    color: theme.palette.primary.light,
    textAlign: "left",
  },
  createdAt: {
    color: theme.palette.text.disabled,
    marginRight: theme.spacing(1),
  },
  discoverAuthorRow: {
    color: theme.palette.text.primary,
  },
  addTimelaps: {
    "&:hover": {
      backgroundColor: "inherit !important",
    },
  },

  splitModeWrapper: {
    display: "grid",
    gridTemplateRows: "0fr",
    opacity: 0,
    transition: "all 0.3s ease-in-out",
    justifyContent: "flex-start",
  },
  splitModeWrapperActive: {
    gridTemplateRows: "1fr",
    opacity: 1,
  },
}));
