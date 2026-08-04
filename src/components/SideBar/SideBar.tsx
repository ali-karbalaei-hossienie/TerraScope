import MapIcon from "@mui/icons-material/Map";
import PublicIcon from "@mui/icons-material/Public";
import SatelliteIcon from "@mui/icons-material/Satellite";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Map from "../Map";
import SideBarItem from "./components/SidebarItem/SideBarItem";
import { useSideBarStyles } from "./styles/useSideBarStyles";

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>("maps");

  const handleMenuClick = (menu: string) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };
  const isMenuOpen = Boolean(activeMenu);

  const { classes } = useSideBarStyles({ isMenuOpen });

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
          icon={<MapIcon sx={{ width: 32, height: 32 }} />}
          label="Maps"
          isActive={activeMenu === "maps"}
          onClick={() => handleMenuClick("maps")}
        />
        <SideBarItem
          icon={<SatelliteIcon sx={{ width: 32, height: 32 }} />}
          label="Satellite"
          isActive={activeMenu === "satellite"}
          onClick={() => handleMenuClick("satellite")}
        />
      </Box>

      <Box className={classes.menuPanel}>
        <Box className={classes.menuPanelContent}>
          <Typography variant="h6" className={classes.panelTitle}>
            {activeMenu ? `${activeMenu} Panel` : ""}
          </Typography>
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
