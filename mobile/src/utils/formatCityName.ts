export const formatCityName = (city?: string) => {
  if (!city) {
    return city;
  }

  if (city.toLowerCase() === "attālināti") {
    return city;
  } else if (city.indexOf("pils") !== -1) {
    return city.replace("pils", "pilī");
  } else if (city.indexOf("e", city.length - 1) === city.length - 1) {
    return `${city.substring(0, city.length - 1)}ē`;
  } else if (city.indexOf("gals") !== -1) {
    return city.replace("gals", "galā");
  } else if (city.indexOf("a", city.length - 1) === city.length - 1) {
    return `${city.substring(0, city.length - 1)}ā`;
  } else if (city.indexOf("i", city.length - 1) === city.length - 1) {
    return `${city.substring(0, city.length - 1)}os`;
  } else if (city.indexOf("is", city.length - 2) === city.length - 2) {
    return `${city.substring(0, city.length - 2)}īs`;
  } else if (city.indexOf("ms", city.length - 2) === city.length - 2) {
    return `${city.substring(0, city.length - 2)}mā`;
  } else if (city.indexOf("ts", city.length - 2) === city.length - 2) {
    return `${city.substring(0, city.length - 2)}tā`;
  } else if (city.indexOf("as", city.length - 2) === city.length - 2) {
    return `${city.substring(0, city.length - 2)}ās`;
  }

  return city;
};
