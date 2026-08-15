import AddIcon from "@mui/icons-material/Add";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useCardStyles } from "../../styles/useCardStyles";
import type { MoreCardProps } from "../../types";
import { useMoreCard } from "./hooks/useMoreCard";

const MoreCard = ({ discoverData, onDeleteIds, mode }: MoreCardProps) => {
  const { classes } = useCardStyles();
  const {
    open,
    handleClick,
    handleClose,
    handleRemoveImage,
    anchorEl,
    addTimeLapse,
    isAlreadyInTimeLapse,
  } = useMoreCard({ onDeleteIds, mode });

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
        {mode === "discover" && (
          <MenuItem onClick={(e) => handleRemoveImage(e, discoverData)}>
            Remove Image
          </MenuItem>
        )}
        <MenuItem
          disabled={isAlreadyInTimeLapse(discoverData)}
          onClick={(e) => addTimeLapse(e, discoverData)}
        >
          {mode === "discover" ? " Add to TimeLapse" : "Remove from TimeLapse"}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MoreCard;
