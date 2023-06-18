export const startOfDate = (date: Date = new Date()) => {
  const startOfDay = date;
  startOfDay.setUTCHours(0, 0, 0, 0);

  return startOfDay;
};

export const eachDayOfInterval = (start: Date, end: Date) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};

export const startOfMonth = (date: Date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const d = new Date(year, month, 1);

  return d;
};

export const endOfMonth = (date: Date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const d = new Date(year, month + 1, 0);

  return d;
};

export const isSameDay = (date1: Date, date2: Date) => {
  if (date1.getDate() !== date2.getDate()) {
    return false;
  }

  if (date1.getDay() !== date2.getDay()) {
    return false;
  }

  if (date1.getMonth() !== date2.getMonth()) {
    return false;
  }

  if (date1.getFullYear() !== date2.getFullYear()) {
    return false;
  }

  return true;
};
