import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useWeather } from "./hooks/useWeather";
import { useWeatherStyles } from "./styles/useWeatherStyles";

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
              src="/public/images/clouds.jpg"
              alt="clouds"
            />
          </ToggleButton>
          <Typography
            variant="caption"
            noWrap
            className={classes["weather__label"]}
            sx={(theme) => ({
              color:
                weather === "clouds"
                  ? theme.palette.primary.main
                  : theme.palette.primary.contrastText,
            })}
          >
            Clouds
          </Typography>
        </Box>

        <Box className={classes["weather__item"]}>
          <ToggleButton
            value="rain"
            className={classes["weather__item__button"]}
          >
            <img
              className={classes.weather_item__img}
              src="/public/images/rain.jpg"
              alt="rain"
            />
          </ToggleButton>
          <Typography
            variant="caption"
            noWrap
            className={classes["weather__label"]}
            sx={(theme) => ({
              color:
                weather === "rain"
                  ? theme.palette.primary.main
                  : theme.palette.primary.contrastText,
            })}
          >
            Rain
          </Typography>
        </Box>

        <Box className={classes["weather__item"]}>
          <ToggleButton
            value="temperature"
            className={classes["weather__item__button"]}
          >
            <img
              className={classes.weather_item__img}
              src="/public/images/temp.jpg"
              alt="rain"
            />
          </ToggleButton>
          <Typography
            variant="caption"
            noWrap
            className={classes["weather__label"]}
            sx={(theme) => ({
              color:
                weather === "temperature"
                  ? theme.palette.primary.main
                  : theme.palette.primary.contrastText,
            })}
          >
            Temperature
          </Typography>
        </Box>
        <Box className={classes["weather__item"]}>
          <ToggleButton
            value="aerosol"
            className={classes["weather__item__button"]}
          >
            <img
              className={classes.weather_item__img}
              src="/public/images/drought40.jpg"
              alt="rain"
            />
          </ToggleButton>
          <Typography
            variant="caption"
            noWrap
            className={classes["weather__label"]}
            sx={(theme) => ({
              color:
                weather === "aerosol"
                  ? theme.palette.primary.main
                  : theme.palette.primary.contrastText,
            })}
          >
            Aerosol
          </Typography>
        </Box>
        <Box className={classes["weather__item"]}>
          <ToggleButton
            value="fires"
            className={classes["weather__item__button"]}
          >
            <img
              className={classes.weather_item__img}
              src="/public/images/fires.jpg"
              alt="rain"
            />
          </ToggleButton>
          <Typography
            variant="caption"
            noWrap
            className={classes["weather__label"]}
            sx={(theme) => ({
              color:
                weather === "fires"
                  ? theme.palette.primary.main
                  : theme.palette.primary.contrastText,
            })}
          >
            Fires
          </Typography>
        </Box>

        <Box className={classes["weather__item"]}>
          <ToggleButton
            value="seaTemperature"
            className={classes["weather__item__button"]}
          >
            <img
              className={classes.weather_item__img}
              src="/public/images/seaTemp.jpg"
              alt="rain"
            />
          </ToggleButton>
          <Typography
            variant="caption"
            noWrap
            className={classes["weather__label"]}
            sx={(theme) => ({
              color:
                weather === "seaTemperature"
                  ? theme.palette.primary.main
                  : theme.palette.primary.contrastText,
            })}
          >
            Sea Temperature
          </Typography>
        </Box>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Weather;
