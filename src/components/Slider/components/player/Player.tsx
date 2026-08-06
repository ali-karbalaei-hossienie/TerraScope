import { IconButton } from "@mui/material";
import React, { type FC } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { usePlayer } from "./styles/usePlayer";

interface PlayerProps {
  isPlay: boolean;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
}
const Player: FC<PlayerProps> = ({ setIsPlay, isPlay }) => {
  const { classes } = usePlayer();
  return (
    <IconButton
      className={classes.player}
      onClick={() => setIsPlay((prev: boolean) => !prev)}
    >
      {isPlay ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
    </IconButton>
  );
};

export default Player;
