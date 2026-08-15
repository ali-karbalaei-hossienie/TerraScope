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

interface BaseCardProps {
  handleDeleteIds: (id: string | number) => void;
  mapMode: MapModeType;
  data: CardItemType;
}

interface DiscoverCardProps extends BaseCardProps {
  mode: "discover";
  handleImageOnMap: (id: CardItemType) => void;
  activeCard?: StringOrNumber[];
}

interface TimeLapseCardProps extends BaseCardProps {
  mode: "timeLapse";
  handleImageOnMap?: never;
  activeCard?: never;
}
export type CardProps = DiscoverCardProps | TimeLapseCardProps;

export interface MoreCardProps {
  discoverData: CardItemType;
  onDeleteIds: (id: string | number) => void;
  mode: "discover" | "timeLapse";
}

export type UseMoreDiscoverProps = Omit<MoreCardProps, "discoverData">;

export type CardInnerContentProps = Pick<
  CardProps,
  "data" | "mapMode" | "handleDeleteIds" | "mode"
>;
