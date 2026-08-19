import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSection = () => {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language || "fa";

  const handleLanguageChange = (e: any) => {
    const newLang = e.target.value;

    i18n.changeLanguage(newLang);
  };

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
          color: theme.palette.text.primary,
          ".MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${theme.palette.divider}`,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            // bgcolor: theme.palette.action.hover,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            // color: theme.palette.primary.main,
            // bgcolor: theme.palette.action.selected,
          },
        })}
      >
        <MenuItem
          sx={(theme) => ({
            color: theme.palette.text.primary,
          })}
          value="en"
        >
          {t("en")}
        </MenuItem>
        <MenuItem
          sx={(theme) => ({
            color: theme.palette.text.primary,
          })}
          value="fa"
        >
          {t("fa")}
        </MenuItem>
      </Select>
    </Box>
  );
};

export default LanguageSection;
