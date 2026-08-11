import type { MapInstance } from "react-map-gl/mapbox";
import type { DiscoverItemType, MapboxLayerConfig } from "../types";

export const generateSourceIds = (data: DiscoverItemType) => {
  const imageSourceId = `discover-source-${data.id}`;
  const borderSourceId = `discover-border-source-${data.id}`;
  return {
    imageSourceId,
    borderSourceId,
  };
};

export const removeMapResources = (
  mapboxMap: MapInstance,
  idLayers: string[],
  idSources: string[],
) => {
  // Remove from Mapbox (layer first, then source)

  idLayers.forEach((idLayer) => {
    if (mapboxMap) {
      if (mapboxMap.getLayer(idLayer)) mapboxMap.removeLayer(idLayer);
    }
  });

  idSources.forEach((idSource) => {
    if (mapboxMap) {
      if (mapboxMap.getSource(idSource)) mapboxMap.removeSource(idSource);
    }
  });
};

export function addSourceAndLayer(
  map: mapboxgl.Map,
  config: MapboxLayerConfig,
): void {
  const { id, layer, sourceProps } = config;
  if (!map.getSource(id)) {
    map.addSource(id, sourceProps);
  }

  if (!map.getLayer(id)) {
    map.addLayer(layer);
  }
}
