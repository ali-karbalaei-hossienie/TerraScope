import PublicIcon from "@mui/icons-material/Public";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Discover from "../Discover/Discover";
import Map from "../Map";
import Weather from "../Weather/Weather";
import SideBarItem from "./components/SidebarItem/SideBarItem";
import { useSideBarStyles } from "./styles/useSideBarStyles";
import { useMap } from "react-map-gl/mapbox";

type ActiveMenuType = "discover" | "weather" | "timeLaps" | null;

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState<ActiveMenuType>(null);
  const { map } = useMap();
  const mapBox = map?.getMap();
  const handleMenuClick = (menu: ActiveMenuType) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };
  const isMenuOpen = Boolean(activeMenu);

  const { classes } = useSideBarStyles({ isMenuOpen });

  useEffect(() => {
    if (!mapBox) return;

    const timeoutId = setTimeout(() => {
      mapBox.resize();
      mapBox.triggerRepaint();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [isMenuOpen, mapBox]);

  return (
    <Box className={classes.root}>
      <Box className={classes.sidebar}>
        <SideBarItem
          icon={<PublicIcon sx={{ width: 32, height: 32 }} />}
          label="Discover"
          isActive={activeMenu === "discover"}
          onClick={() => handleMenuClick("discover")}
        />
        <SideBarItem
          icon={<ThunderstormIcon sx={{ width: 32, height: 32 }} />}
          label="Weather"
          isActive={activeMenu === "weather"}
          onClick={() => handleMenuClick("weather")}
        />
        <SideBarItem
          icon={<TimelapseIcon sx={{ width: 32, height: 32 }} />}
          label="Timelapse"
          isActive={activeMenu === "timeLaps"}
          onClick={() => handleMenuClick("timeLaps")}
        />
      </Box>

      <Box className={classes.menuPanel}>
        <Box className={classes.menuPanelContent}>
          <Box sx={{ flexGrow: 1 }}>
            <>
              <>{activeMenu === "weather" && <Weather />}</>
              <>{activeMenu === "discover" && <Discover />}</>
            </>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <Map />
      </Box>
    </Box>
  );
};

export default SideBar;
