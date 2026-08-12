import { Box, Slider } from "@mui/material";
import { useTimeLapseSlider } from "./hooks/useTimeLapseSlider";
import Player from "./components/Player/Player";
import { useTimeLapseSliderStyles } from "./styles/useTimeLapseSliderStyles";
import SplitTimeLapse from "./components/SplitTimeLapse/SplitTimeLapse";
import { marks } from "./constants";

const TimeLapseSlider = () => {
  const { isPlay, setIsPlay, handleChange, value, mapMode, handleMapMode } =
    useTimeLapseSlider();

  const { classes, cx } = useTimeLapseSliderStyles();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        paddingX: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          gap: 4,
        }}
      >
        <SplitTimeLapse mapMode={mapMode} handleMapMode={handleMapMode} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "90%",
            gap: "32px",
          }}
        >
          <Box>
            <Player isPlay={isPlay} setIsPlay={setIsPlay} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Slider
              min={0}
              max={marks.length - 1}
              step={null}
              value={value}
              marks={marks}
              valueLabelDisplay="auto"
              className={cx(
                classes.timeLapseSlider,
                mapMode === "split" && classes.splitTimeLapsSlider,
              )}
              valueLabelFormat={(idx) => marks[idx]?.label || ""}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TimeLapseSlider;
