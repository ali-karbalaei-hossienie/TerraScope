import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMap } from "react-map-gl/mapbox";
import type { Dispatch } from "@reduxjs/toolkit";
import type { GeoJSONSource, ImageSource, Map as MapboxMap } from "mapbox-gl";

import { addSourceAndLayer } from "../../utils";
import {
  addExtraLeftLayers,
  addExtraRightLayers,
  removeAllExtraLayers,
  setIsSplitMode,
} from "../../../features/multiMapLayers/multiMapLayersSlice";
import type { RootState } from "../../../app/store";
import { convertedFormatDate } from "../../Discover/utils";

// --- Types ---
export type Coordinate = [number, number];
export type Coordinates = [Coordinate, Coordinate, Coordinate, Coordinate];

export interface Mark {
  value: number;
  url: string;
  coordinates: Coordinates;
}

type OverlayKey = "main" | "left" | "right";

const ALL_SLIDER_LAYERS = [
  "slider-image-layer-main",
  "slider-image-layer-left",
  "slider-image-layer-right",
  "slider-border-layer-main",
  "slider-border-layer-left",
  "slider-border-layer-right",
];

const ALL_SLIDER_SOURCES = [
  "slider-image-source-main",
  "slider-image-source-left",
  "slider-image-source-right",
  "slider-border-source-main",
  "slider-border-source-left",
  "slider-border-source-right",
];

// --- Helper Functions ---
export const removeMapResources = (
  mapboxMap: MapboxMap | null | undefined,
  idLayers: string[],
  idSources: string[],
) => {
  if (!mapboxMap) return;

  // Remove layers first, then sources
  idLayers.forEach((idLayer) => {
    if (mapboxMap.getLayer(idLayer)) {
      mapboxMap.removeLayer(idLayer);
    }
  });

  idSources.forEach((idSource) => {
    if (mapboxMap.getSource(idSource)) {
      mapboxMap.removeSource(idSource);
    }
  });
};

const getCenterOfCoordinates = (coords: Coordinates): Coordinate | null => {
  if (!coords || coords.length !== 4) return null;
  const lngs = coords.map((c) => c[0]);
  const lats = coords.map((c) => c[1]);

  return [
    (Math.min(...lngs) + Math.max(...lngs)) / 2,
    (Math.min(...lats) + Math.max(...lats)) / 2,
  ];
};

const getPolygonGeoJSON = (coordinates: Coordinates) => {
  if (!coordinates || coordinates.length !== 4) return null;
  return {
    type: "Feature" as const,
    geometry: {
      type: "Polygon" as const,
      coordinates: [[...coordinates, coordinates[0]]],
    },
    properties: {},
  };
};

const updateMapSources = (mapbox: MapboxMap, mark: Mark, key: OverlayKey) => {
  const imageSource = mapbox.getSource(
    `slider-image-source-${key}`,
  ) as ImageSource;
  const borderSource = mapbox.getSource(
    `slider-border-source-${key}`,
  ) as GeoJSONSource;

  if (imageSource) {
    imageSource.updateImage({ url: mark.url, coordinates: mark.coordinates });
  }

  if (borderSource) {
    const geoJson = getPolygonGeoJSON(mark.coordinates);
    if (geoJson) borderSource.setData(geoJson);
  }
};

const syncImageOverlay = (
  mapbox: MapboxMap,
  mark: Mark,
  key: OverlayKey = "main",
  dispatch: Dispatch,
) => {
  const sourceId = `slider-image-source-${key}`;
  const layerId = `slider-image-layer-${key}`;
  const borderSourceId = `slider-border-source-${key}`;
  const borderLayerId = `slider-border-layer-${key}`;

  if (mapbox.getSource(sourceId)) {
    updateMapSources(mapbox, mark, key);
    return;
  }

  const geoJson = getPolygonGeoJSON(mark.coordinates);

  if (key === "main") {
    addSourceAndLayer(mapbox, {
      id: sourceId,
      sourceProps: {
        type: "image",
        url: mark.url,
        coordinates: mark.coordinates,
      },
      layer: {
        id: layerId,
        type: "raster",
        source: sourceId,
        paint: { "raster-fade-duration": 0 },
      },
    });

    if (geoJson) {
      addSourceAndLayer(mapbox, {
        id: borderSourceId,
        sourceProps: { type: "geojson", data: geoJson },
        layer: {
          id: borderLayerId,
          type: "line",
          source: borderSourceId,
          paint: { "line-color": "#ff0000", "line-width": 3 },
        },
      });
    }
  } else {
    const addLayerAction =
      key === "left" ? addExtraLeftLayers : addExtraRightLayers;

    dispatch(
      addLayerAction({
        id: sourceId,
        sourceId,
        source: { type: "image", url: mark.url, coordinates: mark.coordinates },
        layer: {
          id: layerId,
          type: "raster",
          source: sourceId,
          paint: { "raster-fade-duration": 0 },
        },
      }),
    );

    if (geoJson) {
      dispatch(
        addLayerAction({
          id: borderSourceId,
          sourceId: borderSourceId,
          source: { type: "geojson", data: geoJson },
          layer: {
            id: borderLayerId,
            type: "line",
            source: borderSourceId,
            paint: { "line-color": "#ff0000", "line-width": 3 },
          },
        }),
      );
    }
  }
};

// --- Hook ---
export const useTimeLapseSlider = () => {
  const dispatch = useDispatch();
  const { map } = useMap();
  const mapbox = map?.getMap();

  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [mapMode, setMapMode] = useState<"single" | "split">("single");
  const isSplit = mapMode === "split";
  const timeLapseData = useSelector((state: RootState) => state.timeLapse);

  const marks = useMemo(() => {
    return timeLapseData.map((item, index) => ({
      label: convertedFormatDate(item.createdAt),
      value: index,
      coordinates: item.coordinates,
      url: item.image,
    }));
  }, [timeLapseData]);

  const [value, setValue] = useState<number | number[]>(isSplit ? [0, 1] : 0);

  const hasFlown = useRef(false);

  const cleanupResources = useCallback(() => {
    if (mapbox) {
      removeMapResources(mapbox, ALL_SLIDER_LAYERS, ALL_SLIDER_SOURCES);
    }
    dispatch(removeAllExtraLayers());
  }, [mapbox]);

  useEffect(() => {
    if (!mapbox) return;

    if (!isSplit && typeof value === "number") {
      const currentMark = marks[value];
      if (!currentMark) return;

      syncImageOverlay(mapbox, currentMark, "main", dispatch);

      if (!hasFlown.current) {
        const center = getCenterOfCoordinates(currentMark.coordinates);
        if (center) {
          mapbox.flyTo({ center, zoom: 13, essential: true, duration: 3000 });
          hasFlown.current = true;
        }
      }
    } else if (isSplit && Array.isArray(value)) {
      const [leftVal, rightVal] = value;

      if (marks[leftVal])
        syncImageOverlay(mapbox, marks[leftVal], "left", dispatch);
      if (marks[rightVal])
        syncImageOverlay(mapbox, marks[rightVal], "right", dispatch);
    }
  }, [value, mapbox, isSplit, dispatch]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      if (!isPlay) return;

      if (time - lastTime >= 1000) {
        setValue((prevValue) => {
          if (!isSplit && typeof prevValue === "number") {
            if (prevValue >= marks.length - 1) {
              setIsPlay(false);
              return 0;
            }
            return prevValue + 1;
          }

          if (isSplit && Array.isArray(prevValue)) {
            const [leftVal, rightVal] = prevValue;

            if (leftVal >= marks.length - 1 || rightVal >= marks.length - 1) {
              setIsPlay(false);
              return [0, 1];
            }

            return [leftVal + 1, rightVal + 1];
          }

          return prevValue;
        });

        lastTime = time;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    if (isPlay) {
      animationFrameId = requestAnimationFrame(animate);
    }

    // Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlay, isSplit]);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleMapMode = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "single" | "split",
  ) => {
    event.stopPropagation();

    if (newAlignment && newAlignment !== mapMode) {
      cleanupResources();
      setMapMode(newAlignment);
      setValue(
        newAlignment === "split"
          ? [marks[0].value, marks[1].value]
          : marks[0].value,
      );
      dispatch(setIsSplitMode(newAlignment === "split"));
    }
  };

  const valueLabelFormat = (id: number) => {
    if (marks.length) {
      const item = marks[id];
      const date = convertedFormatDate(item.label);
      return date;
    }
  };

  return {
    isSplit,
    isPlay,
    setIsPlay,
    handleChange,
    value,
    setValue,
    mapMode,
    marks,
    handleMapMode,
    valueLabelFormat,
  };
};
