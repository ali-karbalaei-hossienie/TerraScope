import { Box } from "@mui/material";
import { useState } from "react";
import LeftLayer from "./components/LeftLayer";
import { useLeftLayerStyles } from "./styles/useLeftLayerStyles";
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

const LeftLayers = () => {
  const [selectedLeftLayers, setSelectedLeftLayers] = useState("aquarelle");

  const { classes } = useLeftLayerStyles();
  return (
    <Box className={classes["left-layers-buttons-container"]}>
      {maps.map((map) => (
        <LeftLayer
          key={map.id}
          map={map}
          selectedLeftLayers={selectedLeftLayers}
          setSelectedLeftLayers={setSelectedLeftLayers}
        />
      ))}
    </Box>
  );
};

export default LeftLayers;
