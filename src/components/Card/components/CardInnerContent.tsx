import { Box, Typography } from "@mui/material";
import SideBySide from "../../../pages/Home/Discover/components/SideBySide/SideBySide";
import { convertedFormatDate } from "../../../pages/Home/Discover/utils";
import { useCardStyles } from "../styles/useCardStyles";
import type { CardInnerContentProps } from "../types";
import MoreCard from "./MoreCard/MoreCard";

const CardInnerContent = (props: CardInnerContentProps) => {
  const { classes, cx } = useCardStyles();

  return (
    <>
      <Box className={classes.cardImageWrapper}>
        <img
          src={props.data.image}
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
            {props.data.title}
          </Typography>
          <Typography
            className={classes.cardCreatedAt}
            component="span"
            variant="caption"
          >
            {convertedFormatDate(props.data.createdAt)}
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
              {props.data.description}
            </Typography>
            <MoreCard mode={props.mode} discoverData={props.data} />
          </Box>

          {props.mode === "discover" && (
            <Box
              className={cx(
                classes.splitModeWrapper,
                props.mapMode === "split" && classes.splitModeWrapperActive,
              )}
            >
              <Box sx={{ overflow: "hidden" }}>
                <SideBySide discoverData={props.data} />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CardInnerContent;
