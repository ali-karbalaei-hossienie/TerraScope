import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
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
    <List className={classes.sidebarListItem}>
      <ListItem className={classes.sidebarItem}>
        <ListItemButton
          disableRipple
          className={classes.sidebarButton}
          onClick={onClick}
        >
          {icon}
          <ListItemText
            slotProps={{ primary: { sx: { fontSize: "0.8rem" } } }}
            primary={label}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default SideBarItem;
