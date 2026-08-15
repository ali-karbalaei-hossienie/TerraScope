import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

export const useTimeLapse = () => {
  const timeLapseData = useSelector((state: RootState) => state.timeLapse);

  return { timeLapseData };
};
