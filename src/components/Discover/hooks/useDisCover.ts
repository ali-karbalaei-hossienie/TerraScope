import { useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useDispatch } from "react-redux";
import type { useDisCoverReturn } from "../types";
import { setIsSplitMode } from "../../../features/multiMapLayers/multiMapLayersSlice";
import { generateSourceIds } from "../utils";
import { addSourceAndLayer, removeMapResources } from "../../utils";
import type { CardItemType, StringOrNumber } from "../../Card/types";

export const useDisCover = (): useDisCoverReturn => {
  const { map } = useMap();
  const mapbox = map?.getMap();
  const [mapMode, setMapMode] = useState<"single" | "split">("single");

  const [activeCard, setActiveCard] = useState<StringOrNumber[]>([]);
  const dispatch = useDispatch();

  const handleImageOnMap = (data: CardItemType) => {
    const { borderSourceId, imageSourceId } = generateSourceIds(data);
    if (!mapbox) return;
    if (activeCard.some((item) => item === data.id)) {
      setActiveCard((item) => item.filter((idx) => idx !== data.id));
      removeMapResources(
        mapbox,
        [imageSourceId, borderSourceId],
        [imageSourceId, borderSourceId],
      );
      return;
    }

    setActiveCard((prev) => [...prev, data.id]);

    addSourceAndLayer(mapbox, {
      id: imageSourceId,
      sourceProps: {
        type: "image",
        coordinates: data.coordinates,
        url: data.image,
      },
      layer: {
        id: imageSourceId,
        type: "raster",
        source: imageSourceId,
        paint: {
          "raster-fade-duration": 300,
        },
      },
    });

    addSourceAndLayer(mapbox, {
      id: borderSourceId,
      sourceProps: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[...data.coordinates, data.coordinates[0]]],
          },
          properties: {},
        },
      },
      layer: {
        id: borderSourceId,
        type: "line",
        source: borderSourceId,
        paint: {
          "line-color": "#FF0000",
          "line-width": 3,
        },
      },
    });

    const lngs = data.coordinates.map((coord) => coord[0]);
    const lats = data.coordinates.map((coord) => coord[1]);

    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    mapbox.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        duration: 3000,
        maxZoom: 11,
      },
    );
  };

  const handleDeleteIds = (id: StringOrNumber) => {
    setActiveCard((data) => data.filter((idx) => idx !== id));
  };

  const handleMapMode = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "single" | "split",
  ) => {
    event.stopPropagation();
    if (newAlignment !== null && newAlignment !== mapMode) {
      setMapMode(newAlignment);
      dispatch(setIsSplitMode(newAlignment === "split"));
    }
  };

  return {
    handleImageOnMap,
    activeCard,
    handleDeleteIds,
    mapMode,
    handleMapMode,
  };
};
