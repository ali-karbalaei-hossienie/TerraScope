import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SingleLayoutIcon from "../../../../../public/assets/SingleLayoutIcon";
import SplitLayoutIcon from "../../../../../public/assets/SplitIcon";
import { Tooltip } from "@mui/material";
import type { FC } from "react";

interface SplitTimeLapseProps {
  mapMode: "single" | "split";
  handleMapMode: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "single" | "split",
  ) => void;
}

const SplitTimeLapse: FC<SplitTimeLapseProps> = ({
  mapMode,
  handleMapMode,
}) => {
  return (
    <ToggleButtonGroup
      value={mapMode}
      exclusive
      onChange={handleMapMode}
      aria-label="text alignment"
      color="primary"
      size="small"
      sx={{ marginTop: 2 }}
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
};

export default SplitTimeLapse;
