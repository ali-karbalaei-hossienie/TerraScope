import { Box, CircularProgress } from "@mui/material";
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

  const renderList = useCallback(
    (items: ConfigType[]) => {
      return items.map((item) => (
        <SideBarItem
          key={item.id}
          icon={item.icon}
          label={item.textButton}
          isActive={activeMenu === item.id}
          onClick={() => handleMenuClick(item.id)}
        />
      ));
    },
    [activeMenu, handleMenuClick],
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
