import type { Geoman } from "@geoman-io/mapbox-geoman-free";
import CircleIcon from "@mui/icons-material/Circle";
import PolylineIcon from "@mui/icons-material/Polyline";
import RoomIcon from "@mui/icons-material/Room";
import { Button } from "@mui/material";
import { useMap, type MapRef } from "react-map-gl/mapbox";
import { getGeoman } from "../../map/drawStore";
import PolygonIcon from "../assets/PolygonIcon";
import MapButton from "../MapButton/MapButton";
import { MapControl } from "../MapControl/MapControl";
import { useStyles } from "./styles/ToolsStyles";

type ModeType = "marker" | "circle" | "polygon" | "line";

const helper = (map: MapRef | undefined, mode: ModeType) => {
  const geoman = getGeoman(map);

  if (!geoman) return;

  const activeModes = geoman.getActiveDrawModes();

  if (activeModes.includes(mode)) {
    geoman.disableDraw();
  } else {
    geoman.enableDraw(mode);
  }
};

const Tools = () => {
  const { classes } = useStyles();
  const { map } = useMap();
  const handleDrawPoint = (mode: ModeType) => {
    helper(map, mode);
  };
  const handleDrawCircle = (mode: ModeType) => {
    helper(map, mode);
  };

  const handleDrawPolygon = (mode: ModeType) => {
    helper(map, mode);
  };

  const handleDrawLine = (mode: ModeType) => {
    helper(map, mode);
  };

  return (
    <div>
      <MapControl position="right">
        <MapButton>
          <Button
            onClick={() => handleDrawPoint("marker")}
            className={classes["tools__draw-button"]}
          >
            <RoomIcon />
          </Button>
          <Button
            onClick={() => handleDrawCircle("circle")}
            className={classes["tools__draw-button"]}
          >
            <CircleIcon />
          </Button>
          <Button
            onClick={() => handleDrawPolygon("polygon")}
            className={classes["tools__draw-button"]}
          >
            <PolygonIcon />
          </Button>
          <Button
            onClick={() => handleDrawLine("line")}
            className={classes["tools__draw-button"]}
          >
            <PolylineIcon />
          </Button>
        </MapButton>
      </MapControl>
    </div>
  );
};

export default Tools;
