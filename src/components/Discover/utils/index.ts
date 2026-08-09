import type { DiscoverItemType } from "../types";

export const initSourceImage = (data: DiscoverItemType) => {
  const imageSourceId = `discover-source-${data.id}`;
  const imageLayerId = `discover-layer-${data.id}`;
  const borderSourceId = `discover-border-source-${data.id}`;
  const borderLayerId = `discover-border-layer-${data.id}`;
  return {
    imageSourceId,
    imageLayerId,
    borderSourceId,
    borderLayerId,
  };
};
