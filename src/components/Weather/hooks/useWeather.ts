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

  // Reference to detect weather type changes (e.g., from clouds to rain)
  const activeWeatherRef = useRef<string | null>(null);

  // Helper function to completely remove all weather layers and sources from the map
  const removeAllWeatherLayers = () => {
    if (!mapInstance) return;
    const style = mapInstance.getStyle();
    if (!style) return;

    style.layers?.forEach((layer) => {
      if (layer.id.includes("-layer-")) {
        if (mapInstance.getLayer(layer.id)) mapInstance.removeLayer(layer.id);
      }
    });

    Object.keys(style.sources).forEach((sourceId) => {
      if (sourceId.includes("-source-")) {
        if (mapInstance.getSource(sourceId)) mapInstance.removeSource(sourceId);
      }
    });
  };

  useEffect(() => {
    if (!mapInstance || !timeSlider) return;

    const tileUrl = weather ? WEATHER_URLS[weather]?.(timeSlider) : null;

    // 1. If the user turns off the weather entirely
    if (!tileUrl) {
      removeAllWeatherLayers();
      activeWeatherRef.current = null;
      return;
    }

    // 2. If the weather type changes (e.g., clouds off and rain on), clear memory
    if (activeWeatherRef.current !== weather) {
      removeAllWeatherLayers();
      activeWeatherRef.current = weather;
    }

    const sourceId = `${weather}-source-${timeSlider}`;
    const layerId = `${weather}-layer-${timeSlider}`;

    // Helper function to hide other layers
    const hideOtherLayers = (targetLayerId: string) => {
      const style = mapInstance.getStyle();
      style?.layers?.forEach((layer) => {
        if (layer.id.includes("-layer-") && layer.id !== targetLayerId) {
          mapInstance.setPaintProperty(layer.id, "raster-opacity", 0);
        }
      });
    };

    // 3. Cache Hit: If this layer has already been downloaded and exists on the map
    if (mapInstance.getSource(sourceId)) {
      mapInstance.setPaintProperty(layerId, "raster-opacity", 1);
      hideOtherLayers(layerId);
      return;
    }

    // 4. If it's a new layer, add it with zero opacity
    mapInstance.addSource(sourceId, {
      type: "raster",
      tiles: [tileUrl],
      tileSize: 256,
    });

    mapInstance.addLayer({
      id: layerId,
      type: "raster",
      source: sourceId,
      paint: {
        "raster-opacity": 0,
        "raster-fade-duration": 400,
      },
    });

    // 5. Wait for complete download from NASA
    const handleSourceLoaded = (e: MapSourceDataEvent) => {
      if (
        e.sourceId === sourceId &&
        e.isSourceLoaded &&
        e.sourceDataType !== "metadata" &&
        mapInstance.isSourceLoaded(sourceId)
      ) {
        mapInstance.setPaintProperty(layerId, "raster-opacity", 1);
        hideOtherLayers(layerId);

        mapInstance.off("sourcedata", handleSourceLoaded);
      }
    };

    mapInstance.on("sourcedata", handleSourceLoaded);

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
