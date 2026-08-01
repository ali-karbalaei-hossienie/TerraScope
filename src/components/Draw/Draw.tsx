import CircleIcon from "@mui/icons-material/Circle";
import PolylineIcon from "@mui/icons-material/Polyline";
import RoomIcon from "@mui/icons-material/Room";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { getGeoman } from "../../map/drawStore";
import PolygonIcon from "../assets/PolygonIcon";
import { MapControl } from "../MapControl/MapControl";
import { useStyles } from "./styles/ToolsStyles";
import AccordionButton from "../AccordionButton/AccordionButton";

type ModeType = "marker" | "circle" | "polygon" | "line" | null;

const Draw = () => {
  const [activeMode, setActiveMode] = useState<ModeType>(null);

  const { classes } = useStyles();
  const { map } = useMap();

  useEffect(() => {
    const geoman = getGeoman(map);

    if (!geoman) return;

    if (activeMode === null) {
      geoman.disableDraw();
      return;
    }

    geoman.enableDraw(activeMode);
  }, [activeMode, map]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    mode: ModeType,
  ) => {
    setActiveMode(mode);
  };

  return (
    <div>
      <MapControl position="right">
        <AccordionButton title="draw">
          <ToggleButtonGroup
            color="primary"
            value={activeMode}
            exclusive
            onChange={handleChange}
            className={classes["toggle-button-group"]}
          >
            <ToggleButton className={classes["draw-button"]} value="marker">
              <RoomIcon />
            </ToggleButton>
            <ToggleButton className={classes["draw-button"]} value="circle">
              <CircleIcon />
            </ToggleButton>
            <ToggleButton className={classes["draw-button"]} value="polygon">
              <PolygonIcon />
            </ToggleButton>
            <ToggleButton className={classes["draw-button"]} value="line">
              <PolylineIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </AccordionButton>
      </MapControl>
    </div>
  );
};

export default Draw;
