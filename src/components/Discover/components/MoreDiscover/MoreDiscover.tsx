import AddIcon from "@mui/icons-material/Add";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useDiscoverStyles } from "../../styles/useDiscoverStyles";
import type { DiscoverItemType } from "../../types";
import { useMoreDiscover } from "./hooks/useMoreDiscover";
interface MoreDiscoverProps {
  discoverData: DiscoverItemType;
  onDeleteIds: (id: string | number) => void;
}

const MoreDiscover = ({ discoverData, onDeleteIds }: MoreDiscoverProps) => {
  const { classes } = useDiscoverStyles();
  const { open, handleClick, handleClose, handleRemoveImage, anchorEl } =
    useMoreDiscover({ onDeleteIds });

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
        <MenuItem onClick={handleClose}>Split Mode</MenuItem>
      </Menu>
    </div>
  );
};

export default MoreDiscover;
