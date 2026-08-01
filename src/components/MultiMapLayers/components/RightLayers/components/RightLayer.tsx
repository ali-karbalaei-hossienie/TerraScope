import { Box, ButtonBase, Typography } from "@mui/material";
import { type FC } from "react";
import { useRightLayerStyles } from "../styles/useRightLayerStyles";

interface BaseLayerProps {
  map: {
    id: string;
    name: string;
    image: string;
  };
  selectedRightLayers: string;
  setSelectedRightLayers: React.Dispatch<React.SetStateAction<string>>;
}

const RightLayer: FC<BaseLayerProps> = ({
  map,
  selectedRightLayers,
  setSelectedRightLayers,
}) => {
  const { classes, cx } = useRightLayerStyles();

  return (
    <>
      <ButtonBase
        key={map.id}
        onClick={() => setSelectedRightLayers(map.id)}
        className={cx(
          classes["right-layers-button"],
          selectedRightLayers === map.id &&
            classes["right-layers-button--selected"],
        )}
      >
        <Box
          component="img"
          src={map.image}
          alt={map.name}
          sx={{
            width: 1,
            height: 1,
            objectFit: "cover",
          }}
        />

        <Typography
          variant="caption"
          noWrap
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            py: 0.25,
            textAlign: "center",
            color: "#ffffff",

            background:
              "linear-gradient(to top, rgba(0,0,0,.75), rgba(0,0,0,0))",
            fontWeight: 600,
            pointerEvents: "none",
          }}
        >
          {map.name}
        </Typography>
      </ButtonBase>
    </>
  );
};

export default RightLayer;
