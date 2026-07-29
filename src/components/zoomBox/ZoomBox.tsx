import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Box, IconButton } from "@mui/material";
import { useCallback, useEffect, useRef, type FC } from "react";
import { MapControl } from "../mapControl/MapControl";
import { NavigationContainer } from "./style/zoomStyle";
import { useMap } from "react-map-gl/mapbox";

const MapNavigation: FC = () => {
  const { map } = useMap();
  const zoomTextRef = useRef<HTMLDivElement>(null);

  const flyToHome = useCallback(() => {
    map?.flyTo({ center: [53.688, 32.4279], zoom: 5, duration: 2000 });
  }, [map]);

  const handleZoomIn = useCallback(() => {
    map?.zoomIn({ duration: 500 });
  }, [map]);

  const handleZoomOut = useCallback(() => {
    map?.zoomOut({ duration: 500 });
  }, [map]);

  useEffect(() => {
    if (!map) return;

    const updateZoom = () => {
      if (zoomTextRef.current) {
        zoomTextRef.current.innerText = String(Math.round(map.getZoom()));
      }
    };

    updateZoom();

    map.on("zoom", updateZoom);

    return () => {
      map.off("zoom", updateZoom);
    };
  }, [map]);

  return (
    <MapControl position="top-left">
      <NavigationContainer>
        <IconButton onClick={flyToHome}>
          <HomeOutlinedIcon />
        </IconButton>
        <Box className="zoomBox">
          <IconButton onClick={handleZoomIn}>
            <AddOutlinedIcon />
          </IconButton>

          <Box ref={zoomTextRef}> {map ? Math.round(map.getZoom()) : 5}</Box>

          <IconButton onClick={handleZoomOut}>
            <RemoveOutlinedIcon />
          </IconButton>
        </Box>
      </NavigationContainer>
    </MapControl>
  );
};

export default MapNavigation;
