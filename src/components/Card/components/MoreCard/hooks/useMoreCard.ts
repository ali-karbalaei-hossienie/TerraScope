import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store";
import {
  addTimeLapseAction,
  removeTimeLapseAction,
} from "../../../../../features/TimeLapse/TimeLapseSlice";
import type { CardItemType, UseMoreDiscoverProps } from "../../../types";

export const useMoreCard = ({ mode }: UseMoreDiscoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
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

  const handleTimeLapse = (
    event: React.MouseEvent<HTMLLIElement>,
    data: CardItemType,
  ) => {
    event.stopPropagation();
    if (mode === "discover") {
      dispatch(addTimeLapseAction(data));
    } else {
      dispatch(removeTimeLapseAction({ id: data.id }));
    }
    setAnchorEl(null);
  };

  const isAlreadyInTimeLapse = (data: CardItemType) => {
    return mode === "discover" && timeLaps.some((item) => item.id === data.id);
  };

  return {
    open,
    handleClick,
    handleClose,
    anchorEl,
    isSplitMode,
    handleTimeLapse,
    isAlreadyInTimeLapse,
  };
};
