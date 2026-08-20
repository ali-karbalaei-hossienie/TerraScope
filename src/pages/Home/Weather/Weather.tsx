import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useWeather } from "./hooks/useWeather";
import { useWeatherStyles } from "./styles/useWeatherStyles";
import { useTranslation } from "react-i18next";

const weatherOptions = [
  {
    value: "clouds",
    label: "clouds",
    src: "/images/clouds.jpg",
    alt: "clouds",
  },
  { value: "rain", label: "rain", src: "/images/rain.jpg", alt: "rain" },
  {
    value: "temperature",
    label: "temperature",
    src: "/images/temp.jpg",
    alt: "temperature map",
  },
  {
    value: "aerosol",
    label: "aerosol",
    src: "/images/drought40.jpg",
    alt: "aerosol map",
  },
  {
    value: "fires",
    label: "fires",
    src: "/images/fires.jpg",
    alt: "fires map",
  },
  {
    value: "seaTemperature",
    label: "seaTemperature",
    src: "/images/seaTemp.jpg",
    alt: "sea temperature map",
  },
];

const Weather = () => {
  const { handleWeather, weather } = useWeather();
  const { classes } = useWeatherStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes["weather"]}>
      <ToggleButtonGroup
        exclusive
        className={classes["weather__group"]}
        value={weather}
        onChange={handleWeather}
      >
        {weatherOptions.map((option) => (
          <Box key={option.value} className={classes["weather__item"]}>
            <ToggleButton
              value={option.value}
              className={classes["weather__item__button"]}
            >
              <img
                className={classes.weather_item__img}
                src={option.src}
                alt={option.alt}
              />
            </ToggleButton>
            <Typography
              variant="caption"
              noWrap
              className={classes["weather__label"]}
              sx={(theme) => ({
                color:
                  weather === option.value
                    ? theme.palette.primary.main
                    : theme.palette.primary.contrastText,
              })}
            >
              {t(option.label as never)}
            </Typography>
          </Box>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default Weather;
