import { Geoman } from "@geoman-io/mapbox-geoman-free";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { Map, useMap } from "react-map-gl/mapbox";
import type { StyleSpecification } from "mapbox-gl";
import { registerGeoman, unregisterGeoman } from "../../../map/utils/drawStore";
import FullscreenControl from "../../../map/components/FullScreen/FullScreenControl";
import MultiMapLayers from "../../../map/components/MultiMapLayers/MultiMapLayers";
import Slider from "../../../components/Slider/Slider";
import CoordinateDisplay from "../CoordinateDisplay/CoordinateDisplay";
import Edit from "../Edit/Edit";
import Draw from "../Draw/Draw";
import MapNavigation from "../MapNavigation/MapNavigation";

const blankStyle: StyleSpecification = {
  version: 8,
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {},
  layers: [],
};
const MapBox = () => {
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
    <Map
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
      <FullscreenControl />
      <CoordinateDisplay />
      <Draw />
      <Edit />
      <MultiMapLayers />
      <Slider />
    </Map>
  );
};

export default MapBox;
