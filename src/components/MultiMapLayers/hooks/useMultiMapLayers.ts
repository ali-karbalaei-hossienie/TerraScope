import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { useEffect } from "react";
import { useMap } from "react-map-gl/mapbox";
const BASE_SOURCE_ID = "base-source";
const BASE_LAYER_ID = "base-layer";

export const useMultiMapLayers = () => {
  const { selectedBaseLayers, selectedLeftLayers, selectedRightLayers } =
    useSelector((state: RootState) => state.multiMapLayer);
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;

    const updateBaseLayer = () => {
      const { tile } = selectedBaseLayers[0];

      if (map.getLayer(BASE_LAYER_ID)) {
        map.getMap().removeLayer(BASE_LAYER_ID);
      }

      if (map.getSource(BASE_SOURCE_ID)) {
        map.getMap().removeSource(BASE_SOURCE_ID);
      }

      map.getMap().addSource(BASE_SOURCE_ID, {
        type: "raster",
        tiles: [tile],
        tileSize: 256,
      });

      map.getMap().addLayer({
        id: BASE_LAYER_ID,
        type: "raster",
        source: BASE_SOURCE_ID,
      });
    };

    if (map.isStyleLoaded()) {
      updateBaseLayer();
    } else {
      map.once("style.load", updateBaseLayer);
    }
  }, [map, selectedBaseLayers]);
};
