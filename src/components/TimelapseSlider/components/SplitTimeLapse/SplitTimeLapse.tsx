import React from "react";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const SplitTimeLapse = ({ mapMode, handleMapMode }) => {
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
      <ToggleButton
        sx={{ padding: "5px" }}
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
};

export default SplitTimeLapse;
