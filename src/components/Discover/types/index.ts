export type StringOrNumber = string | number;
export interface useDisCoverReturn {
  handleImageOnMap: (id: DiscoverItemType) => void;
  activeCard: StringOrNumber[];
  handleDeleteIds: (id: string | number) => void;
  handleVisibleSplitMode: (id: string | number) => void;
  activeSplit: StringOrNumber[];
}

export interface DiscoverItemType {
  id: string | number;
  title: string;
  image: string;
  description: string;
  coordinates: [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ];
}
