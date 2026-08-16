import { ThemeProvider } from "@emotion/react";
import PublicIcon from "@mui/icons-material/Public";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import { Box, CssBaseline } from "@mui/material";
import { MapProvider } from "react-map-gl/mapbox";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Discover from "./components/Discover/Discover";
import { SidebarProvider } from "./components/SideBar/SidebarProvider";
import type { ConfigType } from "./components/SideBar/types";
import Timelapse from "./components/Timelapse/Timelapse";
import Weather from "./components/Weather/Weather";
import { customTheme } from "./theme/theme";
import Map from "./components/Map/Map";

const sidebarConfig: ConfigType[] = [
  {
    id: "discover",
    position: "top",
    textButton: "Discover",
    icon: <PublicIcon />,
    component: <Discover />,
  },
  {
    id: "weather",
    position: "top",
    textButton: "Weather",
    icon: <ThunderstormIcon />,
    component: <Weather />,
  },
  {
    id: "timeLapse",
    position: "top",
    textButton: "TimeLapse",
    icon: <ThunderstormIcon />,
    component: <Timelapse />,
  },
];

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <MapProvider>
          <SidebarProvider config={sidebarConfig}>
            <>
              <Box sx={{ flex: 1, width: "100%", height: "100%" }}>
                <Map />
              </Box>
            </>
          </SidebarProvider>
        </MapProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
