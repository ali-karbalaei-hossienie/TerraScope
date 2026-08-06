export function getSliderData(daysAgo = 10, hoursList = [0, 6, 12, 18]) {
  const sliderData = [];
  const now = new Date();
  const currentTimestamp = now.getTime();

  // حلقه را برعکس می‌نویسیم تا دیتا از 10 روز پیش شروع شود و به امروز برسد (مناسب برای اسلایدر)
  for (let i = daysAgo; i >= 0; i--) {
    // گرفتن تاریخ هدف
    const targetDate = new Date();
    targetDate.setDate(now.getDate() - i);

    // برای هر روز، ساعت‌های مشخص شده در hoursList را تولید می‌کنیم
    hoursList.forEach((hour) => {
      // تنظیم ساعت، دقیقه، ثانیه و میلی‌ثانیه روی صفر
      targetDate.setHours(hour, 0, 0, 0);
      const timestamp = targetDate.getTime();

      // شرط مهم: برای "امروز"، ساعت‌هایی که هنوز نرسیده‌اند (آینده) را در اسلایدر قرار نمی‌دهیم
      if (timestamp <= currentTimestamp) {
        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, "0");
        const day = String(targetDate.getDate()).padStart(2, "0");
        const hh = String(targetDate.getHours()).padStart(2, "0");

        sliderData.push({
          dateOnly: `${year}-${month}-${day}`, // برای نمایش تاریخ بالای اسلایدر
          timeOnly: `${hh}:00`, // برای نمایش ساعت روی درگ‌بار اسلایدر
          fullFormatted: `${year}-${month}-${day} ${hh}:00`,
          timestamp: timestamp,
          isToday: i === 0, // مشخص می‌کند آیا این دیتا مربوط به امروز است یا خیر
        });
      }
    });
  }

  return sliderData;
}

// ------------------------------------
// نحوه استفاده:
// فرض کنید دیتا را برای هر 6 ساعت یکبار (00:00, 06:00, 12:00, 18:00) می‌خواهیم
const myWindySlider = getSliderData(10, [0, 6, 12, 18]);

// اگر بخواهید مثل Windy هر 3 ساعت باشد:
// const myWindySlider = getSliderData(10, [0, 3, 6, 9, 12, 15, 18, 21]);

// console.log(myWindySlider);
