import { Box, Slider as SliderMui } from "@mui/material";
import { useState } from "react";
import { MapControl } from "../MapControl/MapControl";
import Player from "./components/player/Player";
import { useSlider } from "./style/useSlider";
const CrownIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="#fbc02d" // رنگ طلایی
    style={{ marginLeft: "4px", marginBottom: "2px" }}
  >
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
  </svg>
);
const marks = [
  { value: 0, label: "Wed 5" },
  { value: 10, label: "Thurs 6" },
  { value: 20, label: "Fri 7" },
  { value: 30, label: "Sat 8" },
  { value: 40, label: "Sun 9" },
  { value: 50, label: "Mon 10" },
  {
    value: 60,
    label: (
      <span style={{ display: "flex", alignItems: "center" }}>
        Tue 11 <CrownIcon />
      </span>
    ),
  },
  {
    value: 70,
    label: (
      <span style={{ display: "flex", alignItems: "center" }}>
        Wed 12 <CrownIcon />
      </span>
    ),
  },
  {
    value: 80,
    label: (
      <span style={{ display: "flex", alignItems: "center" }}>
        Thu 13 <CrownIcon />
      </span>
    ),
  },
  {
    value: 90,
    label: (
      <span style={{ display: "flex", alignItems: "center" }}>
        Fri 14 <CrownIcon />
      </span>
    ),
  },
];

const Slider = () => {
  const { classes } = useSlider();
  const [isPlay, setIsPlay] = useState(false);
  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (
    <MapControl position="bottom-left">
      <Box className={classes.sliderContainer}>
        <Player isPlay={isPlay} setIsPlay={setIsPlay} />
        <SliderMui
          getAriaValueText={valuetext}
          marks={marks}
          valueLabelDisplay="on"
          className={classes.slider}
        />
      </Box>
    </MapControl>
  );
};

export default Slider;
