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

  result.SearchTerm = searchTerm;

  /** Iterates through each book within the scanned text, and each line within each book.
   *  If a line contains the search term, then the current book (ISBN), page, and line are added to results.
   */
  scannedTextObj.forEach((book) => {
    book.Content.forEach((line, index) => {
      if (line.Text.includes(searchTerm)) {
        const newResult = {
          ISBN: book.ISBN,
          Page: line.Page,
          Line: line.Line,
        };
        result.Results.push(newResult);
      }

      /** Check if this line ends with a "-" which indicates a hyphenated word */
      if (line.Text.slice(-1) === "-") {
        /**remove "-" from the end of the line */
        var thisLine = line.Text.substring(0, line.Text.length - 1);
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
        if (wordFront + wordBack === searchTerm) {
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

/** Check that if the search term is a substring of another word, there is not a false result
 * (i.e. for search term "found" , "profound" should not be a positive result) */
const testWordWithinWord = findSearchTermInBooks("found", twentyLeaguesIn);
if (
  JSON.stringify(twentyLeaguesOutFound) === JSON.stringify(testWordWithinWord)
) {
  console.log("PASS: Test Word Within Word - profound");
} else {
  console.log("FAIL: Test Word Within Word");
  console.log("Expected:", twentyLeaguesOutFound);
  console.log("Received:", testWordWithinWord);
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

//TODO: Get Word Within Word Test to pass.
//TODO: Test for empty scanned text object
//TODO: Test for book with empty lines
//TODO: Test for results in multiple books
