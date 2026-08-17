import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { setIsSplitMode } from "../../../features/multiMapLayers/multiMapLayersSlice";
import type { CardItemType, StringOrNumber } from "../../Card/types";
import { addSourceAndLayer, removeMapResources } from "../../utils";
import type { useDisCoverReturn } from "../types";
import { fitBounds, generateSourceIds } from "../utils";

export const useDisCover = (): useDisCoverReturn => {
  const { map } = useMap();
  const mapbox = map?.getMap();
  const isSplitMode = useSelector(
    (state: RootState) => state.multiMapLayer.isSplitMode,
  );
  const [mapMode, setMapMode] = useState<"single" | "split">(
    isSplitMode ? "split" : "single",
  );

  const [activeCard, setActiveCard] = useState<StringOrNumber[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (!mapbox) return;
      const style = mapbox.getStyle();

      if (!style) return;

      style.layers?.forEach((layer) => {
        if (layer.id.includes("discover")) {
          if (mapbox.getLayer(layer.id)) mapbox.removeLayer(layer.id);
        }
      });

      Object.keys(style.sources).forEach((sourceId) => {
        if (sourceId.includes("discover")) {
          if (mapbox.getSource(sourceId)) mapbox.removeSource(sourceId);
        }
      });
    };
  }, [mapbox]);

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

    fitBounds(data, mapbox);
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
