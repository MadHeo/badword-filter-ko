import { badWords } from "../data/badWords";

export const badWordsFilter = (text) => {
  let filteredText = text;

  badWords.forEach((badWord) => {
    const regex = new RegExp(badWord, "gi");
    filteredText = filteredText.replace(regex, "**");
  });
  return filteredText;
};
