import {
  Box,
  ClickAwayListener,
  Fade,
  IconButton,
  Paper,
  Popper,
  Typography,
  type PopperPlacementType,
} from "@mui/material";
import React, { useState } from "react";
import { MapButtonStyles } from "./styles/MapButtonStyles";

interface MapButtonProps {
  children?: React.ReactNode;
  icon: React.ReactNode;
  newPlacement: PopperPlacementType;
}
const MapButton = ({ children, icon, newPlacement }: MapButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const { classes } = MapButtonStyles();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <div>
      <Popper
        sx={{ zIndex: 1200 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 4],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Typography sx={{ p: 2 }}>{children}</Typography>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Box className={classes["mapLayers-button-container"]}>
        <IconButton
          className={classes["mapLayers-button"]}
          onClick={handleClick(newPlacement)}
        >
          {icon}
        </IconButton>
      </Box>
    </div>
  );
};

export default MapButton;
