import type {
  CustomLayerInterface,
  LayerSpecification,
  Map as MapboxMap,
} from "mapbox-gl";
import { useCallback, useEffect, useRef } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

const BASE_SOURCE_LEFT_ID = "base-source-left";
const BASE_SOURCE_RIGHT_ID = "base-source-right";

const BASE_LAYER_LEFT_ID = "base-layer-left";
const BASE_LAYER_RIGHT_ID = "base-layer-right";

const BASE_SOURCE_ID = "base-source";
const BASE_LAYER_ID = "base-layer";

const LEFT_SCISSOR_LAYER_ID = "left-scissor";
const RIGHT_SCISSOR_LAYER_ID = "right-scissor";
const DISABLE_SCISSOR_LAYER_ID = "disable-scissor";

const GEOMAN_REFERENCE_LAYER = "gm_main-polygon__fill-layer-0";

type ScissorLayer = CustomLayerInterface & {
  map?: MapboxMap;
};

export const useMultiMapLayers = () => {
  const {
    selectedBaseLayers,
    selectedLeftLayers,
    selectedRightLayers,
    isSplitMode,
  } = useSelector((state: RootState) => state.multiMapLayer);

  const { current: map } = useMap();
  const swipeRef = useRef<HTMLDivElement | null>(null);
  const swipeRatio = useRef(0.5);
  const isDraggingRef = useRef(false);

  const removeLayerIfExists = useCallback((mapBox: MapboxMap, id: string) => {
    if (mapBox.getLayer(id)) {
      mapBox.removeLayer(id);
    }
  }, []);

  const removeSourceIfExists = useCallback((mapBox: MapboxMap, id: string) => {
    if (mapBox.getSource(id)) {
      mapBox.removeSource(id);
    }
  }, []);

  const cleanupSplitModeLayers = useCallback(
    (mapBox: MapboxMap) => {
      removeLayerIfExists(mapBox, LEFT_SCISSOR_LAYER_ID);
      removeLayerIfExists(mapBox, RIGHT_SCISSOR_LAYER_ID);
      removeLayerIfExists(mapBox, DISABLE_SCISSOR_LAYER_ID);
      removeLayerIfExists(mapBox, BASE_LAYER_LEFT_ID);
      removeLayerIfExists(mapBox, BASE_LAYER_RIGHT_ID);
      removeSourceIfExists(mapBox, BASE_SOURCE_LEFT_ID);
      removeSourceIfExists(mapBox, BASE_SOURCE_RIGHT_ID);
    },
    [removeLayerIfExists, removeSourceIfExists],
  );

  const cleanupBaseLayer = useCallback(
    (mapBox: MapboxMap) => {
      removeLayerIfExists(mapBox, BASE_LAYER_ID);
      removeSourceIfExists(mapBox, BASE_SOURCE_ID);
    },
    [removeLayerIfExists, removeSourceIfExists],
  );

  const safeAddLayer = useCallback(
    (mapBox: MapboxMap, layer: LayerSpecification | CustomLayerInterface) => {
      if (mapBox.getLayer(layer.id)) return;

      if (mapBox.getLayer(GEOMAN_REFERENCE_LAYER)) {
        mapBox.addLayer(layer as LayerSpecification, GEOMAN_REFERENCE_LAYER);
      } else {
        mapBox.addLayer(layer as LayerSpecification);
      }
    },
    [],
  );
  const ensureBaseLayer = useCallback(
    (mapBox: MapboxMap, tile: string) => {
      const existingSource = mapBox.getSource(BASE_SOURCE_ID);

      if (existingSource) {
        if ("setTiles" in existingSource) {
          existingSource.setTiles([tile]);
        }
      } else {
        mapBox.addSource(BASE_SOURCE_ID, {
          type: "raster",
          tiles: [tile],
          tileSize: 256,
        });
      }

      if (!mapBox.getLayer(BASE_LAYER_ID)) {
        safeAddLayer(mapBox, {
          id: BASE_LAYER_ID,
          type: "raster",
          source: BASE_SOURCE_ID,
        } satisfies LayerSpecification);
      }
    },
    [safeAddLayer],
  );

  const getSwipePosition = useCallback((mapBox: MapboxMap) => {
    const canvas = mapBox.getCanvas();
    return canvas.width * swipeRatio.current;
  }, []);

  const setupSplitModeLayers = useCallback(
    (mapBox: MapboxMap) => {
      cleanupBaseLayer(mapBox);

      const leftTile = selectedLeftLayers[0]?.tile ?? "";
      const rightTile = selectedRightLayers[0]?.tile ?? "";

      const leftSource = mapBox.getSource(BASE_SOURCE_LEFT_ID);
      if (leftSource) {
        if ("setTiles" in leftSource) {
          leftSource.setTiles([leftTile]);
        }
      } else {
        mapBox.addSource(BASE_SOURCE_LEFT_ID, {
          type: "raster",
          tiles: [leftTile],
          tileSize: 256,
        });
      }

      const rightSource = mapBox.getSource(BASE_SOURCE_RIGHT_ID);
      if (rightSource) {
        if ("setTiles" in rightSource) {
          rightSource.setTiles([rightTile]);
        }
      } else {
        mapBox.addSource(BASE_SOURCE_RIGHT_ID, {
          type: "raster",
          tiles: [rightTile],
          tileSize: 256,
        });
      }

      const leftScissorLayer: ScissorLayer = {
        id: LEFT_SCISSOR_LAYER_ID,
        type: "custom",
        renderingMode: "2d",
        onAdd(mapObj) {
          this.map = mapObj;
        },
        render(gl) {
          const canvas = this.map?.getCanvas();
          if (!canvas) return;

          gl.enable(gl.SCISSOR_TEST);
          gl.scissor(0, 0, getSwipePosition(mapBox), canvas.height);
        },
      };

      const rightScissorLayer: ScissorLayer = {
        id: RIGHT_SCISSOR_LAYER_ID,
        type: "custom",
        renderingMode: "2d",
        onAdd(mapObj) {
          this.map = mapObj;
        },
        render(gl) {
          const canvas = this.map?.getCanvas();
          if (!canvas) return;

          const position = getSwipePosition(mapBox);
          gl.enable(gl.SCISSOR_TEST);
          gl.scissor(position, 0, canvas.width - position, canvas.height);
        },
      };

      const disableScissorLayer: ScissorLayer = {
        id: DISABLE_SCISSOR_LAYER_ID,
        type: "custom",
        renderingMode: "2d",
        render(gl) {
          gl.disable(gl.SCISSOR_TEST);
        },
      };

      safeAddLayer(mapBox, leftScissorLayer);
      safeAddLayer(mapBox, {
        id: BASE_LAYER_LEFT_ID,
        type: "raster",
        source: BASE_SOURCE_LEFT_ID,
      } satisfies LayerSpecification);

      safeAddLayer(mapBox, rightScissorLayer);
      safeAddLayer(mapBox, {
        id: BASE_LAYER_RIGHT_ID,
        type: "raster",
        source: BASE_SOURCE_RIGHT_ID,
      } satisfies LayerSpecification);

      safeAddLayer(mapBox, disableScissorLayer);
    },
    [
      cleanupBaseLayer,
      getSwipePosition,
      selectedLeftLayers,
      selectedRightLayers,
      safeAddLayer,
    ],
  );

  useEffect(() => {
    if (!map) return;
    const mapBox = map.getMap();

    const updateMapLayers = () => {
      if (isSplitMode) {
        setupSplitModeLayers(mapBox);
      } else {
        cleanupSplitModeLayers(mapBox);
        ensureBaseLayer(mapBox, selectedBaseLayers[0]?.tile ?? "");
      }
    };

    if (mapBox.isStyleLoaded()) {
      updateMapLayers();
    } else {
      mapBox.once("style.load", updateMapLayers);
    }

    return () => {
      cleanupSplitModeLayers(mapBox);
      cleanupBaseLayer(mapBox);
      mapBox.off("style.load", updateMapLayers);
    };
  }, [
    map,
    isSplitMode,
    selectedBaseLayers,
    selectedLeftLayers,
    selectedRightLayers,
    cleanupBaseLayer,
    cleanupSplitModeLayers,
    ensureBaseLayer,
    setupSplitModeLayers,
  ]);

  const startDragging = () => {
    isDraggingRef.current = true;
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    if (!map || !isSplitMode) return;

    const mapBox = map.getMap();

    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;

      const clientX =
        "touches" in event ? event.touches[0]?.clientX : event.clientX;
      if (clientX === undefined) return;

      const rect = mapBox.getContainer().getBoundingClientRect();

      const position = Math.max(0, Math.min(rect.width, clientX - rect.left));

      swipeRatio.current = position / rect.width;

      if (swipeRef.current) {
        swipeRef.current.style.left = `${position}px`;
      }

      mapBox.triggerRepaint();
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", stopDragging);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", stopDragging);
    };
  }, [map, isSplitMode]);

  return { swipeRef, isSplitMode, startDragging };
};
