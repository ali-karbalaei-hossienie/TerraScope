import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";

function SideBySide() {
  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      color="primary"
    >
      <ToggleButton
        sx={{ padding: "0 8px" }}
        value="left"
        aria-label="left aligned"
      >
        left
      </ToggleButton>
      <ToggleButton
        sx={{ padding: "0 8px" }}
        value="right"
        aria-label="right aligned"
      >
        right
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default SideBySide;
