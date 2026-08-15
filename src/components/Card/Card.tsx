import { Box, Button } from "@mui/material";
import { type FC } from "react";
import CardInnerContent from "./components/CardInnerContent";
import { useCardStyles } from "./styles/useCardStyles";
import type { CardProps } from "./types";
const Card: FC<CardProps> = (props) => {
  const { classes, cx } = useCardStyles();

  const isOnMap =
    props.mode === "discover" &&
    props.activeCard &&
    props.activeCard.includes(props.data.id);
  return (
    <Box
      className={cx(classes.cardContainer, isOnMap && classes.activeContainer)}
    >
      {props.mode === "discover" ? (
        <Button
          onClick={() => props.handleImageOnMap(props.data)}
          disableRipple
          className={classes.cardButton}
        >
          <CardInnerContent
            data={props.data}
            mapMode={props.mapMode}
            mode={props.mode}
          />
        </Button>
      ) : (
        <Box className={classes.cardButton}>
          <CardInnerContent data={props.data} mode={props.mode} />
        </Box>
      )}
    </Box>
  );
};

export default Card;
