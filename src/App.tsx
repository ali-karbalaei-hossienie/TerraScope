import { ThemeProvider } from "@emotion/react";
import PublicIcon from "@mui/icons-material/Public";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { Box, CssBaseline } from "@mui/material";
import { lazy } from "react";
import { MapProvider } from "react-map-gl/mapbox";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "./app/store";
import Map from "./components/Map/Map";
import { SidebarProvider } from "./components/SideBar/SidebarProvider";
import type { ConfigType } from "./components/SideBar/types";
import { customTheme } from "./theme/theme";

const Discover = lazy(() => import("./components/Discover/Discover"));
const Weather = lazy(() => import("./components/Weather/Weather"));
const Timelapse = lazy(() => import("./components/Timelapse/Timelapse"));

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
];

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Toaster position="top-right" richColors />
        <MapProvider>
          <SidebarProvider config={sidebarConfig}>
            <Box sx={{ flex: 1, width: "100%", height: "100%" }}>
              <Map />
            </Box>
          </SidebarProvider>
        </MapProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
