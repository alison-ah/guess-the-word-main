const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playerGuess = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".message")
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

// Display symbols as placeholder for the word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    progress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const letter = playerGuess.value;
    console.log(letter);
    playerGuess.value = "";
  });

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messages.innerText = "Please type a letter.";
    } else if (input.length > 1) {
        messages.innerText = "Please enter 1 letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = "Please enter a letter.";
    } else {
        return input;
    }
  };

