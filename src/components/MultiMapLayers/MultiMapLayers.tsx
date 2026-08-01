import MapButton from "../MapButton/MapButton";
import { MapControl } from "../MapControl/MapControl";
import LayersIcon from "@mui/icons-material/Layers";
import MapLayers from "./components/MapLayers/MapLayers";

const MultiMapLayers = () => {
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
    </div>
  );
};

export default MultiMapLayers;
