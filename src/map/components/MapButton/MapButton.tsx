import {
  ClickAwayListener,
  Fade,
  IconButton,
  Paper,
  Popper,
  Typography,
  type PopperPlacementType,
} from "@mui/material";
import type { CSSProperties } from "@mui/material/styles";
import React, { useState } from "react";
import { useMapButtonStyles } from "./styles/useMapButtonStyles";

interface MapButtonProps {
  children?: React.ReactNode;
  icon: React.ReactNode;
  newPlacement: PopperPlacementType;

  style?: CSSProperties;
}
const MapButton = ({ children, icon, newPlacement, style }: MapButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const { classes } = useMapButtonStyles();

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
        style={style}
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
      <Paper
        elevation={4}
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "12px",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          backgroundColor: "background.paper",
          border: `1px solid ${theme.palette.background.paper}`,
          gap: 0.5,
          width: "fit-content",
          p: 0.5,
        })}
      >
        <IconButton
          disableRipple
          className={classes["mapLayers-button"]}
          onClick={handleClick(newPlacement)}
        >
          {icon}
        </IconButton>
      </Paper>
    </div>
  );
};

export default MapButton;
