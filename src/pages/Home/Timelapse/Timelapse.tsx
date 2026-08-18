import { Box, Typography } from "@mui/material";
import Card from "../../../components/Card/Card";
import { useTimeLapse } from "./hooks/useTimeLapse";
import { useTimeLapseStyle } from "./styles/useTimeLapseStyle";

const Timelapse = () => {
  const { timeLapseData } = useTimeLapse();
  const { classes } = useTimeLapseStyle();
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
        <Typography className={classes.panelTitle} variant="h6">
          TimeLapse Panel
        </Typography>
      </Box>
      {timeLapseData.map((data) => {
        return (
          <Card data={data} key={`${data.id}-timeLapse`} mode="timeLapse" />
        );
      })}
    </>
  );
};

export default Timelapse;
