import { Box, MenuItem, Select, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const LanguageSection = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "fa";

  const handleLanguageChange = (e: any) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  const menuItemSx = (theme: any) => ({
    color: theme.palette.text.primary,
    transition: "all 0.3s ease-in-out",
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
  });

  return (
    <Box>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
        {t("language")}
      </Typography>
      <Select
        value={currentLang}
        onChange={handleLanguageChange}
        fullWidth
        size="small"
        sx={(theme) => ({
          color: theme.palette.primary.main,

          bgcolor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),

          ".MuiSelect-icon": {
            color: theme.palette.primary.main,
          },

          ".MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(theme.palette.primary.main, 0.5),
            transition: "all 0.3s ease-in-out",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
        })}
      >
        <MenuItem sx={menuItemSx} value="en">
          {t("en")}
        </MenuItem>
        <MenuItem sx={menuItemSx} value="fa">
          {t("fa")}
        </MenuItem>
      </Select>
    </Box>
  );
};

export default LanguageSection;
