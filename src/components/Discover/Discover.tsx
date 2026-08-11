import { Box, Button, Typography } from "@mui/material";
import MoreDiscover from "./components/MoreDiscover/MoreDiscover";
import SplitDiscover from "./components/SplitDiscover/SplitDiscover";
import { discoverData } from "./constants";
import { useDisCover } from "./hooks/useDisCover";
import { useDiscoverStyles } from "./styles/useDiscoverStyles";
import SideBySide from "./components/SideBySide/SideBySide";

const Discover = () => {
  const { classes, cx } = useDiscoverStyles();
  const {
    handleImageOnMap,
    activeCard,
    handleDeleteIds,
    mapMode,
    handleMapMode,
  } = useDisCover();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6" className={classes.panelTitle}>
          DisCover Panel
        </Typography>
        <SplitDiscover mapMode={mapMode} handleMapMode={handleMapMode} />
      </Box>
      {discoverData.map((data) => {
        const isOnMap = activeCard.includes(data.id);
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
                    <MoreDiscover
                      onDeleteIds={handleDeleteIds}
                      discoverData={data}
                    />
                  </Box>

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
