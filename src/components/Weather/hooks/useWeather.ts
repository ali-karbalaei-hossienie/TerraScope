import type { MapSourceDataEvent } from "mapbox-gl";
import { useEffect, useRef, useState, useCallback } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { setVisibleSlider } from "../../../features/slider/sliderSlice";
import { setIsSplitMode } from "../../../features/multiMapLayers/multiMapLayersSlice";

const WEATHER_URLS: Record<string, (time: string) => string> = {
  clouds: (time) =>
    `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${time}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`,
  rain: (time) =>
    `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/IMERG_Precipitation_Rate/default/${time}/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png`,
  temperature: (time) =>
    `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Land_Surface_Temp_Day/default/${time}/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png`,
  aerosol: (time) =>
    `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Aerosol/default/${time}/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png`,

  fires: (time) =>
    `https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=VIIRS_SNPP_Thermal_Anomalies_375m_All&STYLES=&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&TIME=${time}`,
  seaTemperature: (time) =>
    `https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=GHRSST_L4_MUR_Sea_Surface_Temperature&STYLES=&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&TIME=${time}`,
};

export const useWeather = () => {
  const { map } = useMap();
  const [weather, setWeather] = useState<string | null>(null);
  const timeSlider = useSelector((state: RootState) => state.slider.timeSlider);
  const dispatch = useDispatch();
  const isSplitMode = useSelector(
    (state: RootState) => state.multiMapLayer.isSplitMode,
  );

  const mapInstance = map!.getMap();
  const activeWeatherRef = useRef<string | null>(null);

  const removeAllWeatherLayers = useCallback(() => {
    if (!mapInstance) return;
    const style = mapInstance.getStyle();
    if (!style) return;

    style.layers?.forEach((layer) => {
      if (layer.id.includes("-weather-")) {
        if (mapInstance.getLayer(layer.id)) mapInstance.removeLayer(layer.id);
      }
    });

    Object.keys(style.sources).forEach((sourceId) => {
      if (sourceId.includes("-weather-")) {
        if (mapInstance.getSource(sourceId)) mapInstance.removeSource(sourceId);
      }
    });
  }, [mapInstance]);

  useEffect(() => {
    return () => {
      removeAllWeatherLayers();
      dispatch(setVisibleSlider(false));
    };
  }, [removeAllWeatherLayers, dispatch]);

  useEffect(() => {
    if (!mapInstance || !timeSlider) return;

    const tileUrl = weather ? WEATHER_URLS[weather]?.(timeSlider) : null;

    // 1. If the user turns off the weather entirely
    if (!tileUrl) {
      dispatch(setVisibleSlider(false));
      removeAllWeatherLayers();
      activeWeatherRef.current = null;
      return;
    }

    // 2. If the weather type changes
    if (activeWeatherRef.current !== weather) {
      removeAllWeatherLayers();
      activeWeatherRef.current = weather;
    }

    const sourceId = `${weather}-weather-source-${timeSlider}`;
    const layerId = `${weather}-weather-layer-${timeSlider}`;

    const hideOtherLayers = (targetLayerId: string) => {
      const style = mapInstance.getStyle();
      style?.layers?.forEach((layer) => {
        if (layer.id.includes("-weather-") && layer.id !== targetLayerId) {
          mapInstance.setPaintProperty(layer.id, "raster-opacity", 0);
        }
      });
    };

    // 3. Cache Hit
    if (mapInstance.getSource(sourceId)) {
      mapInstance.setPaintProperty(layerId, "raster-opacity", 1);
      hideOtherLayers(layerId);
      return;
    }

    // 4. Add new layer
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

    // 5. Wait for download
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
  }, [timeSlider, weather, mapInstance, dispatch, removeAllWeatherLayers]);

  useEffect(() => {
    if (isSplitMode) {
      dispatch(setIsSplitMode(false));
    }
  }, [isSplitMode, dispatch]);

  const handleWeather = (
    _event: React.MouseEvent<HTMLElement>,
    newFormats: string | null,
  ) => {
    setWeather(newFormats);
    dispatch(setVisibleSlider(true));
  };

  return { weather, setWeather, handleWeather };
};
