import { useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store";
import { addTimeLapseAction } from "../../../../../features/TimeLapse/TimeLapseSlice";
import { generateSourceIds } from "../../../../Discover/utils";
import { removeMapResources } from "../../../../utils";
import type { CardItemType, UseMoreDiscoverProps } from "../../../types";

export const useMoreCard = ({ onDeleteIds, mode }: UseMoreDiscoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { map } = useMap();
  const mapBox = map?.getMap();
  const open = Boolean(anchorEl);
  const { isSplitMode } = useSelector(
    (state: RootState) => state.multiMapLayer,
  );
  const timeLaps = useSelector((state: RootState) => state.timeLapse);

  const dispatch = useDispatch();

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
    data: CardItemType,
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

  const addTimeLapse = (
    event: React.MouseEvent<HTMLLIElement>,
    data: CardItemType,
  ) => {
    event.stopPropagation();
    dispatch(addTimeLapseAction(data));
    setAnchorEl(null);
  };

  const isAlreadyInTimeLapse = (data: CardItemType) => {
    return mode === "discover" && timeLaps.some((item) => item.id === data.id);
  };

  return {
    open,
    handleClick,
    handleRemoveImage,
    handleClose,
    anchorEl,
    isSplitMode,
    addTimeLapse,
    isAlreadyInTimeLapse,
  };
};
