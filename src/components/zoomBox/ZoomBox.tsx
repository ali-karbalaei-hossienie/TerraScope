import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NavigationOutlinedIcon from "@mui/icons-material/NavigationOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Box, IconButton, Paper } from "@mui/material";
import { useCallback, useEffect, useRef, type FC } from "react";
import { useMap } from "react-map-gl/mapbox";
import MapControl from "../MapControl/MapControl";

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
        compassRef.current.style.transform = `rotate(${-map.getBearing()}deg)`;
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
      <Paper
        elevation={4}
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "12px",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          backgroundColor: "background.paper",
          border: `1px solid ${theme.palette.background.paper}`,
          gap: 0.5,
          p: 0.5,
          width: "fit-content",
        })}
      >
        <IconButton
          sx={(theme) => ({
            boxShadow: theme.shadows[1],
          })}
          onClick={flyToHome}
        >
          <HomeOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton
          sx={(theme) => ({
            boxShadow: theme.shadows[1],
          })}
          onClick={handleZoomIn}
        >
          <AddOutlinedIcon fontSize="small" />
        </IconButton>

        <Box ref={zoomTextRef}> {map ? Math.round(map.getZoom()) : 5}</Box>

        <IconButton
          sx={(theme) => ({
            boxShadow: theme.shadows[1],
          })}
          onClick={handleZoomOut}
        >
          <RemoveOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton
          sx={(theme) => ({
            boxShadow: theme.shadows[1],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
          onClick={handleCompass}
        >
          <Box
            component="span"
            ref={compassRef}
            sx={(theme) => ({
              boxShadow: theme.shadows[1],
              display: "flex",
              transition: "transform 100ms linear",
              transformOrigin: "center",
            })}
            style={{
              display: "flex",
              transition: "transform 100ms linear",
              transformOrigin: "center",
            }}
          >
            <NavigationOutlinedIcon fontSize="small" />
          </Box>
        </IconButton>
      </Paper>
    </MapControl>
  );
};

export default MapNavigation;
