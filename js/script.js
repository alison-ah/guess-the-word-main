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
    for (const letter of word {
        console.log(letter);
        placeholderLetters.push("●");
    }
    progress.innerText = placeholderLetters.join("");
};

placeholder(word)

// Event listener for button
