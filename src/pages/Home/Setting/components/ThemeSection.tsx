import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import { toggleColorMode } from "../../../../features/setting/settingSlice";

const ThemeSection = () => {
  const mode = useSelector((state: RootState) => state.setting.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
        {t("theme")}
      </Typography>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, newTheme) =>
          newTheme && dispatch(toggleColorMode(newTheme))
        }
        fullWidth
        size="small"
        sx={(theme) => ({
          "& .MuiToggleButton-root": {
            color: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            transition: "all 0.3s ease-in-out",

            display: "flex",
            gap: 1,

            "&.Mui-selected": {
              color: theme.palette.primary.main,
              bgcolor: alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity,
              ),
              "&:hover": {
                bgcolor: alpha(
                  theme.palette.primary.main,
                  theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                ),
              },
            },
          },
        })}
      >
        <ToggleButton value="light">
          <WbSunnyOutlinedIcon sx={{ fontSize: 18 }} />
          {t("light")}
        </ToggleButton>
        <ToggleButton value="dark">
          <DarkModeOutlinedIcon sx={{ fontSize: 18 }} />
          {t("dark")}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ThemeSection;
