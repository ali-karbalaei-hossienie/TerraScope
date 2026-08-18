import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useWeather } from "./hooks/useWeather";
import { useWeatherStyles } from "./styles/useWeatherStyles";

const weatherOptions = [
  {
    value: "clouds",
    label: "Clouds",
    src: "/images/clouds.jpg",
    alt: "clouds",
  },
  { value: "rain", label: "Rain", src: "/images/rain.jpg", alt: "rain" },
  {
    value: "temperature",
    label: "Temperature",
    src: "/images/temp.jpg",
    alt: "temperature map",
  },
  {
    value: "aerosol",
    label: "Aerosol",
    src: "/images/drought40.jpg",
    alt: "aerosol map",
  },
  {
    value: "fires",
    label: "Fires",
    src: "/images/fires.jpg",
    alt: "fires map",
  },
  {
    value: "seaTemperature",
    label: "Sea Temperature",
    src: "/images/seaTemp.jpg",
    alt: "sea temperature map",
  },
];

const Weather = () => {
  const { handleWeather, weather } = useWeather();
  const { classes } = useWeatherStyles();

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
              {option.label}
            </Typography>
          </Box>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default Weather;
