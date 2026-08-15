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
  data: CardItemType;
}

interface DiscoverCardProps extends BaseCardProps {
  mode: "discover";
  handleImageOnMap: (id: CardItemType) => void;
  activeCard?: StringOrNumber[];
  handleDeleteIds: (id: string | number) => void;
  mapMode: MapModeType;
}

interface TimeLapseCardProps extends BaseCardProps {
  mode: "timeLapse";
}
export type CardProps = DiscoverCardProps | TimeLapseCardProps;

export interface MoreCardProps {
  discoverData: CardItemType;
  mode: "discover" | "timeLapse";
}

export type UseMoreDiscoverProps = Omit<MoreCardProps, "discoverData">;

interface BaseCardInnerContentProps {
  data: CardItemType;
}

interface BaseCardInnerContentProps {
  data: CardItemType;
}
interface DiscoverCardInnerContentProps extends BaseCardInnerContentProps {
  mode: "discover";
  mapMode: MapModeType;
}

interface TimeLapseCardInnerContentProps extends BaseCardInnerContentProps {
  mode: "timeLapse";
}

export type CardInnerContentProps =
  | DiscoverCardInnerContentProps
  | TimeLapseCardInnerContentProps;
