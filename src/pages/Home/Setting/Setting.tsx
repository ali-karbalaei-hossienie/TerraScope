import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ThemeSection from "./components/ThemeSection/ThemeSection";

export default function SettingPanel() {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language || "fa";

  const handleLanguageChange = (e: any) => {
    const newLang = e.target.value;

    i18n.changeLanguage(newLang);
  };

  return (
    <>
      {/* Theme Section */}
      <ThemeSection />

      {/* Language Section */}
      <Box>
        <Typography variant="body2" sx={{ color: "#aaa", mb: 1.5 }}>
          {t("language")}
        </Typography>
        <Select
          value={currentLang}
          onChange={handleLanguageChange}
          fullWidth
          size="small"
          sx={{
            color: "#fff",
            ".MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffb74d",
            },
            ".MuiSvgIcon-root": { color: "#aaa" },
          }}
        >
          <MenuItem value="en">{t("en")}</MenuItem>
          <MenuItem value="fa">{t("fa")}</MenuItem>
        </Select>
      </Box>
    </>
  );
}
