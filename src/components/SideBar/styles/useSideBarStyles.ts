import { makeStyles } from "tss-react/mui";

interface SideBarStyleProps {
  isMenuOpen?: boolean;
  isActive?: boolean;
}

export const useSideBarStyles = makeStyles<SideBarStyleProps>()(
  (theme, { isMenuOpen, isActive }) => ({
    root: {
      display: "grid",
      gridTemplateColumns: "90px auto 1fr",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      backgroundColor: theme.palette.background.default,
    },
    sidebar: {
      backgroundColor: theme.palette.background.default,
      borderRight: `1px solid ${theme.palette.divider}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      zIndex: 10,
      paddingTop: 16,
      justifyContent: "space-between",
      paddingBottom: 32,
    },
    sidebarListItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      padding: "8px 6px",
      borderRadius: "10px",
      width: "76px",
      boxSizing: "border-box",

      backgroundColor: isActive
        ? theme.palette.background.paper
        : "transparent",

      border: "1px solid",
      borderColor: isActive ? theme.palette.primary.main : "transparent",

      color: isActive
        ? theme.palette.primary.main
        : theme.palette.text.secondary,

      transition: "all 0.3s ease-in-out",

      "& .MuiSvgIcon-root, & .MuiListItemText-primary": {
        color: isActive
          ? theme.palette.primary.main
          : theme.palette.text.secondary,
        transition: "color 0.3s ease-in-out",
      },
      "&:hover": {
        color: theme.palette.primary.main,

        "& .MuiSvgIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.primary.main,
        },
      },
    },

    menuPanel: {
      width: isMenuOpen ? "400px" : "0px",
      transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      overflowX: "hidden",
      overflowY: "auto",
      backgroundColor: theme.palette.background.paper,
      color: "white",
      borderRight: isMenuOpen ? `1px solid ${theme.palette.divider}` : "none",
      zIndex: 9,
    },
    menuPanelContent: {
      width: 400,
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(2)} ${theme.spacing(2)} `,
    },
    panelTitle: {
      textTransform: "capitalize",
      fontWeight: "bold",
      color: theme.palette.primary.main,
      display: "flex",
      gap: 8,
      flexDirection: "row",
    },
  }),
);
