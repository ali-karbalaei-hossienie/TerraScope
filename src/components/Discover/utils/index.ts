import type { DiscoverItemType } from "../types";

export const generateSourceIds = (data: DiscoverItemType) => {
  const imageSourceId = `discover-source-${data.id}`;
  const borderSourceId = `discover-border-source-${data.id}`;
  return {
    imageSourceId,
    borderSourceId,
  };
};
