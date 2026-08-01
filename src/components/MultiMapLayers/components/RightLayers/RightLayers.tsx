import { Box } from "@mui/material";
import { useState } from "react";
import RightLayer from "./components/RightLayer";
import { useRightLayerStyles } from "./styles/useRightLayerStyles";
const maps = [
  {
    id: "aquarelle",
    name: "Aquarelle",
    image:
      "https://cloud.maptiler.com/static/img/maps/aquarelle-v4.png?t=1785135362",
    tile: "https://api.maptiler.com/maps/aquarelle-v4/style.json?key=OSQvmkeEjIl23WjHmrjA",
  },
  {
    id: "hybrid",
    name: "Hybrid",
    image:
      "https://cloud.maptiler.com/static/img/maps/hybrid-v4.png?t=1785135362",
    tile: "https://api.maptiler.com/maps/hybrid-v4/style.json?key=OSQvmkeEjIl23WjHmrjA",
  },
  {
    id: "topo",
    name: "Topo",
    image:
      "https://cloud.maptiler.com/static/img/maps/topo-v4.png?t=1785135362",
    tile: "https://api.maptiler.com/maps/topo-v4/style.json?key=OSQvmkeEjIl23WjHmrjA",
  },
  {
    id: "landscape",
    name: "Landscape",
    image:
      "https://cloud.maptiler.com/static/img/maps/landscape-v4.png?t=1785135362",
    tile: "https://api.maptiler.com/maps/landscape-v4/style.json?key=OSQvmkeEjIl23WjHmrjA",
  },
  {
    id: "outdoor",
    name: "Outdoor",
    image:
      "https://cloud.maptiler.com/static/img/maps/outdoor-v4.png?t=1785135362",
    tile: "https://api.maptiler.com/maps/outdoor-v4/style.json?key=OSQvmkeEjIl23WjHmrjA",
  },
  {
    id: "osm",
    name: "OpenStreetMap",
    image:
      "https://cloud.maptiler.com/static/img/maps/openstreetmap.png?t=1785135362",
    tile: "https://api.maptiler.com/maps/openstreetmap/style.json?key=OSQvmkeEjIl23WjHmrjA",
  },
];

const RightLayers = () => {
  const [selectedRightLayers, setSelectedRightLayers] = useState("aquarelle");

  const { classes } = useRightLayerStyles();

  return (
    <Box className={classes["right-layers-buttons-container"]}>
      {maps.map((map) => (
        <RightLayer
          key={map.id}
          map={map}
          selectedRightLayers={selectedRightLayers}
          setSelectedRightLayers={setSelectedRightLayers}
        />
      ))}
    </Box>
  );
};

export default RightLayers;
