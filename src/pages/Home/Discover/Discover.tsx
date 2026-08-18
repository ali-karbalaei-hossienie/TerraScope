import { Box, Typography } from "@mui/material";
import Card from "../../../components/Card/Card";
import SplitDiscover from "./components/SplitDiscover/SplitDiscover";
import { discoverData } from "./constants";
import { useDisCover } from "./hooks/useDisCover";
import { useDiscoverStyles } from "./styles/useDiscoverStyles";

const Discover = () => {
  const { classes } = useDiscoverStyles();
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
        return (
          <Card
            mode="discover"
            data={data}
            key={data.id}
            handleImageOnMap={handleImageOnMap}
            activeCard={activeCard}
            mapMode={mapMode}
            handleDeleteIds={handleDeleteIds}
          />
        );
      })}
    </>
  );
};

export default Discover;
