import { words as localList } from "./lang.js";

class Filter {
  constructor(options = {}) {
    Object.assign(this, {
      list: (options.emptyList && []) || localList,
      exclude: options.exclude || [],
      splitRegex: options.splitRegex || /\s/,
      placeHolder: options.placeHolder || "*",
      regex: options.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
      replaceRegex: options.replaceRegex || /\w/g,
    });
  }

  isProfane(string) {
    return this.list.some((word) => {
      const wordExp = new RegExp(word.trim(), "g");
      return !this.exclude.includes(word.toLowerCase()) && wordExp.test(string);
    });
  }

  replaceWord(string) {
    const filterWord = this.list.find((word) => {
      return string.match(new RegExp(word, "gi"));
    });
    if (filterWord) {
      return string.replace(
        new RegExp(filterWord, "gi"),
        this.placeHolder.repeat(filterWord.length)
      );
    } else {
      return string;
    }
  }

  clean(string) {
    const words = string.split(this.splitRegex);

    const result = words.map((word) => {
      return this.isProfane(word) ? this.replaceWord(word) : word;
    });

    const joinSeparator = this.splitRegex.exec(string);
    return result.join(joinSeparator ? joinSeparator[0] : "");
  }

  addWords() {
    let words = Array.from(arguments);
    this.list.push(...words);
    words
      .map((word) => word.toLowerCase())
      .forEach((word) => {
        if (this.exclude.includes(word)) {
          this.exclude.splice(this.exclude.indexOf(word), 1);
        }
      });
  }

  removeWords() {
    this.exclude.push(
      ...Array.from(arguments).map((word) => word.toLowerCase())
    );
  }
}

export default Filter;
