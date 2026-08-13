import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import type { SplitDiscoverProps } from "../../types";
import SingleLayoutIcon from "../../../../../public/assets/SingleLayoutIcon";
import SplitLayoutIcon from "../../../../../public/assets/SplitIcon";

export default function SplitDiscover({
  mapMode,
  handleMapMode,
}: SplitDiscoverProps) {
  return (
    <ToggleButtonGroup
      value={mapMode}
      exclusive
      onChange={handleMapMode}
      aria-label="view mode selection"
      color="primary"
    >
      <Tooltip title="Single Mode" arrow placement="top">
        <ToggleButton
          sx={{ padding: "4px 8px" }}
          value="single"
          aria-label="single view"
        >
          <SingleLayoutIcon />
        </ToggleButton>
      </Tooltip>

      <Tooltip title="Split Mode" arrow placement="top">
        <ToggleButton
          sx={{ padding: "4px 8px" }}
          value="split"
          aria-label="split view"
        >
          <SplitLayoutIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}
