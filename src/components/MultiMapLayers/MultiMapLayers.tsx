import MapButton from "../MapButton/MapButton";
import { MapControl } from "../MapControl/MapControl";
import LayersIcon from "@mui/icons-material/Layers";

const MultiMapLayers = () => {
  return (
    <div>
      <MapControl position="top-left">
        <MapButton newPlacement="right-start" icon={<LayersIcon />}>
          saasas
        </MapButton>
      </MapControl>
    </div>
  );
};

export default MultiMapLayers;
