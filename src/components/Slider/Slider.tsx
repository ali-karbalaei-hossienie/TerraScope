import React, { useState, useEffect, useMemo } from "react";
import { Box, Slider as SliderMui } from "@mui/material";
import { MapControl } from "../MapControl/MapControl";
import Player from "./components/player/Player";
import { useSlider } from "./style/useSlider";
import { getSliderData } from "../Weather/utils";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { setTime } from "../../features/slider/slider";

const Slider = () => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const sliderData = useMemo(() => getSliderData(10, [0, 6, 12, 18]), []);
  const { classes } = useSlider();
  const isVisible = useSelector((state: RootState) => state.slider.isVisible);
  const dispatch = useDispatch();

  // const currentSelectedItem = sliderData[currentIndex];

  useEffect(() => {
    const currentSelectedItem = sliderData[currentIndex];
    dispatch(setTime(currentSelectedItem.fullFormatted));
  }, [currentIndex]);

  const marks = useMemo(() => {
    const generatedMarks: { value: number; label: React.ReactNode }[] = [];

    sliderData.forEach((item, index) => {
      const isFirstHourOfDay =
        index === 0 || sliderData[index - 1].dateOnly !== item.dateOnly;

      if (isFirstHourOfDay) {
        const dayLabel = item.dateObj.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
        });

        generatedMarks.push({
          value: index,
          label: (
            <span style={{ display: "flex", alignItems: "center" }}>
              {dayLabel}
            </span>
          ),
        });
      }
    });

    return generatedMarks;
  }, [sliderData]);

  // انیمیشن پخش
  // useEffect(() => {
  //   let interval: NodeJS.Timeout;
  //   if (isPlay) {
  //     interval = setInterval(() => {
  //       setCurrentIndex((prevIndex) => {
  //         if (prevIndex >= sliderData.length - 1) {
  //           setIsPlay(false);
  //           return 0;
  //         }
  //         return prevIndex + 1;
  //       });
  //     }, 800);
  //   }
  //   return () => clearInterval(interval);
  // }, [isPlay, sliderData.length]);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setCurrentIndex(newValue as number);
  };

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
