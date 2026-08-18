import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useDispatch } from "react-redux";
import {
  addExtraLeftLayers,
  addExtraRightLayers,
  removeExtraLeftLayer,
  removeExtraRightLayer,
} from "../../../../../../features/multiMapLayers/multiMapLayersSlice";
import { fitBounds, generateSourceIds } from "../../../utils";
import { removeMapResources } from "../../../../../../components/utils";
import type { CardItemType } from "../../../../../../components/Card/types";
interface UseSideBySideDiscover {
  discoverData: CardItemType;
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
    if (!map) return;
    event.stopPropagation();
    setAlignment(newAlignment);

    fitBounds(discoverData, map.getMap());
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
