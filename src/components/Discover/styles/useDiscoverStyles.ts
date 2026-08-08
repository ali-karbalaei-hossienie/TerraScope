import { makeStyles } from "tss-react/mui";

export const useDiscoverStyles = makeStyles({ name: "Discover" })((theme) => ({
  discoverContainer: {
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(2),
  },
  discoverButton: {
    width: "100%",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    overflow: "hidden",
    display: "flex",
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  discoverImageWrapper: {
    objectFit: "cover",
    padding: 0,
    flexBasis: "70px",
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
  },
  discoverAuthorRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.grey[400],
  },
  addTimelaps: {
    "&:hover": {
      backgroundColor: "inherit !important",
    },
  },
  discoverFooter: {
    marginTop: theme.spacing(1),
  },
  discoverSplitModeToggle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
