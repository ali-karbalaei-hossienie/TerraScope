import { Box, IconButton, Typography } from "@mui/material";
import { type FC, type ReactNode } from "react";
import { useSideBarStyles } from "../../styles/useSideBarStyles";

interface SideBarItemProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SideBarItem: FC<SideBarItemProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => {
  const { classes } = useSideBarStyles({ isActive });

  return (
    <Box onClick={onClick} className={classes.sidebarItem}>
      <IconButton sx={{ color: "inherit" }}>{icon}</IconButton>
      <Typography variant="button">{label}</Typography>
    </Box>
  );
};

export default SideBarItem;
