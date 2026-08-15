import { Box, Button } from "@mui/material";
import { type FC } from "react";
import CardInnerContent from "./components/CardInnerContent";
import { useCardStyles } from "./styles/useCardStyles";
import type { CardProps } from "./types";
const Card: FC<CardProps> = ({
  data,
  handleImageOnMap,
  mode,
  activeCard,
  handleDeleteIds,
  mapMode,
}) => {
  const { classes, cx } = useCardStyles();

  const isOnMap = activeCard && activeCard.includes(data.id);
  return (
    <Box
      className={cx(classes.cardContainer, isOnMap && classes.activeContainer)}
    >
      {mode === "discover" ? (
        <Button
          onClick={() => handleImageOnMap(data)}
          disableRipple
          className={classes.cardButton}
        >
          <CardInnerContent
            data={data}
            handleDeleteIds={handleDeleteIds}
            mapMode={mapMode}
            mode={mode}
          />
        </Button>
      ) : (
        <Box className={classes.cardButton}>
          <CardInnerContent
            data={data}
            handleDeleteIds={handleDeleteIds}
            mapMode={mapMode}
            mode={mode}
          />
        </Box>
      )}
    </Box>
  );
};

export default Card;
