import { Duration, Months } from "@/types/dashboard/app-usage";

const formatDate = (date: number | Date) => {
  const d = new Date(date);
  return (
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    d.getDate().toString().padStart(2, "0")
  );
};

export const getDateRange = (duration: Duration) => {
  let delta = 0;
  const curEndDate = new Date();
  const curStartDate = new Date();
  const prevEndDate = new Date();
  const prevStartDate = new Date();

  switch (duration) {
    case "1d":
      delta = 0;
      break;
    case "7d":
      delta = 6;
      break;
    case "1m":
      delta = 29;
      break;
    case "3m":
      delta = 89;
      break;
    case "6m":
      delta = 119;
      break;
  }

  curStartDate.setDate(curStartDate.getDate() - delta);
  prevEndDate.setDate(prevEndDate.getDate() - delta - 1);
  prevStartDate.setDate(prevStartDate.getDate() - 2 * delta - 1);

  return {
    cur: {
      start: formatDate(curStartDate),
      end: formatDate(curEndDate),
    },
    prev: {
      start: formatDate(prevStartDate),
      end: formatDate(prevEndDate),
    },
  };
};

export const getMonthRange = (months: Months) => {
  let delta = 0;
  switch (months) {
    case "6m":
      delta = 5;
      break;
    case "1y":
      delta = 11;
      break;
    case "3y":
      delta = 35;
      break;
  }
  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - delta);

  return {
    startDate: startDate.toISOString().substring(0, 10),
    endDate: today.toISOString().substring(0, 10),
  };
};

export const fromSecondsToString = (sec: number) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = Math.round(sec % 60);

  return hours ? `${hours}h${minutes}m${seconds}s` : minutes ? `${minutes}m${seconds}s` : `${seconds}s`;
};

export const insertHyphenDateString = (str: string) =>
  str.length === 8 ? str.slice(0, 4) + "-" + str.slice(4, 6) + "-" + str.slice(6) : str;

export const insertHyphenYearMonth = (str: string) =>
  str.length === 7 ? str : str.slice(0, 4) + "-" + str.slice(4, 6);

export const getDaysArray = function (start: Date | string, end: Date | string) {
  for (var arr = [], dt = new Date(start); dt < new Date(end); dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};

export const getMonthsArray = (start: Date | string, end: Date | string) => {
  for (var arr = [], dt = new Date(start); dt < new Date(end); dt.setMonth(dt.getMonth() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};

const dateString = (date: string) =>
  new Date(date).toDateString().slice(4, 10) + ", " + new Date(date).toDateString().slice(11);

export const getDateRangeText = (from: string, to: string) => dateString(from) + " - " + dateString(to);
