import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel,
} from "@mui/material";

// آیکون‌ها
import MapIcon from "@mui/icons-material/Map";
import SatelliteIcon from "@mui/icons-material/Satellite";
import PublicIcon from "@mui/icons-material/Public";
import SearchIcon from "@mui/icons-material/Search";
import DrawIcon from "@mui/icons-material/Create";

export default function DynamicSidebarLayout() {
  // پیش‌فرض روی منوی maps است (یا می‌تواند null باشد تا اول بسته باشد)
  const [activeMenu, setActiveMenu] = useState<string | null>("maps");

  const handleMenuClick = (menu: string) => {
    // اگر روی همان منوی باز کلیک شود، پنل بسته می‌شود؛ در غیر این صورت منوی جدید باز می‌شود
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  const isMenuOpen = Boolean(activeMenu);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        bgcolor: "#121212",
      }}
    >
      {/* ۱. سایدبار اصلی (آیکون‌ها) */}
      <Box
        sx={{
          width: 70,
          minWidth: 70,
          bgcolor: "#1a1a1a",
          borderRight: "1px solid #333",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
          zIndex: 10,
        }}
      >
        <SidebarItem
          icon={<PublicIcon />}
          label="Discover"
          isActive={activeMenu === "discover"}
          onClick={() => handleMenuClick("discover")}
        />
        <SidebarItem
          icon={<MapIcon />}
          label="Maps"
          isActive={activeMenu === "maps"}
          onClick={() => handleMenuClick("maps")}
        />
        <SidebarItem
          icon={<SatelliteIcon />}
          label="Satellite"
          isActive={activeMenu === "satellite"}
          onClick={() => handleMenuClick("satellite")}
        />
      </Box>

      {/* ۲. پنل ثانویه (محتوای داینامیک بر اساس منوی فعال + انیمیشن) */}
      <Box
        sx={{
          width: isMenuOpen ? 320 : 0,
          opacity: isMenuOpen ? 1 : 0,
          transition:
            "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease",
          overflow: "hidden",
          whiteSpace: "nowrap",
          bgcolor: "#242424",
          color: "white",
          display: "flex",
          flexDirection: "column",
          borderRight: isMenuOpen ? "1px solid #333" : "none",
          zIndex: 9,
        }}
      >
        {/* کانتینر با عرض ثابت برای جلوگیری از به‌هم‌ریختگی متن‌ها هنگام انیمیشن */}
        <Box
          sx={{
            width: 320,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 2,
          }}
        >
          {/* هدر پنل (نشان‌دهنده نام منوی فعال) */}
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              textTransform: "capitalize",
              fontWeight: "bold",
              color: "#ffd700",
            }}
          >
            {activeMenu ? `${activeMenu} Panel` : ""}
          </Typography>

          {/* 
            ⭐️ بخش اصلی: تغییر کامپوننت‌ها بر اساس منوی انتخاب شده 
          */}
          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            {activeMenu === "discover" && <DiscoverContent />}
            {activeMenu === "maps" && <MapsContent />}
            {activeMenu === "satellite" && <SatelliteContent />}
          </Box>
        </Box>
      </Box>

      {/* ۳. محتوای نقشه (که با باز و بسته شدن پنل به نرمی جابه‌جا می‌شود) */}
      <Box sx={{ flexGrow: 1, position: "relative", bgcolor: "#e0f7fa" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" color="text.secondary">
            Main Map Area
          </Typography>
        </Box>

        {/* دکمه Draw شناور روی نقشه */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: "#1a1a1a",
            p: 1,
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            border: "2px solid transparent",
            "&:hover": { borderColor: "#ffd700" },
          }}
        >
          <DrawIcon sx={{ color: "#ffd700" }} />
          <Typography variant="caption" sx={{ color: "white" }}>
            Draw
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------
// کامپوننت‌های مجزا برای محتوای هر منو
// ----------------------------------------------------

function MapsContent() {
  return (
    <Box>
      <TextField
        fullWidth
        size="small"
        placeholder="Search maps..."
        variant="outlined"
        sx={{ bgcolor: "white", borderRadius: 1, mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <List>
        {[1, 2, 3].map((item) => (
          <ListItem
            key={item}
            sx={{
              borderBottom: "1px solid #333",
              cursor: "pointer",
              "&:hover": { bgcolor: "#333" },
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#555",
                mr: 2,
                borderRadius: 1,
              }}
            />
            <ListItemText
              primary={`Map Layer of Area ${item}`}
              secondary="by Arabosint X"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function DiscoverContent() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="body2" color="#aaa">
        ابزارها و لایه‌های اکتشافی عمومی:
      </Typography>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="نمایش مرزها"
      />
      <FormControlLabel control={<Switch />} label="نقشه سه‌بعدی" />
    </Box>
  );
}

function SatelliteContent() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="body2" color="#aaa">
        تنظیمات تصاویر ماهواره‌ای:
      </Typography>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="تصاویر حرارتی (Thermal)"
      />
      <FormControlLabel control={<Switch />} label="تصاویر زنده ابر" />
    </Box>
  );
}

function SidebarItem({ icon, label, isActive, onClick }: any) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 1,
        cursor: "pointer",
        color: isActive ? "#ffd700" : "#888",
        transition: "color 0.2s",
        "&:hover": { color: "#fff" },
      }}
    >
      <IconButton sx={{ color: "inherit" }}>{icon}</IconButton>
      <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>
        {label}
      </Typography>
    </Box>
  );
}
