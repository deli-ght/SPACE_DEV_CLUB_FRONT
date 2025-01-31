let today = new Date();
let todayDay = today.getDay();

const handleTime = (day: Date) => {
  const timeDiff = today.getMinutes() - day.getMinutes();
  return timeDiff < 1 ? "방금전" : Math.floor(timeDiff) + "분 전";
};

const handleInADay = (day: Date) => {
  day.setDate(day.getDate() - 7);
  const dateDiff = (today.getTime() - day.getTime()) / (1000 * 3600);
  return dateDiff < 1 ? handleTime(day) : Math.floor(dateDiff) + "시간 전";
};

export const handleDate = (createdAt: string) => {
  let day = new Date(createdAt);
  day.setDate(day.getDate() + 7);
  const diff = today.getTime() - day.getTime();
  if (diff > 0) {
    day.setDate(day.getDate() - 7);
    return (
      day.getFullYear() +
      "년 " +
      (day.getMonth() + 1) +
      "월 " +
      day.getDate() +
      "일"
    );
  } else {
    return day.getDay() - todayDay === 0
      ? handleInADay(day)
      : Math.abs(day.getDay() - todayDay) + "일전";
  }
};
