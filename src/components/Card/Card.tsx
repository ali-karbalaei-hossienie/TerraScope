import { Box, Button, Typography } from "@mui/material";
import { type FC } from "react";
import SideBySide from "../Discover/components/SideBySide/SideBySide";
import { convertedFormatDate } from "../Discover/utils";
import MoreCard from "./components/MoreCard/MoreCard";
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

  const isOnMap = mode === "discover" ? activeCard!.includes(data.id) : false;
  return (
    <Box
      className={cx(classes.cardContainer, isOnMap && classes.activeContainer)}
    >
      <Button
        onClick={() => handleImageOnMap(data)}
        disableRipple
        className={classes.cardButton}
      >
        <Box className={classes.cardImageWrapper}>
          <img
            src={data.image}
            className={classes.cardImage}
            alt="Satellite Image"
          />
        </Box>
        <Box className={classes.cardContent}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Typography
              className={classes.cardTitle}
              component="span"
              variant="body2"
            >
              {data.title}
            </Typography>
            <Typography
              className={classes.cardCreatedAt}
              component="span"
              variant="caption"
            >
              {convertedFormatDate(data.createdAt)}
            </Typography>
          </Box>
          <Box className={classes.discoverAuthorRow}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography component="div" variant="caption">
                {data.description}
              </Typography>
              <MoreCard
                mode={mode}
                onDeleteIds={handleDeleteIds}
                discoverData={data}
              />
            </Box>

            {mode === "discover" && (
              <Box
                className={cx(
                  classes.splitModeWrapper,
                  mapMode === "split" && classes.splitModeWrapperActive,
                )}
              >
                <Box sx={{ overflow: "hidden" }}>
                  <SideBySide discoverData={data} />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Button>
    </Box>
  );
};

export default Card;
