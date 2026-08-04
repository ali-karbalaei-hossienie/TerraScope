import React from "react";
const data = [
  {
    id: 1,
    source: "rainviewer",
    type: "rainy",
    url: "https://api.rainviewer.com/public/weather-maps.json",
  },
  {
    id: 2,
    source: "nasa",
    type: "cloud",
    url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Land_Surface_Temp_Day/default/{date}/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png",
    date: [""],
  },
];
const Weather = () => {
  return <div></div>;
};

export default Weather;
