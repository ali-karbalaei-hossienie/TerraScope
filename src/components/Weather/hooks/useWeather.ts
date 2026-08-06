import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { getSliderData } from "../utils";

export const useWeather = () => {
  const { map } = useMap();
  const [weather, setWeather] = useState<string | null>(null);

  const mapInstance = map!.getMap();
  console.log(weather);

  const handleClouds = () => {
    const date = getSliderData();
    console.log(date);

    if (!mapInstance.getSource("clouds")) {
      mapInstance.addSource("clouds", {
        type: "raster",
        tiles: [
          `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2026-02-03/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`,
        ],
        tileSize: 256,
      });
    }

    if (!mapInstance.getLayer("clouds-layer")) {
      mapInstance.addLayer({
        id: "clouds-layer",
        type: "raster",
        source: "clouds",
        paint: {
          "raster-opacity": 1,
          "raster-fade-duration": 300,
        },
      });
    }
  };

  const handleResetWeather = () => {
    if (mapInstance.getLayer("clouds-layer")) {
      mapInstance.removeLayer("clouds-layer");
    }

    if (mapInstance.getSource("clouds-layer")) {
      mapInstance.removeSource("clouds-layer");
    }
  };

  useEffect(() => {
    switch (weather) {
      case "clouds":
        handleClouds();
        break;
      default:
        handleResetWeather();
        break;
    }
  }, [weather]);

  const handleWeather = (
    _event: React.MouseEvent<HTMLElement>,
    newFormats: string,
  ) => {
    setWeather(newFormats);
  };

  return { weather, setWeather, handleWeather };
};
