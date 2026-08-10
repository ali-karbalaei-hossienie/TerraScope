import type { DiscoverItemType } from "../../../types";

export interface MoreDiscoverProps {
  discoverData: DiscoverItemType;
  onDeleteIds: (id: string | number) => void;
  onVisibleSplitMode: (id: string | number) => void;
}

export type useMoreDiscoverProps = Omit<MoreDiscoverProps, "discoverData">;
