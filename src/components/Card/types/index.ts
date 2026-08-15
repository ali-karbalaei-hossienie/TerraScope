export interface CardItemType {
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

export type StringOrNumber = string | number;

export type MapModeType = "single" | "split";

export interface CardProps {
  handleImageOnMap?: (id: CardItemType) => void;
  activeCard?: StringOrNumber[];
  handleDeleteIds: (id: string | number) => void;
  mapMode: MapModeType;
  data: CardItemType;
  mode: "discover" | "timeLapse";
}

export interface MoreCardProps {
  discoverData: CardItemType;
  onDeleteIds: (id: string | number) => void;
  mode: "discover" | "timeLapse";
}

export type UseMoreDiscoverProps = Omit<MoreCardProps, "discoverData">;
