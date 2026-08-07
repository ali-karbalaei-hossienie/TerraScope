import { makeStyles } from "tss-react/mui";

export const useWeatherStyles = makeStyles()((theme) => ({
  weather: {
    display: "flex",
    flexWrap: "wrap",
  },
  weather__group: {
    display: "flex",
    gap: theme.spacing(1),
    alignItems: "center",
  },
  weather__item: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    justifyContent: "center",
  },
  weather__item__button: {
    width: 80,
    height: 80,
    border: "none",
    padding: 0,
  },
  weather_item__img: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    objectFit: "cover",
  },
  weather__label: {
    color: "#ffffff",
    fontWeight: 400,
  },
}));
