import AddIcon from "@mui/icons-material/Add";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useDiscoverStyles } from "../../styles/useDiscoverStyles";
import { useMoreDiscover } from "./hooks/useMoreDiscover";
import type { MoreDiscoverProps } from "./types";

const MoreDiscover = ({
  discoverData,
  onDeleteIds,
  onVisibleSplitMode,
}: MoreDiscoverProps) => {
  const { classes } = useDiscoverStyles();
  const {
    open,
    handleClick,
    handleClose,
    handleRemoveImage,
    anchorEl,
    handleSplitMode,
    isSplitMode,
  } = useMoreDiscover({ onDeleteIds, onVisibleSplitMode });

  return (
    <div>
      <IconButton
        id="discover-add-button"
        aria-controls={open ? "discover-add-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={classes.addTimelaps}
      >
        <AddIcon />
      </IconButton>

      <Menu
        id="discover-add-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={(e) => handleRemoveImage(e, discoverData)}>
          Remove Image
        </MenuItem>
        <MenuItem onClick={handleClose}>Add to Timelapse</MenuItem>
        <MenuItem onClick={(e) => handleSplitMode(e, discoverData)}>
          {isSplitMode ? "Single Side" : "Side by Side"}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MoreDiscover;
