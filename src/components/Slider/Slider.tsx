import { Box, Slider as SliderMui } from "@mui/material";
import { useSlider } from "./hooks/useSlider";
import { useSliderStyle } from "./style/useSliderStyle";
import MapControl from "../../map/components/MapControl/MapControl";
import { useTranslation } from "react-i18next";
import Player from "../Player/Player";

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

  const { i18n } = useTranslation();

  if (!sliderData.length || !isVisible) return null;

  return (
    <MapControl
      position={i18n?.dir() === "ltr" ? "bottom-left" : "bottom-right"}
    >
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
