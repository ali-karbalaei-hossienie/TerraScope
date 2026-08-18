import JoinLeftIcon from "@mui/icons-material/JoinLeft";
import JoinRightIcon from "@mui/icons-material/JoinRight";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { type FC } from "react";
import { useSideBySideDiscover } from "./hooks/useSideBySideDiscover";
import type { CardItemType } from "../../../../../components/Card/types";
interface SideBySideProps {
  discoverData: CardItemType;
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
        <JoinLeftIcon />
      </ToggleButton>
      <ToggleButton
        sx={{ padding: "0 8px" }}
        value="right"
        aria-label="right aligned"
      >
        <JoinRightIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default SideBySide;
