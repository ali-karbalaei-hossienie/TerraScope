import { Box, Button, Typography } from "@mui/material";
import MoreDiscover from "./components/MoreDiscover/MoreDiscover";
import { discoverData } from "./constants";
import { useDisCover } from "./hooks/useDisCover";
import { useDiscoverStyles } from "./styles/useDiscoverStyles";

const Discover = () => {
  const { classes, cx } = useDiscoverStyles();
  const { handleImageOnMap, addedIds, handleDeleteIds } = useDisCover();

  return (
    <>
      {discoverData.map((data) => {
        const isOnMap = addedIds.includes(data.id);

        return (
          <Box
            key={data.id}
            className={cx(
              classes.discoverContainer,
              isOnMap && classes.activeContainer,
            )}
          >
            <Button
              onClick={() => handleImageOnMap(data)}
              disableRipple
              className={classes.discoverButton}
            >
              <Box className={classes.discoverImageWrapper}>
                <img
                  src={data.image}
                  className={classes.discoverImage}
                  alt="course thumbnail"
                />
              </Box>
              <Box className={classes.discoverContent}>
                <Typography
                  className={classes.discoverTitle}
                  component="span"
                  variant="body2"
                >
                  {data.title}
                </Typography>
                <Box className={classes.discoverAuthorRow}>
                  <Typography component="div" variant="caption">
                    {data.description}
                  </Typography>
                  <MoreDiscover
                    onDeleteIds={handleDeleteIds}
                    discoverData={data}
                  />
                </Box>
              </Box>
            </Button>
          </Box>
        );
      })}
    </>
  );
};

export default Discover;
