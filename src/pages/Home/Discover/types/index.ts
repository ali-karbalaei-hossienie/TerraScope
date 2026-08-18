import type {
  CardItemType,
  MapModeType,
  StringOrNumber,
} from "../../../../components/Card/types";

export interface useDisCoverReturn {
  handleImageOnMap: (id: CardItemType) => void;
  activeCard: StringOrNumber[];
  handleDeleteIds: (id: string | number) => void;
  mapMode: MapModeType;
  handleMapMode: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "single" | "split",
  ) => void;
}

export interface SplitDiscoverProps {
  mapMode: MapModeType;
  handleMapMode: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: MapModeType,
  ) => void;
}
