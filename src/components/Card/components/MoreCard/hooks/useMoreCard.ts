import { isEqual } from "lodash";
import { useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store";
import {
  addTimeLapseAction,
  removeTimeLapseAction,
} from "../../../../../features/TimeLapse/TimeLapseSlice";
import {
  ALL_SLIDER_LAYERS,
  ALL_SLIDER_SOURCES,
} from "../../../../TimelapseSlider/hooks/useTimeLapseSlider";
import { removeMapResources } from "../../../../utils";
import type { CardItemType, UseMoreDiscoverProps } from "../../../types";
import { toast } from "sonner";

export const useMoreCard = ({ mode }: UseMoreDiscoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const { isSplitMode } = useSelector(
    (state: RootState) => state.multiMapLayer,
  );
  const { map } = useMap();
  const mapBox = map?.getMap();
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

  const removeImageOnMap = (data: CardItemType) => {
    if (!mapBox) return;

    const style = mapBox.getStyle();
    if (!style || !style.sources) return;

    const sliderCoordinates = Object.entries(style.sources)
      .filter(([key]) => key.includes("slider-image-source"))
      .map(([, source]) => (source as { coordinates?: unknown }).coordinates);
    const hasMatch = sliderCoordinates.some((coords) =>
      isEqual(coords, data.coordinates),
    );

    if (hasMatch) {
      removeMapResources(mapBox, ALL_SLIDER_LAYERS, ALL_SLIDER_SOURCES);
    }
  };

  const handleTimeLapse = (
    event: React.MouseEvent<HTMLLIElement>,
    data: CardItemType,
  ) => {
    event.stopPropagation();
    if (mode === "discover") {
      dispatch(addTimeLapseAction(data));
      toast.success("Item added successfully.");
    } else {
      dispatch(removeTimeLapseAction({ id: data.id }));
      removeImageOnMap(data);
      toast.success("Item removed successfully.");
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
