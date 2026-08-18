import { makeStyles } from "tss-react/mui";

export const useWeatherStyles = makeStyles()((theme) => ({
  weather: {
    marginTop: theme.spacing(2),
  },
  weather__group: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    rowGap: theme.spacing(3),
    columnGap: theme.spacing(1),
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
    padding: 0,
    border: "2px solid transparent",
    transition: "border 0.3s ease-in-out",
    borderRadius: "8px !important",
    overflow: "hidden",
    "&.Mui-selected": {
      border: `2px solid ${theme.palette.primary.main}`,
      transform: "scale(1.05)",
    },
  },
  weather_item__img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  weather__label: {
    fontWeight: 400,
  },
}));
