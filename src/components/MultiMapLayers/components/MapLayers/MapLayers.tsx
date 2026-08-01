import { Box, Divider, Switch, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LAYERS } from "../../constants/layers";
import { useMapLayerStyles } from "../../styles/useMapLayerStyles";
import BaseLayer from "../BaseLayer/BaseLayer";
import { SplitMode } from "../SplitMode/SplitMode";

const MapLayers = () => {
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
              {LAYERS.map((map) => (
                <BaseLayer key={map.id} map={map} />
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
