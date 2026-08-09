import { useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import type { DiscoverItemType } from "../../../types";
import { initSourceImage } from "../../../utils";
interface useMoreDiscoverProps {
  onDeleteIds: (id: string | number) => void;
}
export const useMoreDiscover = ({ onDeleteIds }: useMoreDiscoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { map } = useMap();
  const mapBox = map?.getMap();
  const open = Boolean(anchorEl);

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

    const { borderLayerId, borderSourceId, imageLayerId, imageSourceId } =
      initSourceImage(data);
    if (mapBox?.getLayer(imageLayerId)) {
      mapBox.removeLayer(imageLayerId);
    }

    if (mapBox?.getSource(imageSourceId)) {
      mapBox.removeSource(imageSourceId);
    }
    if (mapBox?.getLayer(borderLayerId)) {
      mapBox.removeLayer(borderLayerId);
    }

    if (mapBox?.getSource(borderSourceId)) {
      mapBox.removeSource(borderSourceId);
    }
    onDeleteIds(data.id);
    setAnchorEl(null);
  };

  return {
    open,
    handleClick,
    handleRemoveImage,
    handleClose,
    anchorEl,
  };
};
