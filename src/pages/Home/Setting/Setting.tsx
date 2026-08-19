import { Box, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import ThemeSection from "./components/ThemeSection/ThemeSection";
import { useTranslation } from "react-i18next";

export default function SettingPanel() {
  const [lang, setLang] = React.useState("en");
  const { t } = useTranslation();

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
          value={lang}
          onChange={(e) => setLang(e.target.value)}
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
