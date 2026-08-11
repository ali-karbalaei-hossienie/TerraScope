import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { type FC } from "react";
import { useSideBySideDiscover } from "./hooks/useSideBySideDiscover";
import type { DiscoverItemType } from "../../types";
interface SideBySideProps {
  discoverData: DiscoverItemType;
}
const SideBySide: FC<SideBySideProps> = ({ discoverData }) => {
  const { handleAlignment, alignment } = useSideBySideDiscover({
    discoverData,
  });
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
};

export default SideBySide;
