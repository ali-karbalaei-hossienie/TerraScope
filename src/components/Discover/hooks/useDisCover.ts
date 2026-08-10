import { useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useDispatch } from "react-redux";
import type {
  DiscoverItemType,
  StringOrNumber,
  useDisCoverReturn,
} from "../types";
import { initSourceImage } from "../utils";
import { setIsSplitMode } from "../../../features/multiMapLayers/multiMapLayersSlice";

export const useDisCover = (): useDisCoverReturn => {
  const { map } = useMap();
  const mapbox = map?.getMap();
  const [mapMode, setMapMode] = useState<"single" | "split">("single");

  const [activeCard, setActiveCard] = useState<StringOrNumber[]>([]);
  const dispatch = useDispatch();

  const handleImageOnMap = (data: DiscoverItemType) => {
    if (!mapbox) return;
    const { borderLayerId, borderSourceId, imageLayerId, imageSourceId } =
      initSourceImage(data);
    if (mapbox.getSource(imageSourceId)) {
      return;
    }

    setActiveCard((prev) => [...prev, data.id]);

    mapbox.addSource(imageSourceId, {
      type: "image",
      url: data.image,
      coordinates: data.coordinates,
    });

    mapbox.addLayer({
      id: imageLayerId,
      type: "raster",
      source: imageSourceId,
      paint: {
        "raster-fade-duration": 300,
      },
    });

    mapbox.addSource(borderSourceId, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[...data.coordinates, data.coordinates[0]]],
        },
        properties: {},
      },
    });

    mapbox.addLayer({
      id: borderLayerId,
      type: "line",
      source: borderSourceId,
      paint: {
        "line-color": "#FF0000",
        "line-width": 3,
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
