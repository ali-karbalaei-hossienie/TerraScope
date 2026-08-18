import Card from "../../../components/Card/Card";
import { useTimeLapse } from "./hooks/useTimeLapse";

const Timelapse = () => {
  const { timeLapseData } = useTimeLapse();
  return (
    <>
      {timeLapseData.map((data) => {
        return (
          <Card data={data} key={`${data.id}-timeLapse`} mode="timeLapse" />
        );
      })}
    </>
  );
};

export default Timelapse;
