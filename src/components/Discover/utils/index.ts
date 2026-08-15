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
