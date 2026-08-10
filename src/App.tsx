import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { MapProvider } from "react-map-gl/mapbox";
import { Provider } from "react-redux";
import { store } from "./app/store";
import SideBar from "./components/SideBar/SideBar";
import { customTheme } from "./theme/theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <MapProvider>
          <SideBar />
        </MapProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
