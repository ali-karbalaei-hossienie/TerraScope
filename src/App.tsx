import { ThemeProvider } from "@emotion/react";
import { MapProvider } from "react-map-gl/mapbox";
import { customTheme } from "./theme/theme";
import Map from "./components/Map";
import { CssBaseline } from "@mui/material";
function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <MapProvider>
        <Map />
      </MapProvider>
    </ThemeProvider>
  );
}

export default App;
