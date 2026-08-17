import CircleIcon from "@mui/icons-material/Circle";
import GestureIcon from "@mui/icons-material/Gesture";
import PolylineIcon from "@mui/icons-material/Polyline";
import RoomIcon from "@mui/icons-material/Room";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { getGeoman } from "../../map/drawStore";
import PolygonIcon from "../assets/PolygonIcon";
import ExpandableBox from "../ExpandableBox/ExpandableBox";
import MapControl from "../MapControl/MapControl";
import { useStyles } from "./styles/ToolsStyles";

type ModeType = "marker" | "circle" | "polygon" | "line" | null;

const DRAW_MODES = [
  { value: "marker", title: "Marker", icon: <RoomIcon fontSize="small" /> },
  { value: "circle", title: "Circle", icon: <CircleIcon fontSize="small" /> },
  {
    value: "polygon",
    title: "Polygon",
    icon: <PolygonIcon fontSize="small" />,
  },
  { value: "line", title: "Line", icon: <PolylineIcon fontSize="small" /> },
] as const;

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
            {DRAW_MODES.map((mode) => (
              <Tooltip
                key={mode.value}
                title={mode.title}
                placement="left"
                disableInteractive
              >
                <ToggleButton
                  className={classes["draw-button"]}
                  value={mode.value}
                >
                  {mode.icon}
                </ToggleButton>
              </Tooltip>
            ))}
          </ToggleButtonGroup>
        </ExpandableBox>
      </MapControl>
    </div>
  );
};

export default Draw;
