import { Box, Slider } from "@mui/material";
import { useTimeLapseSlider } from "./hooks/useTimeLapseSlider";
import { useTimeLapseSliderStyles } from "./styles/useTimeLapseSliderStyles";
import SplitTimeLapse from "./components/SplitTimeLapse/SplitTimeLapse";
import Player from "../../../../../components/Player/Player";

const TimeLapseSlider = () => {
  const {
    isPlay,
    setIsPlay,
    handleChange,
    value,
    mapMode,
    handleMapMode,
    marks,
    valueLabelFormat,
  } = useTimeLapseSlider();

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
              marks={marks.map((mark) => ({
                ...mark,
                label: mark?.label ? mark.label.substring(0, 4) : "",
              }))}
              valueLabelDisplay="auto"
              className={cx(
                classes.timeLapseSlider,
                mapMode === "split" && classes.splitTimeLapsSlider,
              )}
              valueLabelFormat={valueLabelFormat}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TimeLapseSlider;
