export const titleToId = (title) => {
  return title.trim().replace("/", "!").replace(" ", "^");
};

export const getTitlefromId = (title) => {
  return title.trim().replace("^", " ").replace("!", "/");
};
