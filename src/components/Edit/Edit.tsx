import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { getGeoman } from "../../map/drawStore";
import AccordionButton from "../AccordionButton/AccordionButton";
import DeleteIcon from "../assets/DeleteIcon";
import DragIcon from "../assets/DragIcon";
import EditIcon from "../assets/EditIcon";
import RotateIcon from "../assets/RotateIcon";
import { useStyles } from "../Draw/styles/ToolsStyles";
import { MapControl } from "../MapControl/MapControl";

type EditMode = "edit" | "change" | "delete" | "drag" | "rotate" | null;

const Edit = () => {
  const [activeMode, setActiveMode] = useState<EditMode>(null);

  const { classes } = useStyles();
  const { map } = useMap();

  useEffect(() => {
    const mapBox = map?.getMap();

    if (!map || !mapBox || !mapBox.isStyleLoaded()) {
      return;
    }

    const geoman = getGeoman(map);

    if (!geoman) return;

    const syncMode = async () => {
      try {
        await Promise.all([
          geoman.disableGlobalDragMode(),
          geoman.disableGlobalEditMode(),
          geoman.disableGlobalRemovalMode(),
          geoman.disableGlobalRotateMode(),
        ]);

        switch (activeMode) {
          case "drag":
            await geoman.enableGlobalDragMode();
            break;

          case "edit":
            await geoman.enableGlobalEditMode();
            break;

          case "rotate":
            await geoman.enableGlobalRotateMode();
            break;

          case "delete":
            await geoman.enableGlobalRemovalMode();
            break;
        }
      } catch (error) {
        console.warn("Geoman edit mode update failed:", error);
      }
    };

    void syncMode();
  }, [activeMode, map]);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    mode: EditMode,
  ) => {
    setActiveMode(mode);
  };

  return (
    <div>
      <MapControl position="right">
        <AccordionButton title="edit">
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
        </AccordionButton>
      </MapControl>
    </div>
  );
};

export default Edit;
