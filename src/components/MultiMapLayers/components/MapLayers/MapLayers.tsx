import { Box, Divider, Switch, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMapLayerStyles } from "../../styles/useMapLayerStyles";
import BaseLayer from "../BaseLayer/BaseLayer";
import { SplitMode } from "../SplitMode/SplitMode";
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
const MapLayers = () => {
  const [selectedMap, setSelectedMap] = useState("aquarelle");
  const [isSplitMode, setIsSplitMode] = useState(false);
  const { classes } = useMapLayerStyles();

  return (
    <div>
      <Typography variant="subtitle1">
        {isSplitMode ? "MultiMapLayers" : "MapLayers"}
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Box className={classes["split-mode-toggle"]}>
        <Typography component="div">
          {" "}
          {isSplitMode ? "Single Mode" : "Split Mode"}
        </Typography>
        <Switch onChange={() => setIsSplitMode((prev) => !prev)} />
      </Box>
      <AnimatePresence mode="wait">
        {!isSplitMode ? (
          <motion.div
            key="base-layers"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            <Box className={classes["base-layers-buttons-container"]}>
              {maps.map((map) => (
                <BaseLayer
                  key={map.id}
                  map={map}
                  selectedMap={selectedMap}
                  setSelectedMap={setSelectedMap}
                />
              ))}
            </Box>
          </motion.div>
        ) : (
          <motion.div
            key="split-mode"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <SplitMode />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapLayers;
