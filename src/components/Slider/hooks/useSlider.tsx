import React, { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { setTime } from "../../../features/slider/slider";
import { getSliderData, type SliderItem } from "../../Weather/utils";

interface useSliderReturn {
  sliderData: SliderItem[];
  isPlay: boolean;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  marks: {
    value: number;
    label: React.ReactNode;
  }[];
  currentIndex: number;
  handleChange: (_: Event, newValue: number | number[]) => void;
}

export const useSlider = (): useSliderReturn => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const sliderData = useMemo(() => getSliderData(10, [0, 6, 12, 18]), []);
  const isVisible = useSelector((state: RootState) => state.slider.isVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentSelectedItem = sliderData[currentIndex];
    dispatch(setTime(currentSelectedItem.fullFormatted));
  }, [currentIndex]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      if (!isPlay) return;
      console.log(lastTime, time);

      if (time - lastTime >= 2000) {
        setCurrentIndex((prevIndex) => {
          if (prevIndex >= sliderData.length - 1) {
            setIsPlay(false);
            return 0;
          }
          return prevIndex + 1;
        });
        lastTime = time;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    if (isPlay) {
      animationFrameId = requestAnimationFrame(animate);
    }

    // Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlay, sliderData.length]);

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

  const handleChange = (_: Event, newValue: number | number[]) => {
    setCurrentIndex(newValue as number);
  };

  return {
    sliderData,
    isPlay,
    setIsPlay,
    isVisible,
    marks,
    currentIndex,
    handleChange,
  };
};
