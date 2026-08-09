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
      padding: theme.spacing(1, 0),
      zIndex: 10,
    },
    sidebarItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: theme.spacing(1, 0),
      cursor: "pointer",
      color: isActive
        ? theme.palette.primary.main
        : theme.palette.text.secondary,
      transition: "color 0.2s",
      "&:hover": { color: theme.palette.secondary.main },
    },
    menuPanel: {
      width: isMenuOpen ? "340px" : "0px",
      transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      overflowX: "hidden",
      overflowY: "auto",
      backgroundColor: theme.palette.background.paper,
      color: "white",
      borderRight: isMenuOpen ? `1px solid ${theme.palette.divider}` : "none",
      zIndex: 9,
    },
    menuPanelContent: {
      width: 340,
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(2)} ${theme.spacing(2)} `,
    },
    panelTitle: {
      marginBottom: 16,
      textTransform: "capitalize",
      fontWeight: "bold",
      color: theme.palette.primary.main,
    },
  }),
);
