import { Box, ButtonBase, Typography } from "@mui/material";
import { type FC } from "react";
import { useLeftLayerStyles } from "../styles/useLeftLayerStyles";

interface BaseLayerProps {
  map: {
    id: string;
    name: string;
    image: string;
  };
  selectedLeftLayers: string;
  setSelectedLeftLayers: React.Dispatch<React.SetStateAction<string>>;
}

const LeftLayer: FC<BaseLayerProps> = ({
  map,
  selectedLeftLayers,
  setSelectedLeftLayers,
}) => {
  const { classes, cx } = useLeftLayerStyles();

  return (
    <>
      <ButtonBase
        key={map.id}
        onClick={() => setSelectedLeftLayers(map.id)}
        className={cx(
          classes["left-layers-button"],
          selectedLeftLayers === map.id &&
            classes["left-layers-button--selected"],
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

export default LeftLayer;
