import { ThemeProvider } from "@emotion/react";
import { MapProvider } from "react-map-gl/mapbox";
import { customTheme } from "./theme/theme";
import Map from "./components/Map";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <MapProvider>
          <Map />
        </MapProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
