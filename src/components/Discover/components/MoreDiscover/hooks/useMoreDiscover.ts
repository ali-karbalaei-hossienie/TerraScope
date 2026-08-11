import { useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store";
import type { DiscoverItemType, UseMoreDiscoverProps } from "../../../types";
import { generateSourceIds, removeMapResources } from "../../../utils";

export const useMoreDiscover = ({ onDeleteIds }: UseMoreDiscoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { map } = useMap();
  const mapBox = map?.getMap();
  const open = Boolean(anchorEl);
  const { isSplitMode } = useSelector(
    (state: RootState) => state.multiMapLayer,
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();

    setAnchorEl(null);
  };

  const handleRemoveImage = (
    event: React.MouseEvent<HTMLLIElement>,
    data: DiscoverItemType,
  ) => {
    event.stopPropagation();

    const { borderSourceId, imageSourceId } = generateSourceIds(data);
    removeMapResources(
      mapBox!,
      [imageSourceId, borderSourceId],
      [imageSourceId, borderSourceId],
    );

    onDeleteIds(data.id);
    setAnchorEl(null);
  };

  return {
    open,
    handleClick,
    handleRemoveImage,
    handleClose,
    anchorEl,
    isSplitMode,
  };
};
