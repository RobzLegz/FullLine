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

export const formatXDate = (date: Date | string): string => {
  const nDate = new Date(date);

  const day = nDate.getDate() >= 10 ? nDate.getDate() : `0${nDate.getDate()}`;
  const month = months[nDate.getMonth()];
  const year = nDate.getFullYear();

  if (year !== new Date().getFullYear()) {
    return `${year} gada ${day}. ${month}`;
  }

  return `${day}. ${month}`;
};

const months = [
  "Janvāris",
  "Februāris",
  "Marts",
  "Aprīlis",
  "Maijs",
  "Jūnijs",
  "Jūlijs",
  "Augusts",
  "Septembris",
  "Oktobris",
  "Novembris",
  "Decembris",
];
