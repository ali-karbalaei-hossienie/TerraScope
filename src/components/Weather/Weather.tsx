import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useWeather } from "./hooks/useWeather";
import { useWeatherStyles } from "./styles/useWeatherStyles";
import { MapControl } from "../MapControl/MapControl";

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
        <Box className={classes["weather__item"]}>
          <ToggleButton
            value="clouds"
            className={classes["weather__item__button"]}
          >
            <img
              className={classes.weather_item__img}
              src="/src/components/Weather/images/clouds.jpg"
              alt="clouds"
            />
          </ToggleButton>
          <Typography
            variant="caption"
            noWrap
            className={classes["weather__label"]}
          >
            clouds
          </Typography>
        </Box>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Weather;
