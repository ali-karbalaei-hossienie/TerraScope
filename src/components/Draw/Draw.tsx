import CircleIcon from "@mui/icons-material/Circle";
import GestureIcon from "@mui/icons-material/Gesture";
import PolylineIcon from "@mui/icons-material/Polyline";
import RoomIcon from "@mui/icons-material/Room";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { getGeoman } from "../../map/drawStore";
import PolygonIcon from "../assets/PolygonIcon";
import ExpandableBox from "../ExpandableBox/ExpandableBox";
import MapControl from "../MapControl/MapControl";
import { useStyles } from "./styles/ToolsStyles";

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
    _event: React.MouseEvent<HTMLElement>,
    mode: ModeType,
  ) => {
    setActiveMode(mode);
  };

  return (
    <div>
      <MapControl position="top-right">
        <ExpandableBox
          accordionText="Draw"
          accordionIcon={
            <GestureIcon
              sx={{
                fontSize: 20,
                color: "text.secondary",
              }}
            />
          }
        >
          <ToggleButtonGroup
            color="primary"
            value={activeMode}
            exclusive
            onChange={handleChange}
            className={classes["toggle-button-group"]}
            size="small"
          >
            <ToggleButton className={classes["draw-button"]} value="marker">
              <RoomIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton className={classes["draw-button"]} value="circle">
              <CircleIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton className={classes["draw-button"]} value="polygon">
              <PolygonIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton className={classes["draw-button"]} value="line">
              <PolylineIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </ExpandableBox>
      </MapControl>
    </div>
  );
};

export default Draw;
