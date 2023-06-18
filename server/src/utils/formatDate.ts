export const formatDate = (
  date: Date | string,
  yearF: boolean = false
): string => {
  const nDate = new Date(date);

  const day = nDate.getDate() >= 10 ? nDate.getDate() : `0${nDate.getDate()}`;
  const month =
    nDate.getMonth() + 1 >= 10
      ? nDate.getMonth() + 1
      : `0${nDate.getMonth() + 1}`;
  const year = nDate.getFullYear();

  if (yearF) {
    return `${day}.${month}.${year}`;
  }

  return `${day}.${month}`;
};
