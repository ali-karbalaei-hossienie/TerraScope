import "mapbox-gl/dist/mapbox-gl.css";
import { Map as MapBox } from "react-map-gl/mapbox";
import MapNavigation from "./zoomBox/ZoomBox";
const Map = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <MapBox
        mapboxAccessToken="OSQvmkeEjIl23WjHmrjA"
        initialViewState={{
          longitude: 51.389,
          latitude: 35.6892,
          zoom: 4,
        }}
        id="map"
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://api.maptiler.com/maps/openstreetmap/style.json?key=OSQvmkeEjIl23WjHmrjA"
      >
        <MapNavigation />
      </MapBox>
    </div>
  );
};

export default Map;
