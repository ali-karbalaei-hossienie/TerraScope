import SingleBedIcon from "@mui/icons-material/SingleBed";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import type { SplitDiscoverProps } from "../../types";

export default function SplitDiscover({
  mapMode,
  handleMapMode,
}: SplitDiscoverProps) {
  return (
    <ToggleButtonGroup
      value={mapMode}
      exclusive
      onChange={handleMapMode}
      aria-label="text alignment"
      color="primary"
    >
      <ToggleButton
        sx={{ padding: "8px" }}
        value="single"
        aria-label="left aligned"
      >
        <SingleBedIcon />
      </ToggleButton>
      <ToggleButton
        sx={{ padding: "8px" }}
        value="split"
        aria-label="right aligned"
      >
        <VerticalSplitIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
