import {
  Box,
  Button,
  Divider,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import { useDiscoverStyles } from "./styles/useDiscoverStyles";
import { discoverData } from "./constants";
const Discover = () => {
  const { classes } = useDiscoverStyles();

  return (
    <>
      {discoverData.map((data) => {
        return (
          <Box className={classes.discoverContainer}>
            <Button disableRipple className={classes.discoverButton}>
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
                  component="div"
                  variant="body2"
                >
                  {data.title}
                </Typography>
                <Box className={classes.discoverAuthorRow}>
                  <Typography component="div" variant="caption">
                    {data.description}
                  </Typography>
                  <IconButton className={classes.addTimelaps}>+</IconButton>
                </Box>
              </Box>
            </Button>
            <Box className={classes.discoverFooter}>
              <Divider />
              <Box className={classes.discoverSplitModeToggle}>
                <Typography sx={{ padding: "0 8px" }} variant="subtitle2">
                  Split Mode
                </Typography>
                <Switch />
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
};
export default Discover;
