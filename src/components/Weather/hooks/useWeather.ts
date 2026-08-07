import { useEffect, useState, useRef } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import type { MapSourceDataEvent } from "mapbox-gl";

const WEATHER_URLS: Record<string, (time: string) => string> = {
  clouds: (time) =>
    `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${time}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`,
  rain: (time) =>
    `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/GPM_3IMERGHHE_Precipitation_Rate/default/${time}/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png`,
};

export const useWeather = () => {
  const { map } = useMap();
  const [weather, setWeather] = useState<string | null>(null);
  const timeSlider = useSelector((state: RootState) => state.slider.timeSlider);

  const mapInstance = map!.getMap();
  const activeLayerRef = useRef<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Helper function to force-remove ALL weather layers & sources from the map
  const removeAllWeatherLayers = () => {
    if (!mapInstance) return;

    // Clear any pending timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const style = mapInstance.getStyle();
    if (!style) return;

    // 1. Remove all weather layers
    style.layers?.forEach((layer) => {
      if (layer.id.includes("-layer-")) {
        if (mapInstance.getLayer(layer.id)) mapInstance.removeLayer(layer.id);
      }
    });

    // 2. Remove all weather sources
    Object.keys(style.sources || {}).forEach((sourceId) => {
      if (sourceId.includes("-source-")) {
        if (mapInstance.getSource(sourceId)) mapInstance.removeSource(sourceId);
      }
    });

    activeLayerRef.current = null;
  };

  useEffect(() => {
    if (!mapInstance || !timeSlider) return;

    const tileUrl = weather ? WEATHER_URLS[weather]?.(timeSlider) : null;

    // If weather is turned off or invalid, do a complete sweep
    if (!tileUrl) {
      removeAllWeatherLayers();
      return;
    }

    const sourceId = `${weather}-source-${timeSlider}`;
    const layerId = `${weather}-layer-${timeSlider}`;

    // If this specific source already exists, don't recreate it
    if (mapInstance.getSource(sourceId)) return;

    // 1. Add new source
    mapInstance.addSource(sourceId, {
      type: "raster",
      tiles: [tileUrl],
      tileSize: 256,
    });

    // 2. Add new invisible layer
    mapInstance.addLayer({
      id: layerId,
      type: "raster",
      source: sourceId,
      paint: {
        "raster-opacity": 0,
        "raster-fade-duration": 400,
      },
    });

    const prevLayer = activeLayerRef.current;

    const handleSourceLoaded = (e: MapSourceDataEvent) => {
      if (e.sourceId === sourceId && mapInstance.isSourceLoaded(sourceId)) {
        // Double check: if user turned off weather while loading, clean up immediately!
        if (!weather) {
          removeAllWeatherLayers();
          return;
        }

        // Show new layer
        mapInstance.setPaintProperty(layerId, "raster-opacity", 1);

        // Fade out previous layer
        if (prevLayer && prevLayer !== layerId) {
          const prevSource = prevLayer.replace("layer", "source");

          if (mapInstance.getLayer(prevLayer)) {
            mapInstance.setPaintProperty(prevLayer, "raster-opacity", 0);
          }

          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          timeoutRef.current = setTimeout(() => {
            if (mapInstance.getLayer(prevLayer))
              mapInstance.removeLayer(prevLayer);
            if (mapInstance.getSource(prevSource))
              mapInstance.removeSource(prevSource);
          }, 500);
        }

        mapInstance.off("sourcedata", handleSourceLoaded);
      }
    };

    mapInstance.on("sourcedata", handleSourceLoaded);
    activeLayerRef.current = layerId;

    return () => {
      mapInstance.off("sourcedata", handleSourceLoaded);
    };
  }, [timeSlider, weather, mapInstance]);

  const handleWeather = (
    _event: React.MouseEvent<HTMLElement>,
    newFormats: string | null,
  ) => {
    setWeather(newFormats);
  };

  return { weather, setWeather, handleWeather };
};
