import prisma from "../lib/prisma";

export const generateUrls = async () => {
  const events = await prisma.event.findMany();

  let urls: string[] = [];

  for (const event of events) {
    if (event.event_url) {
      continue;
    }

    const regex = /&#\d+;/g;

    let newTitle = event.title.replaceAll(regex, "");

    newTitle = newTitle.replaceAll("&quot;", "");

    while (newTitle.includes("  ")) {
      newTitle = newTitle.replaceAll("  ", " ");
    }

    if (newTitle.startsWith(" ")) {
      newTitle = newTitle.substring(1);
    }

    if (newTitle.endsWith(" ")) {
      newTitle = newTitle.substring(0, newTitle.length - 1);
    }

    const base = getUrl(newTitle);
    let url = base;

    let counter = 0;

    if (urls.some((link) => link === url)) {
      url = `${base}-${counter}`;
      counter++;
    }

    while (urls.some((link) => link === `${base}-${counter}`)) {
      counter++;
    }
    if (counter > 0) {
      url = `${base}-${counter}`.replaceAll("--", "-");
    }

    if (url.startsWith("-")) {
      url = url.substring(1);
    }

    if (url.endsWith("-")) {
      url = url.substring(0, url.length - 1);
    }

    urls = [...urls, url];

    if (!url.replace(" ", "")) {
      continue;
    }

    console.log(`> ${url} <`);

    await prisma.event.update({
      where: { id: event.id },
      data: { event_url: url },
    });
  }

  const categories = await prisma.category.findMany();

  for (const cat of categories) {
    await prisma.category.update({
      where: { id: cat.id },
      data: { keywords: cat.keywords.map((k) => k.toLowerCase()) },
    });
  }
};

const getUrl = (word: string) => {
  let clean = "";

  const split = word.replaceAll(" ", "-").toLowerCase().split("");

  for (let i = 0; i < split.length; i++) {
    if (allowedChars.some((ch) => ch.toLowerCase() === split[i])) {
      let char = split[i];

      for (const k in replaced) {
        if (char === k) {
          char = replaced[k];
        }
      }

      clean = `${clean}${char}`;
    }
  }

  while (clean.includes("--")) {
    clean = clean.replaceAll("--", "-");
  }

  return clean;
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
  "-",
];

const replaced: Record<string, string> = {
  ā: "a",
  č: "c",
  ē: "e",
  ģ: "g",
  ī: "i",
  ķ: "k",
  ļ: "l",
  ņ: "n",
  š: "s",
  ū: "u",
  ž: "z",
};
