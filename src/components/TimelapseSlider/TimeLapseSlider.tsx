import React from "react";
import { Box, Slider } from "@mui/material";
import Player from "./Player/Player";
import { useTimeLapseSliderStyles } from "./styles/useTimeLapseSliderStyles";

const marks = [
  {
    value: 0,
    label: "2026/02/01",
    coordinates: [
      [-122.4, 37.8], // Top-Left
      [-122.39, 37.8], // Top-Right
      [-122.39, 37.79], // Bottom-Right
      [-122.4, 37.79], // Bottom-Left
    ],
    url: "/src/components/Discover/images/140844.png",
  },
  {
    value: 1,
    label: "2026/02/02",
    coordinates: [
      [-122.39, 37.8],
      [-122.38, 37.8],
      [-122.38, 37.79],
      [-122.39, 37.79],
    ],
    url: "/src/components/Discover/images/140802.png",
  },
  {
    value: 2,
    label: "2026/02/03",
    coordinates: [
      [-122.39, 37.8],
      [-122.38, 37.8],
      [-122.38, 37.79],
      [-122.39, 37.79],
    ],
    url: "/src/components/Discover/images/140916.png",
  },
  {
    value: 3,
    label: "2026/02/04",
    coordinates: [
      [-122.38, 37.8],
      [-122.37, 37.8],
      [-122.37, 37.79],
      [-122.38, 37.79],
    ],
    url: "/src/components/Discover/images/141239.png",
  },
  {
    value: 4,
    label: "2026/02/05",
    coordinates: [
      [-122.4, 37.79],
      [-122.39, 37.79],
      [-122.39, 37.78],
      [-122.4, 37.78],
    ],
    url: "/src/components/Discover/images/141266.png",
  },
  {
    value: 5,
    label: "2026/02/05",
    coordinates: [
      [-122.39, 37.79],
      [-122.38, 37.79],
      [-122.38, 37.78],
      [-122.39, 37.78],
    ],
    url: "/src/components/Discover/images/141669.png",
  },
  {
    value: 6,
    label: "2026/02/06",
    coordinates: [
      [-122.38, 37.79],
      [-122.37, 37.79],
      [-122.37, 37.78],
      [-122.38, 37.78],
    ],
    url: "/src/components/Discover/images/141834.png",
  },
  {
    value: 7,
    label: "2026/02/07",
    coordinates: [
      [-122.4, 37.78],
      [-122.39, 37.78],
      [-122.39, 37.77],
      [-122.4, 37.77],
    ],
    url: "/src/components/Discover/images/142060.png",
  },
  {
    value: 8,
    label: "2026/02/08",
    coordinates: [
      [-122.39, 37.78],
      [-122.38, 37.78],
      [-122.38, 37.77],
      [-122.39, 37.77],
    ],
    url: "/src/components/Discover/images/140916.png.png",
  },
  {
    value: 9,
    label: "2026/02/09",
    coordinates: [
      [-122.38, 37.78],
      [-122.37, 37.78],
      [-122.37, 37.77],
      [-122.38, 37.77],
    ],
    url: "/src/components/Discover/images/141834.png",
  },
];

const TimeLapseSlider = () => {
  const isSplit = true;
  const { classes, cx } = useTimeLapseSliderStyles({ isSplit });
  const [value, setValue] = React.useState<number | number[]>(
    isSplit ? [marks[0].value, marks[1].value] : marks[0].value,
  );

  const handleChange = (event: Event, newValue: number[]) => {
    setValue(newValue);
  };

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
          alignItems: "center",
          width: "90%",
          gap: "32px",
        }}
      >
        <Box>
          <Player />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Slider
            min={0}
            max={marks.length - 1}
            step={1}
            value={value}
            marks={marks}
            valueLabelDisplay="auto"
            // className={classes.timeLapseSlider}
            className={cx(
              classes.timeLapseSlider,
              isSplit && classes.splitTimeLapsSlider,
            )}
            valueLabelFormat={(idx) => marks[idx]?.label || ""}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TimeLapseSlider;
