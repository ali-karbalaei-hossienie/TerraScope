import type { MapInstance } from "react-map-gl/mapbox";
import type { CardItemType } from "../../Card/types";

export const generateSourceIds = (data: CardItemType) => {
  const imageSourceId = `discover-source-${data.id}`;
  const borderSourceId = `discover-border-source-${data.id}`;
  return {
    imageSourceId,
    borderSourceId,
  };
};

export const convertedFormatDate = (date: string) => {
  const formatDate = new Date(date);

  const year = formatDate.getFullYear();
  const month = String(formatDate.getMonth() + 1).padStart(2, "0");
  const day = String(formatDate.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};

export const fitBounds = (data: CardItemType, mapbox: MapInstance) => {
  const lngs = data.coordinates.map((coord) => coord[0]);
  const lats = data.coordinates.map((coord) => coord[1]);

  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);

  mapbox.fitBounds(
    [
      [minLng, minLat],
      [maxLng, maxLat],
    ],
    {
      duration: 3000,
      maxZoom: 13,
    },
  );
};
