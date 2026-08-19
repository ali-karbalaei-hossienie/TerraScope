import { ThemeProvider } from "@emotion/react";
import PublicIcon from "@mui/icons-material/Public";
import SettingsIcon from "@mui/icons-material/Settings";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { Box, createTheme, CssBaseline } from "@mui/material";
import { lazy, useEffect, useMemo, useState } from "react";
import { MapProvider } from "react-map-gl/mapbox";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";
import { type RootState } from "./app/store";
import { SidebarProvider } from "./components/SideBar/SidebarProvider";
import type { ConfigType } from "./components/SideBar/types";
import TerraScopeLoader from "./components/TerraScopeLoader/TerraScopeLoader";
import Map from "./map/Map";
import { getDesignTokens } from "./theme/theme";

const Discover = lazy(() => import("./pages/Home/Discover/Discover"));
const Weather = lazy(() => import("./pages/Home/Weather/Weather"));
const Timelapse = lazy(() => import("./pages/Home/Timelapse/Timelapse"));
const Setting = lazy(() => import("./pages/Home/Setting/Setting"));

const sidebarConfig: ConfigType[] = [
  {
    id: "discover",
    position: "top",
    textButton: "Discover",
    icon: <PublicIcon />,
    component: Discover,
  },
  {
    id: "weather",
    position: "top",
    textButton: "Weather",
    icon: <ThunderstormIcon />,
    component: Weather,
  },
  {
    id: "timeLapse",
    position: "top",
    textButton: "TimeLapse",
    icon: <TimelapseIcon />,
    component: Timelapse,
  },
  {
    id: "setting",
    position: "bottom",
    textButton: "Setting",
    icon: <SettingsIcon />,
    component: Setting,
  },
];

function App() {
  const [loading, setLoading] = useState(true);
  const mode = useSelector((state: RootState) => state.setting.mode);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" richColors />
      <MapProvider>
        {/* <TerraScopeLoader visible={loading} /> */}
        <SidebarProvider config={sidebarConfig}>
          <Box sx={{ flex: 1, width: "100%", height: "100%" }}>
            <Map />
          </Box>
        </SidebarProvider>
      </MapProvider>
    </ThemeProvider>
  );
}

export default App;
