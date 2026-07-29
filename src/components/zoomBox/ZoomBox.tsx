import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NavigationOutlinedIcon from "@mui/icons-material/NavigationOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Box, IconButton } from "@mui/material";
import { useCallback, useEffect, useRef, type FC } from "react";
import { useMap } from "react-map-gl/mapbox";
import { MapControl } from "../mapControl/MapControl";
import { NavigationContainer } from "./style/zoomStyle";

const MapNavigation: FC = () => {
  const { map } = useMap();
  const zoomTextRef = useRef<HTMLDivElement>(null);
  const compassRef = useRef<HTMLSpanElement>(null);

  const flyToHome = useCallback(() => {
    map?.flyTo({ center: [53.688, 32.4279], zoom: 5, duration: 2000 });
  }, []);

  const handleZoomIn = useCallback(() => {
    map?.zoomIn({ duration: 500 });
  }, []);

  const handleZoomOut = useCallback(() => {
    map?.zoomOut({ duration: 500 });
  }, []);

  const handleCompass = useCallback(() => {
    map?.resetNorth({ duration: 500 });
  }, []);

  useEffect(() => {
    if (!map) return;

    const updateZoom = () => {
      if (zoomTextRef.current) {
        zoomTextRef.current.innerText = String(Math.round(map.getZoom()));
      }
    };

    const updateCompass = () => {
      if (compassRef.current) {
        compassRef.current.style.transform = `rotate(${-map.getBearing() - 45}deg)`;
      }
    };

    updateZoom();
    updateCompass();

    map.on("zoom", updateZoom);
    map.on("rotate", updateCompass);

    return () => {
      map.off("zoom", updateZoom);
      map.off("rotate", updateCompass);
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
          <IconButton
            sx={{
              display: "flex !important",
              alignItems: "center !important",
              justifyContent: "center !important",
            }}
            onClick={handleCompass}
          >
            <span
              ref={compassRef}
              style={{
                display: "flex",
                transition: "transform 100ms linear",
                transformOrigin: "center",
              }}
            >
              <NavigationOutlinedIcon />
            </span>
          </IconButton>
        </Box>
      </NavigationContainer>
    </MapControl>
  );
};

export default MapNavigation;
