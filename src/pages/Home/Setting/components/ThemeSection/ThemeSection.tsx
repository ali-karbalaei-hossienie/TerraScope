import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store";
import { toggleColorMode } from "../../../../../features/setting/settingSlice";
const ThemeSection = () => {
  const mode = useSelector((state: RootState) => state.setting.mode);
  const dispatch = useDispatch();
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
        Theme
      </Typography>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(e, newTheme) =>
          newTheme && dispatch(toggleColorMode(newTheme))
        }
        fullWidth
        size="small"
        sx={(theme) => ({
          border: `1px solid ${theme.palette.divider}`,
          "& .MuiToggleButton-root": {
            color: theme.palette.text.secondary,
            borderColor: theme.palette.divider,

            "&.Mui-selected": {
              color: theme.palette.primary.main,

              bgcolor: theme.palette.action.selected,

              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            },
          },
        })}
      >
        <ToggleButton value="light">
          <WbSunnyOutlinedIcon sx={{ mr: 1, fontSize: 18 }} /> Light
        </ToggleButton>
        <ToggleButton value="dark">
          <DarkModeOutlinedIcon sx={{ mr: 1, fontSize: 18 }} /> Dark
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ThemeSection;
