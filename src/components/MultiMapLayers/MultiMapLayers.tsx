import MapButton from "../MapButton/MapButton";
import { MapControl } from "../MapControl/MapControl";
import LayersIcon from "@mui/icons-material/Layers";
import MapLayers from "./components/MapLayers/MapLayers";
import type { FC } from "react";
import type { ItemLayer } from "./types/mapLayerType";
import { useMultiMapLayers } from "./hooks/useMultiMapLayers";
import { memo } from "react";

interface MultiMapLayersProps {
  extraLeftLayers?: ItemLayer[];
  extraRightLayers?: ItemLayer[];
}

const MultiMapLayers: FC<MultiMapLayersProps> = ({
  extraLeftLayers,
  extraRightLayers,
}) => {
  const { swipeRef, isSplitMode, startDragging } = useMultiMapLayers({
    extraLeftLayers,
    extraRightLayers,
  });

  return (
    <div>
      <MapControl position="top-left">
        <MapButton
          style={{ width: 400 }}
          newPlacement="right-start"
          icon={<LayersIcon />}
        >
          <MapLayers />
        </MapButton>
      </MapControl>
      {isSplitMode && (
        <div
          ref={swipeRef}
          onMouseDown={startDragging}
          onTouchStart={startDragging}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: "4px",
            height: "100%",
            background: "#000",
            borderLeft: "1px solid #000",
            borderRight: "1px solid #000",
            cursor: "ew-resize",
            zIndex: 10,
            transform: "translateX(-50%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "42px",
              height: "42px",
              backgroundColor: "#3b82f6",
              border: "3px solid #fff",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
              userSelect: "none",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M10 19L3 12L10 5V19ZM14 5L21 12L14 19V5Z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(MultiMapLayers);
