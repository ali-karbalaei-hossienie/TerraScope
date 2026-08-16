import { Box } from "@mui/material";
import { useSidebar } from "../SideBar/SidebarProvider";
import TimeLapseSlider from "../TimelapseSlider/TimeLapseSlider";
import MapBox from "./components/MapBox";

const Map = () => {
  const { activeMenu } = useSidebar();
  return (
    <>
      <Box sx={{ flex: 1, width: "100%", height: "100%" }}>
        <MapBox />
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          transform:
            activeMenu === "timeLapse" ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 10,
          backgroundColor: "background.paper",
        }}
      >
        {activeMenu === "timeLapse" && <TimeLapseSlider />}
      </Box>
    </>
  );
};

export default Map;
