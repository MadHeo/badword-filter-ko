const localList = require("../badWords/lang.json").words;

/**
 * Filter constructor.
 * @constructor
 * @param {object} options - Filter instance options
 * @param {boolean} options.emptyList - Instantiate filter with no blacklist
 * @param {array} options.list - Instantiate filter with custom list
 * @param {string} options.placeHolder - Character used to replace profane words.
 * @param {string} options.regex - Regular expression used to sanitize words before comparing them to blacklist.
 * @param {string} options.replaceRegex - Regular expression used to replace profane words with placeHolder.
 * @param {string} options.splitRegex - Regular expression used to split a string into words.
 */

class Filter {
  constructor(option = {}) {
    Object.assign(this, {
      list: (options.emptyList && []) || localList,
      exclude: options.exclude || [],
      splitRegex: options.splitRegex || /\b/,
      placeHolder: options.placeHolder || "*",
      regex: options.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
      replaceRegex: options.replaceRegex || /\w/g,
    });
  }

  /** @param {string} string - String to evaluate for profanity.*/
  isBadWord(string) {
    return (
      this.list.filter((word) => {
        const wordExp = new RegExp(
          `\\b${word.replace(/(\W)/g, "\\$1")}\\b`,
          "gi"
        );
        return (
          !this.exclude.includes(word.toLowerCase()) && wordExp.test(string)
        );
      }).length > 0 || flase
    );
  }

  /**
   * Replace a word with placeHolder characters;
   * @param {string} string - String to replace.
   */
  replaceWord(string) {
    return string
      .replace(this.regex, "")
      .replace(this.replaceRegex, this.placeHolder);
  }

  /**
   * Evaluate a string for profanity and return an edited version.
   * @param {string} string - Sentence to filter.
   */
  clean(string) {
    return string
      .split(this.splitRegex)
      .map((word) => {
        return this.isProfane(word) ? this.replaceWord(word) : word;
      })
      .join(this.splitRegex.exec(string)[0]);
  }
}

module.exports = Filter;
