export interface SliderItem {
  dateOnly: string;
  timeOnly: string;
  fullFormatted: string;
  timestamp: number;
  isToday: boolean;
  dateObj: Date;
}

export function getSliderData(
  daysAgo = 10,
  hoursList = [0, 6, 12, 18],
): SliderItem[] {
  const sliderData: SliderItem[] = [];
  const now = new Date();
  const currentTimestamp = now.getTime();

  for (let i = daysAgo; i >= 0; i--) {
    const targetDate = new Date();
    targetDate.setDate(now.getDate() - i);

    hoursList.forEach((hour) => {
      targetDate.setHours(hour, 0, 0, 0);
      const timestamp = targetDate.getTime();

      if (timestamp <= currentTimestamp) {
        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, "0");
        const day = String(targetDate.getDate()).padStart(2, "0");
        const hh = String(targetDate.getHours()).padStart(2, "0");

        sliderData.push({
          dateOnly: `${year}-${month}-${day}`,
          timeOnly: `${hh}:00`,
          fullFormatted: `${year}-${month}-${day}T${hh}:00:00Z`,
          timestamp: timestamp,
          isToday: i === 0,
          dateObj: new Date(timestamp),
        });
      }
    });
  }
  return sliderData;
}
