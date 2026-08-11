import { Box, Typography } from "@mui/material";
import React from "react";

const Timelapse = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "16px",
      }}
    >
      <Typography variant="h6">TimeLapse Panel</Typography>
    </Box>
  );
};

export default Timelapse;
