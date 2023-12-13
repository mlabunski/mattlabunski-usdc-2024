/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  /** You will need to implement your search and
   * return the appropriate object here. */

  var result = {
    SearchTerm: "",
    Results: [],
  };

  /** The result should always contain the search term, even there are no book results */
  result.SearchTerm = searchTerm;

  /** Checks if scannedTextObj is empty */
  if (!(JSON.stringify(scannedTextObj) === "{}")) {
    /** Iterates through each book within the scanned text, and each line within each book.
     */
    scannedTextObj.forEach((book) => {
      book.Content.forEach((line, index) => {
        /** If the line contains the search term, split the line into subtrings separated by each space in the line */
        if (line.Text.includes(searchTerm)) {
          var words = line.Text.split(" ");

          /** For each of the substrings, remove any extra spaces and calculate the length of the substring */
          for (word in words) {
            var currentWord = words[word].trim();
            var currentWordLength = currentWord.length;

            /** If the current substring is longer than the search term and contains the search term... */
            if (
              currentWordLength >= searchTerm.length &&
              currentWord.includes(searchTerm)
            ) {
              /** ...remove the following punctuation from the substring by replacing it with "" */
              var wordNoPunct = currentWord.replace(
                /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g,
                ""
              );

              /** Now compare with the search term, and if it is a match, add to results */
              if (wordNoPunct === searchTerm) {
                const newResult = {
                  ISBN: book.ISBN,
                  Page: line.Page,
                  Line: line.Line,
                };
                result.Results.push(newResult);
              }
            }
          }
        }

        /** Check if this line ends with a "-" which indicates a hyphenated word */
        if (line.Text.slice(-1) === "-") {
          /**remove "-" from the end of the line */
          var thisLine = line.Text.substring(0, line.Text.length - 1);
          /**get the next line of text */
          var nextLine = book.Content[index + 1].Text;

          /** Create a substring of this line, beginning after the index of the last space within the line
           *  This gives us the first half of the hyphenated word.
           */
          var wordFront = thisLine.substring(thisLine.lastIndexOf(" ") + 1);

          /** Create a substring of the next line of the text, beginning at the start of the next line, and ending at the first space
           *  This gives us the second half of the hyphenated word.
           */
          var wordBack = nextLine.substring(0, nextLine.indexOf(" "));

          /** Combine the two substrings (first half of hyphenated word and second half of hyphenated word) and compare to search term.
           *  If it's a match, add the current line (where the hyphenated word begins) to the results (along with current page and book ISBN).
           */

          var combinedWord = wordFront + wordBack;

          if (
            combinedWord.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "") ===
            searchTerm
          ) {
            const newResult = {
              ISBN: book.ISBN,
              Page: line.Page,
              Line: line.Line,
            };
            result.Results.push(newResult);
          }
        }
      });
    });
  }

  return result;
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

/** Example input object. */
const WordBreakPunctIn = [
  {
    Title: "The Broken Book",
    ISBN: "135792468",
    Content: [
      {
        Page: 13,
        Line: 3,
        Text: "This book has a word break that is very un-",
      },
      {
        Page: 13,
        Line: 4,
        Text: "fortunate. Oh well.",
      },
    ],
  },
];

/** Book with no content */
const EmptyBookIn = [
  {
    Title: "The Empty Book",
    ISBN: "0000000001",
    Content: [],
  },
];

/** Object with multiple books */
const MultipleBookIn = [
  {
    Title: "The Empty Book",
    ISBN: "0000000001",
    Content: [],
  },

  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },

  {
    Title: "The Fakest Book",
    ISBN: "4031990332023",
    Content: [
      {
        Page: 1,
        Line: 1,
        Text: "So begins the fakest book of all time, ",
      },
      {
        Page: 1,
        Line: 2,
        Text: "which was created for no reason. It was written by",
      },
      {
        Page: 1,
        Line: 3,
        Text: "a person however the name isn't real.",
      },
      {
        Page: 2,
        Line: 1,
        Text: "The book only has two pages, so this is it.",
      },
    ],
  },
];

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ],
};

/**Output object for "darkness" */
const twentyLeaguesOutDarkness = {
  SearchTerm: "darkness",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 8,
    },
  ],
};

/**Output object for "see" */
const twentyLeaguesOutSee = {
  SearchTerm: "see",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 10,
    },
  ],
};

/**Output object for "found"
 * "found" is not present in the text,
 * but "profound" is present
 */
const twentyLeaguesOutFound = {
  SearchTerm: "found",
  Results: [],
};

/**Output object for "SIMPLY"
 * Should return no results
 */
const twentyLeaguesOutSimplyUpper = {
  SearchTerm: "SIMPLY",
  Results: [],
};

/**Output object for "simply"
 * Should return 1 result
 */
const twentyLeaguesOutSimplyLower = {
  SearchTerm: "simply",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 8,
    },
  ],
};

/**Output object for "however"
 * Should return 2 results - 1 result from 2 different books
 */
const multipleBooksOutHowever = {
  SearchTerm: "however",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
    {
      ISBN: "4031990332023",
      Page: 1,
      Line: 3,
    },
  ],
};

/**Output object for "word" - searched in an empty book
 * Should return the search term with no results
 */
const emptyBookOut = {
  SearchTerm: "word",
  Results: [],
};

/**Output object for "unfortunate" in Broken Book */
const WordBreakPunctOut = {
  SearchTerm: "unfortunate",
  Results: [
    {
      ISBN: "135792468",
      Page: 13,
      Line: 3,
    },
  ],
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test2result.Results.length);
}

/** Check that a hyphenated word break (darkness) is found*/
const testWordBreak = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (
  JSON.stringify(twentyLeaguesOutDarkness) === JSON.stringify(testWordBreak)
) {
  console.log("PASS: Test Word Break");
  console.log("Expected:", twentyLeaguesOutDarkness);
  console.log("Received:", testWordBreak);
} else {
  console.log("FAIL: Test Word Break");
  console.log("Expected:", twentyLeaguesOutDarkness);
  console.log("Received:", testWordBreak);
}

/** Check that a hyphenated word break (unfortunate) is found in Broken Book*/
const testWordBreakPunct = findSearchTermInBooks(
  "unfortunate",
  WordBreakPunctIn
);
if (JSON.stringify(WordBreakPunctOut) === JSON.stringify(testWordBreakPunct)) {
  console.log("PASS: Test Word Break Punct");
  console.log("Expected:", WordBreakPunctOut);
  console.log("Received:", testWordBreakPunct);
} else {
  console.log("FAIL: Test Word Break Punct");
  console.log("Expected:", WordBreakPunctOut);
  console.log("Received:", testWordBreakPunct);
}

/** Check that if the search term is a substring of another word, there is not a false result
 * (i.e. for search term "found" , "profound" should not be a positive result) */
const testWordWithinWord = findSearchTermInBooks("found", twentyLeaguesIn);
if (
  JSON.stringify(twentyLeaguesOutFound) === JSON.stringify(testWordWithinWord)
) {
  console.log("PASS: Test Word Within Word - profound");
  console.log("Expected:", twentyLeaguesOutFound);
  console.log("Received:", testWordWithinWord);
} else {
  console.log("FAIL: Test Word Within Word - profound");
  console.log("Expected:", twentyLeaguesOutFound);
  console.log("Received:", testWordWithinWord);
}

/** Check for a word that has punctuation at the end.  */
const testPunctEnd = findSearchTermInBooks("see", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutSee) === JSON.stringify(testPunctEnd)) {
  console.log("PASS: Test Punct End - see");
  console.log("Expected:", twentyLeaguesOutSee);
  console.log("Received:", testPunctEnd);
} else {
  console.log("FAIL: Test Punct End - see");
  console.log("Expected:", twentyLeaguesOutSee);
  console.log("Received:", testPunctEnd);
}

/** Check that the same word yields different results depending on capitalization*/
const testCapitalizationUpper = findSearchTermInBooks(
  "SIMPLY",
  twentyLeaguesIn
);
const testCapitalizationLower = findSearchTermInBooks(
  "simply",
  twentyLeaguesIn
);

if (
  JSON.stringify(twentyLeaguesOutSimplyUpper) ===
    JSON.stringify(testCapitalizationUpper) &&
  JSON.stringify(twentyLeaguesOutSimplyLower) ===
    JSON.stringify(testCapitalizationLower)
) {
  console.log("PASS: Test Capitalization");
  console.log("Expected:", twentyLeaguesOutSimplyUpper);
  console.log("Received:", testCapitalizationUpper);
  console.log("Expected:", twentyLeaguesOutSimplyLower);
  console.log("Received:", testCapitalizationLower);
} else {
  console.log("FAIL: Test Capitalization");
  console.log("Expected:", twentyLeaguesOutSimplyUpper);
  console.log("Received:", testCapitalizationUpper);
  console.log("Expected:", twentyLeaguesOutSimplyLower);
  console.log("Received:", testCapitalizationLower);
}

/** Check multiple books for the same search term */
const testMultipleBooks = findSearchTermInBooks("however", MultipleBookIn);
if (
  JSON.stringify(multipleBooksOutHowever) === JSON.stringify(testMultipleBooks)
) {
  console.log("PASS: Test Multiple Books - however");
  console.log("Expected:", multipleBooksOutHowever);
  console.log("Received:", testMultipleBooks);
} else {
  console.log("FAIL: Test Multiple Books - however");
  console.log("Expected:", multipleBooksOutHowever);
  console.log("Received:", testMultipleBooks);
}

/** Check book with no content */
const testEmptyBook = findSearchTermInBooks("word", EmptyBookIn);
if (JSON.stringify(emptyBookOut) === JSON.stringify(testEmptyBook)) {
  console.log("PASS: Test Empty Book");
  console.log("Expected:", emptyBookOut);
  console.log("Received:", testEmptyBook);
} else {
  console.log("FAIL: Test Empty Book");
  console.log("Expected:", emptyBookOut);
  console.log("Received:", testEmptyBook);
}

/** Check empty scanned text object */
const testEmptyObj = findSearchTermInBooks("word", {});
if (JSON.stringify(emptyBookOut) === JSON.stringify(testEmptyObj)) {
  console.log("PASS: Test Empty Obj");
  console.log("Expected:", emptyBookOut);
  console.log("Received:", testEmptyObj);
} else {
  console.log("FAIL: Test Empty Obj");
  console.log("Expected:", emptyBookOut);
  console.log("Received:", testEmptyObj);
}
