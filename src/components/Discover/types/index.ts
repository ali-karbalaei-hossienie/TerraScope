export type StringOrNumber = string | number;
export interface useDisCoverReturn {
  handleImageOnMap: (id: DiscoverItemType) => void;
  addedIds: StringOrNumber[];
  handleDeleteIds: (id: string | number) => void;
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
