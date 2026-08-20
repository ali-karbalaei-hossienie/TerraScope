import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Tooltip } from "@mui/material";
import type { FC } from "react";
import SplitLayoutIcon from "../../../../../../../../public/assets/SplitIcon";
import SingleLayoutIcon from "../../../../../../../../public/assets/SingleLayoutIcon";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
      <Tooltip title={t("singleMode")} arrow placement="top">
        <ToggleButton
          sx={{ padding: "4px 8px" }}
          value="single"
          aria-label="single view"
        >
          <SingleLayoutIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip title={t("splitMode")} arrow placement="top">
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
