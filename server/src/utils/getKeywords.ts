export const getInfoKeywords = (info: string[]) => {
  let words: string[] = info.map((text) =>
    text
      .split(" ")
      .map((word) => getCleanWord(word))
      .filter((word) => word)
  )[0];

  let allowedKeywords: string[] = [];

  for (let i = 0; i < words.length; i++) {
    if (!bannedKeywords.some((bKW) => bKW === words[i])) {
      allowedKeywords = [...allowedKeywords, words[i]];
    }
  }

  let keywords: string[] = [];

  let freq = 2;

  for (let i = 0; i < allowedKeywords.length; i++) {
    let count = 0;
    for (let j = i + 1; j < allowedKeywords.length; j++) {
      if (allowedKeywords[j] === allowedKeywords[i]) {
        count++;
      }
    }

    if (count >= freq) {
      keywords = [...keywords, allowedKeywords[i]];
    }
  }

  const uniqueKeywords = Array.from(new Set(keywords));

  return uniqueKeywords;
};

export const getCleanWord = (word: string) => {
  let clean = "";

  const split = word.toLowerCase().split("");

  for (let i = 0; i < split.length; i++) {
    if (allowedChars.some((ch) => ch.toLowerCase() === split[i])) {
      clean = `${clean}${split[i]}`;
    }
  }

  return clean;
};

export const getCityKeywords = (city: string) => {};

export const getTitleKeywords = (title: string | null) => {
  if (!title) {
    return [];
  }

  const split = title
    .toLowerCase()
    .split(" ")
    .map((word) => getCleanWord(word))
    .filter((word) => word);

  let allowedKeywords: string[] = [];

  for (let i = 0; i < split.length; i++) {
    if (!bannedKeywords.some((bKW) => bKW === split[i])) {
      allowedKeywords = [...allowedKeywords, split[i]];
    }
  }

  return allowedKeywords;
};

export const getKeywords = (
  title: string,
  info: string[],
  city: string | null,
  location: string | null
) => {
  const infoKW = getInfoKeywords(info);
  const titleKW = getTitleKeywords(title);
  const cityKW = getTitleKeywords(city);
  const locationKW = getTitleKeywords(location);

  const uniqueKeywords = Array.from(
    new Set([...infoKW, ...titleKW, ...cityKW, ...locationKW])
  );

  return uniqueKeywords;
};

const allowedChars = [
  "a",
  "ā",
  "b",
  "c",
  "č",
  "d",
  "e",
  "ē",
  "f",
  "g",
  "ģ",
  "h",
  "i",
  "ī",
  "j",
  "k",
  "ķ",
  "l",
  "ļ",
  "m",
  "n",
  "ņ",
  "o",
  "p",
  "r",
  "s",
  "š",
  "t",
  "u",
  "ū",
  "v",
  "z",
  "w",
  "q",
  "y",
  "x",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];

const bannedKeywords = [
  "un",
  "arī",
  "bet",
  "tomēr",
  "taču",
  "turpretī",
  "turpretim",
  "nevis",
  "vai",
  "jeb",
  "gan",
  "nedz",
  "drīz",
  "ir",
  "te",
  "nevis",
  "ne",
  "vien",
  "arī",
  "tikai",
  "tikvien",
  "tiklab",
  "kā",
  "ka",
  "lai",
  "ja",
  "jo",
  "tāpēc",
  "tādēļ",
  "tā",
  "kaut",
  "kamēr",
  "līdz",
  "kopš",
  "iekams",
  "pirms",
  "sev",
  "ar",
  "cita",
  "ērtā",
  "laikā",
  "vecumiem",
  "uzsāc",
  "aicinām",
  "apmeklēt",
  "vairāk",
  "būs",
  "",
  "raksturo",
  "mēdz",
  "kas",
  "tu",
  "to",
  "no",
  "tiks",
  "tika",
  "par",
  "var",
  "stendā",
  "nosūtījumu",
  "and",
  "stenda",
  "dēvēt",
  "uz",
  "in",
  "for",
  "the",
  "and",
  "is",
  "g",
  "iela",
  "pasākumi",
  "notikumi",
];

const cities = [
  "Ādaži",
  "Ainaži",
  "Ainazi",
  "Aizkraukle",
  "Aizkraukle",
  "Aizpute",
  "Aizpute",
  "Aknīste",
  "Akniste",
  "Aloja",
  "Alūksne",
  "Aluksne",
  "Ape",
  "Auce",
  "Baldone",
  "Baloži",
  "Balvi",
  "Bauska",
  "Brocēni",
  "Cēsis",
  "Cesis",
  "Cesvaine",
  "Dagda",
  "Daugavpils",
  "Dobele",
  "Durbe",
  "Grobiņa",
  "Grobina",
  "Gulbene",
  "Iecava",
  "Iecavas",
  "Ikšķile",
  "Ilūkste",
  "Jaunjelgava",
  "Jēkabpils",
  "Jelgava",
  "Jūrmala",
  "Kandava",
  "Kārsava",
  "Koknese",
  "Aizkraukle",
  "Krāslava",
  "Kuldīga",
  "Kuldiga",
  "Ķegums",
  "Kegums",
  "Ķekava",
  "Lielvārde",
  "Lielvarde",
  "Liepāja",
  "Līgatne",
  "Ligatne",
  "Limbaži",
  "Limbazi",
  "Līvāni",
  "Livani",
  "Lubāna",
  "Ludza",
  "Ludza",
  "Madona",
  "Mazsalaca",
  "Mazsalaca",
  "Mārupe",
  "Ogre",
  "Olaine",
  "Pāvilosta",
  "Piltene",
  "Pļaviņas",
  "Plavinas",
  "Preiļi",
  "Priekule",
  "Rēzekne",
  "Rīga",
  "Rūjiena",
  "Rujiena",
  "Sabile",
  "Salacgrīva",
  "Salacgriva",
  "Salaspils",
  "Saldus",
  "Saulkrasti",
  "Seda",
  "Sigulda",
  "Skrunda",
  "Smiltene",
  "Staicele",
  "Stende",
  "Strenči",
  "Strenci",
  "Subate",
  "Talsi",
  "Tukums",
  "Valdemārpils",
  "Valka",
  "Valmiera",
  "Vangaži",
  "Vangazi",
  "Varakļāni",
  "Varaklani",
  "Ventspils",
  "Viesīte",
  "Viesite",
  "Viļaka",
  "Viļāni",
  "Zilupe",
];
