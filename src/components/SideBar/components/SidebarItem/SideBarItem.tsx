import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useSideBarStyles } from "../../styles/useSideBarStyles";

interface SideBarItemProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  label,
  icon,
  isActive,
  onClick,
}) => {
  const { classes } = useSideBarStyles({ isActive });

  return (
    <ListItem
      className={classes.sidebarListItem}
      onClick={onClick}
      disablePadding
    >
      <ListItemIcon
        sx={{
          minWidth: "auto",
          marginBottom: "4px",
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        slotProps={{
          primary: {
            sx: {
              fontSize: "0.8rem",
              textAlign: "center",
            },
          },
        }}
        primary={label}
      />
    </ListItem>
  );
};

export default SideBarItem;
