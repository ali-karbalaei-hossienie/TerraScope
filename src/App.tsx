import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import PublicIcon from "@mui/icons-material/Public";
import SettingsIcon from "@mui/icons-material/Settings";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import TimelapseIcon from "@mui/icons-material/Timelapse";
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
    textButton: "discover",
    icon: <PublicIcon />,
    component: Discover,
  },
  {
    id: "weather",
    position: "top",
    textButton: "weather",
    icon: <ThunderstormIcon />,
    component: Weather,
  },
  {
    id: "timeLapse",
    position: "top",
    textButton: "timeLapse",
    icon: <TimelapseIcon />,
    component: Timelapse,
  },
  {
    id: "setting",
    position: "bottom",
    textButton: "setting",
    icon: <SettingsIcon />,
    component: Setting,
  },
];

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: "muiltr",
});

function App() {
  const [loading, setLoading] = useState(true);
  const mode = useSelector((state: RootState) => state.setting.mode);

  const { i18n } = useTranslation();
  const currentLang = i18n.language || "fa";
  const isRtl = currentLang === "fa";

  const theme = useMemo(() => {
    const designTokens = getDesignTokens(mode);

    return createTheme({
      ...designTokens,
      direction: isRtl ? "rtl" : "ltr",
    });
  }, [mode, isRtl]);

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
  }, [isRtl, currentLang]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster
          position={isRtl ? "top-left" : "top-right"}
          dir={isRtl ? "rtl" : "ltr"}
          richColors
        />

        <MapProvider>
          <TerraScopeLoader visible={loading} />
          <SidebarProvider config={sidebarConfig}>
            <Box sx={{ flex: 1, width: "100%", height: "100%" }}>
              <Map />
            </Box>
          </SidebarProvider>
        </MapProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
