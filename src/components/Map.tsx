import { Geoman } from "@geoman-io/mapbox-geoman-free";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { Map as MapBox, useMap } from "react-map-gl/mapbox";
import { registerGeoman, unregisterGeoman } from "../map/drawStore";
import Draw from "./Draw/Draw";
import Edit from "./Edit/Edit";
import MultiMapLayers from "./MultiMapLayers/MultiMapLayers";
import MapNavigation from "./zoomBox/ZoomBox";
// import Weather from "./_Weather/Weather";
import type { StyleSpecification } from "mapbox-gl";
import Slider from "./Slider/Slider";

const blankStyle: StyleSpecification = {
  version: 8,
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {},
  layers: [],
};
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
    <MapBox
      mapboxAccessToken="OSQvmkeEjIl23WjHmrjA"
      initialViewState={{
        longitude: 51.389,
        latitude: 35.6892,
        zoom: 4,
      }}
      id="map"
      style={{ width: "100%", height: "100%" }}
      mapStyle={blankStyle}
    >
      <MapNavigation />
      <Draw />
      <Edit />
      <MultiMapLayers />
      <Slider />
    </MapBox>
  );
};

export default Map;
