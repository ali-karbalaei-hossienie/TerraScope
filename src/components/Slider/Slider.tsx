import { Box, Slider as SliderMui } from "@mui/material";
import { MapControl } from "../MapControl/MapControl";
import Player from "./components/player/Player";
import { useSlider } from "./hooks/useSlider";
import { useSliderStyle } from "./style/useSliderStyle";

const Slider = () => {
  const {
    sliderData,
    isVisible,
    marks,
    setIsPlay,
    isPlay,
    currentIndex,
    handleChange,
  } = useSlider();
  const { classes } = useSliderStyle();

  if (!sliderData.length || !isVisible) return null;

  return (
    <MapControl position="bottom-left">
      <Box className={classes.sliderContainer}>
        <Player isPlay={isPlay} setIsPlay={setIsPlay} />
        <SliderMui
          min={0}
          max={sliderData.length - 1}
          step={1}
          value={currentIndex}
          onChange={handleChange}
          marks={marks}
          valueLabelDisplay="auto"
          valueLabelFormat={(idx) => sliderData[idx]?.timeOnly || ""}
          className={classes.slider}
        />
      </Box>
    </MapControl>
  );
};

export default Slider;
