import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useDispatch } from "react-redux";
import { generateSourceIds, removeMapResources } from "../../../utils";
import {
  addExtraLeftLayers,
  addExtraRightLayers,
  removeExtraLeftLayer,
  removeExtraRightLayer,
} from "../../../../../features/multiMapLayers/multiMapLayersSlice";
import type { DiscoverItemType } from "../../../types";
interface UseSideBySideDiscover {
  discoverData: DiscoverItemType;
}

type Side = "left" | "right";

export const useSideBySideDiscover = ({
  discoverData,
}: UseSideBySideDiscover) => {
  const [alignment, setAlignment] = useState<Side | null>(null);
  const dispatch = useDispatch();
  const { map } = useMap();

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: Side | null,
  ) => {
    event.stopPropagation();
    setAlignment(newAlignment);

    const lngs = discoverData.coordinates.map((coord) => coord[0]);
    const lats = discoverData.coordinates.map((coord) => coord[1]);

    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    map?.fitBounds(
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

  useEffect(() => {
    const { borderSourceId, imageSourceId } = generateSourceIds(discoverData);
    const mapboxMap = map?.getMap();

    // Helper function to remove layers and sources from Redux and Mapbox
    const cleanupSide = (side: Side) => {
      const imgId = `${imageSourceId}-${side}`;
      const borderId = `${borderSourceId}-${side}`;

      const removeAction =
        side === "left" ? removeExtraLeftLayer : removeExtraRightLayer;

      // Remove from Redux
      dispatch(removeAction(imgId));
      dispatch(removeAction(borderId));
      removeMapResources(mapboxMap!, [imgId, borderId], [imgId, borderId]);
    };

    // Helper function to create and add layers and sources
    const setupSide = (side: Side) => {
      const imgId = `${imageSourceId}-${side}`;
      const borderId = `${borderSourceId}-${side}`;

      const addAction =
        side === "left" ? addExtraLeftLayers : addExtraRightLayers;

      // Add image layer
      dispatch(
        addAction({
          id: discoverData.id,
          sourceId: imgId,
          source: {
            type: "image",
            url: discoverData.image,
            coordinates: discoverData.coordinates,
          },
          layer: {
            id: imgId,
            type: "raster",
            source: imgId,
            paint: { "raster-fade-duration": 300 },
          },
        }),
      );

      // Add border layer
      dispatch(
        addAction({
          id: discoverData.id,
          sourceId: borderId,
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [...discoverData.coordinates, discoverData.coordinates[0]],
                ],
              },
              properties: {},
            },
          },
          layer: {
            id: borderId,
            type: "line",
            source: borderId,
            paint: {
              "line-color": "#FF0000",
              "line-width": 3,
            },
          },
        }),
      );
    };
    if (!alignment) {
      return;
    }

    // 2. If alignment is set (left or right), create the layers for that side
    setupSide(alignment);
    return () => {
      cleanupSide(alignment);
    };
  }, [alignment, map, dispatch, discoverData]);

  return {
    handleAlignment,
    alignment,
  };
};
