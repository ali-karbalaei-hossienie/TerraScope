import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { getGeoman } from "../../map/drawStore";
import DragIcon from "../assets/DragIcon";
import { useStyles } from "../Draw/styles/ToolsStyles";
import MapButton from "../MapButton/MapButton";
import { MapControl } from "../MapControl/MapControl";
import EditIcon from "../assets/EditIcon";
import RotateIcon from "../assets/RotateIcon";
import DeleteIcon from "../assets/DeleteIcon";
type EditMode = "edit" | "change" | "delete" | "drag" | "rotate" | null;

const Edit = () => {
  const [activeMode, setActiveMode] = useState<EditMode>(null);

  console.log(activeMode);

  const { classes } = useStyles();
  const { map } = useMap();

  useEffect(() => {
    const geoman = getGeoman(map);

    if (!geoman) return;

    if (activeMode === null) {
      geoman.disableDraw();
      return;
    }
    switch (activeMode) {
      case "drag":
        geoman.enableGlobalDragMode();
        break;

      case "edit":
        geoman.enableGlobalEditMode();
        break;

      case "rotate":
        geoman.enableGlobalRotateMode();
        break;

      case "delete":
        geoman.enableGlobalRemovalMode();
        break;
    }
  }, [activeMode, map]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    mode: EditMode,
  ) => {
    setActiveMode(mode);
  };

  return (
    <div>
      <MapControl position="right">
        <MapButton title="edit">
          <ToggleButtonGroup
            color="primary"
            value={activeMode}
            exclusive
            onChange={handleChange}
            className={classes["toggle-button-group"]}
          >
            <ToggleButton className={classes["draw-button"]} value="drag">
              <DragIcon />
            </ToggleButton>
            <ToggleButton className={classes["draw-button"]} value="edit">
              <EditIcon />
            </ToggleButton>
            <ToggleButton className={classes["draw-button"]} value="rotate">
              <RotateIcon />
            </ToggleButton>
            <ToggleButton className={classes["draw-button"]} value="delete">
              <DeleteIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </MapButton>
      </MapControl>
    </div>
  );
};

export default Edit;
