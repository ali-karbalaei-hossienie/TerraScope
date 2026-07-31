import { Geoman } from "@geoman-io/mapbox-geoman-free";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { Map as MapBox, useMap } from "react-map-gl/mapbox";
import { registerGeoman, unregisterGeoman } from "../map/drawStore";
import MapNavigation from "./zoomBox/ZoomBox";
import Draw from "./Draw/Draw";
import Edit from "./Edit/Edit";
const Map = () => {
  const { map } = useMap();

  const geomanRef = useRef<Geoman | null>(null);

  useEffect(() => {
    if (!map) return;

    if (!geomanRef.current) {
      const geoman = new Geoman(map.getMap());
      geomanRef.current = geoman;

      registerGeoman(map, geoman);
    }

    return () => {
      if (!map || !geomanRef.current) return;

      unregisterGeoman(map);

      geomanRef.current.destroy();
      geomanRef.current = null;
    };
  }, [map]);

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
        <Draw />
        <Edit />
      </MapBox>
    </div>
  );
};

export default Map;
