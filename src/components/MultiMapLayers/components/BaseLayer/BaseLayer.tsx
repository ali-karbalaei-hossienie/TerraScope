import { Box, ButtonBase, Typography } from "@mui/material";
import { type FC } from "react";
import { useMapLayerStyles } from "../../styles/useMapLayerStyles";

interface BaseLayerProps {
  map: {
    id: string;
    name: string;
    image: string;
  };
  selectedMap: string;
  setSelectedMap: (id: string) => void;
}

const BaseLayer: FC<BaseLayerProps> = ({
  map,
  selectedMap,
  setSelectedMap,
}) => {
  const { classes, cx } = useMapLayerStyles();

  return (
    <>
      <ButtonBase
        key={map.id}
        onClick={() => setSelectedMap(map.id)}
        className={cx(
          classes["base-layers-button"],
          selectedMap === map.id && classes["base-layers-button--selected"],
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

export default BaseLayer;
