export type StringOrNumber = string | number;

export type MapModeType = "single" | "split";
export interface useDisCoverReturn {
  handleImageOnMap: (id: DiscoverItemType) => void;
  activeCard: StringOrNumber[];
  handleDeleteIds: (id: string | number) => void;
  mapMode: MapModeType;
  handleMapMode: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "single" | "split",
  ) => void;
}

export interface MoreDiscoverProps {
  discoverData: DiscoverItemType;
  onDeleteIds: (id: string | number) => void;
  mode: "discover" | "timeLapse";
}

export type UseMoreDiscoverProps = Omit<MoreDiscoverProps, "discoverData">;

export interface SplitDiscoverProps {
  mapMode: MapModeType;
  handleMapMode: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: MapModeType,
  ) => void;
}

export interface DiscoverItemType {
  id: string | number;
  title: string;
  image: string;
  description: string;
  createdAt: string;
  coordinates: [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ];
}
