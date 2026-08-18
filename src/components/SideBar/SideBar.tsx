import PublicIcon from "@mui/icons-material/Public";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import Discover from "../../pages/Home/Discover/Discover";
import Timelapse from "../../pages/Home/Timelapse/Timelapse";
import Weather from "../../pages/Home/Weather/Weather";
import SideBarItem from "./components/SidebarItem/SideBarItem";
import { useSideBarStyles } from "./styles/useSideBarStyles";
import Map from "../../map/Map";
import TimeLapseSlider from "../../pages/Home/Timelapse/components/TimelapseSlider/TimeLapseSlider";

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
              <>{activeMenu === "timeLaps" && <Timelapse />}</>
            </>
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
        <Box sx={{ flex: 1, width: "100%", height: "100%" }}>
          <Map />
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 180,
            transform:
              activeMenu === "timeLaps" ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.3s ease-in-out",
            zIndex: 10,
            backgroundColor: "background.paper",
          }}
        >
          {activeMenu === "timeLaps" && <TimeLapseSlider />}
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
