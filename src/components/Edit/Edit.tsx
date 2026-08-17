import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { getGeoman } from "../../map/drawStore";
import DeleteIcon from "../assets/DeleteIcon";
import DragIcon from "../assets/DragIcon";
import EditIcon from "../assets/EditIcon";
import RotateIcon from "../assets/RotateIcon";
import { useStyles } from "../Draw/styles/ToolsStyles";
import ExpandableBox from "../ExpandableBox/ExpandableBox";
import MapControl from "../MapControl/MapControl";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

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
      <MapControl position="top-right">
        <ExpandableBox
          accordionIcon={
            <ModeEditIcon
              sx={{
                fontSize: 20,
                color: "text.secondary",
              }}
            />
          }
          accordionText="Edit"
        >
          <ToggleButtonGroup
            color="primary"
            value={activeMode}
            exclusive
            onChange={handleChange}
            className={classes["toggle-button-group"]}
          >
            <ToggleButton className={classes["draw-button"]} value="drag">
              <DragIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton className={classes["draw-button"]} value="edit">
              <EditIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton className={classes["draw-button"]} value="rotate">
              <RotateIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton className={classes["draw-button"]} value="delete">
              <DeleteIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </ExpandableBox>
      </MapControl>
    </div>
  );
};

export default Edit;
