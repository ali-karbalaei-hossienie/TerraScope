import React, { useEffect, useState } from "react";
import { MapControl } from "../MapControl/MapControl";
import { Button } from "@mui/material";
import { useMap } from "react-map-gl/mapbox";

const Weather = () => {
  const { map } = useMap();
  const [tilePath, setTilePath] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.rainviewer.com/public/weather-maps.json")
      .then((res) => res.json())
      .then((data) => {
        const radarFrames = data.radar?.past;
        if (radarFrames && radarFrames.length > 0) {
          const latestFrame = radarFrames[radarFrames.length - 1];
          setTilePath(latestFrame.path);
        }
      })
      .catch((err) => console.error("Error fetching RainViewer data:", err));
  }, []);

  useEffect(() => {
    if (!map || !tilePath) return;

    const mapInstance = map.getMap();
    const tileUrl = `https://tilecache.rainviewer.com${tilePath}/256/{z}/{x}/{y}/2/1_1.png`;

    if (!mapInstance.getSource("rainviewer-history")) {
      mapInstance.addSource("rainviewer-history", {
        type: "raster",
        tiles: [tileUrl],
        tileSize: 256,
      });
    }

    if (!mapInstance.getLayer("layer-rainviewer-history")) {
      mapInstance.addLayer({
        id: "layer-rainviewer-history",
        type: "raster",
        source: "rainviewer-history",
        paint: {
          "raster-opacity": 0.8,
        },
      });
    }

    return () => {
      if (mapInstance.getLayer("layer-rainviewer-history")) {
        mapInstance.removeLayer("layer-rainviewer-history");
      }
      if (mapInstance.getSource("rainviewer-history")) {
        mapInstance.removeSource("rainviewer-history");
      }
    };
  }, [tilePath, map]);

  // ۳. نمایش لایه OpenWeather با کلیک دکمه
  const showWeather = () => {
    const mapInstance = map?.getMap();
    if (!mapInstance) return;

    if (!mapInstance.getSource("openweathermap-clouds")) {
      mapInstance.addSource("openweathermap-clouds", {
        type: "raster",
        tiles: [
          `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Land_Surface_Temp_Day/default/{date}/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png`,
        ],
        tileSize: 256,
      });
    }

    if (!mapInstance.getLayer("clouds-layer")) {
      mapInstance.addLayer({
        id: "clouds-layer",
        type: "raster",
        source: "openweathermap-clouds",
        paint: {
          "raster-opacity": 1,
          "raster-fade-duration": 300,
        },
      });
    }
  };

  return (
    <div>
      <MapControl position="left">
        <Button
          sx={{
            backgroundColor: "red !important",
            padding: "80px !important",
          }}
          onClick={showWeather}
        >
          click weather
        </Button>
      </MapControl>
    </div>
  );
};

export default Weather;
