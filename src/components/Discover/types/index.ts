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
  coordinates: [number, number][];
}

type Coordinate = [number, number];

type ImageCoordinates = [Coordinate, Coordinate, Coordinate, Coordinate];

export interface DiscoverItem {
  id: string | number;
  title: string;
  image: string;
  description: string;
  coordinates: ImageCoordinates;
}
