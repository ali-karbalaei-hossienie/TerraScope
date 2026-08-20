import {
  Box,
  CircularProgress,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  Suspense,
} from "react";
import { useMap } from "react-map-gl/mapbox";
import SideBarItem from "./components/SidebarItem/SideBarItem";
import { useSideBarStyles } from "./styles/useSideBarStyles";
import type {
  ActiveMenuType,
  ConfigType,
  SidebarContextType,
  SidebarProviderProps,
} from "./types";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({ config, children }: SidebarProviderProps) => {
  const [activeMenu, setActiveMenu] = useState<ActiveMenuType | null>(null);
  const { map } = useMap();
  const mapBox = map?.getMap();
  const { t } = useTranslation();

  const isMenuOpen = Boolean(activeMenu);
  const activeItem = config.find((i) => i.id === activeMenu);

  const topItems = config.filter(
    (item) => item.position === "top" || !item.position,
  );

  const bottomItems = config.filter((item) => item.position === "bottom");

  useEffect(() => {
    if (!mapBox) return;

    const timeoutId = setTimeout(() => {
      mapBox.resize();
      mapBox.triggerRepaint();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [isMenuOpen, mapBox]);

  const handleMenuClick = useCallback((menu: ActiveMenuType) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  }, []);

  const closeSidebar = useCallback(() => {
    setActiveMenu(null);
  }, []);

  const renderList = useCallback(
    (items: ConfigType[]) => {
      return items.map((item) => (
        <List className={classes.sidebarListItem}>
          <SideBarItem
            key={item.id}
            icon={item.icon}
            label={t(item.textButton as never)}
            isActive={activeMenu === item.id}
            onClick={() => handleMenuClick(item.id)}
          />
        </List>
      ));
    },
    [activeMenu, handleMenuClick, t],
  );

  const { classes } = useSideBarStyles({ isMenuOpen });

  const contextValue = useMemo(
    () => ({
      activeMenu,
      isMenuOpen,
    }),
    [activeMenu, isMenuOpen],
  );

  const ActiveComponent = activeItem?.component;

  return (
    <SidebarContext.Provider value={contextValue}>
      <Box className={classes.root}>
        <Box className={classes.sidebar}>
          <Box>{renderList(topItems)}</Box>
          <Box>{renderList(bottomItems)}</Box>
        </Box>

        <Box className={classes.menuPanel}>
          <Box className={classes.menuPanelContent}>
            <Box sx={{ flexGrow: 1 }}>
              <Suspense
                fallback={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <CircularProgress aria-label="Loading…" />
                  </Box>
                }
              >
                {activeItem && (
                  <Box
                    sx={(theme) => ({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: "1px solid",
                      borderColor: theme.palette.divider,
                      flexShrink: 0,
                      marginBottom: 2,
                      py: 1.5,
                    })}
                  >
                    <Typography variant="h6" className={classes.panelTitle}>
                      <span>{t("panel")}</span>
                      <span>{t(activeItem.textButton as never)}</span>
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={closeSidebar}
                      sx={(theme) => ({
                        color: "text.secondary",
                        bgcolor: theme.palette.divider,
                      })}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                )}
                {ActiveComponent ? <ActiveComponent /> : null}
              </Suspense>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
    </SidebarContext.Provider>
  );
};
