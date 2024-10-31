const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playerGuess = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".message")
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLettersList = [];

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
    // Empty the text of the message
    messages.innerText = "";
    // The guess
    const guess = playerGuess.value;
    // Validate guess
    const goodGuess = validateInput(guess);
    
    if (goodGuess) {
       makeGuess(guess);
    }
    //Clear the guess for the player to try again
    playerGuess.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messages.innerText = `Please type a letter.`;
    } else if (input.length > 1) {
        messages.innerText = `Please enter 1 letter at a time.`;
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = `Please enter a letter.`;
    } else {
        return input;
    }
};

const makeGuess = function (playerGuess) {
    playerGuess = playerGuess.toUpperCase();
    if (guessedLettersList.includes(playerGuess)) {
        messages.innerText = `You've already guessed that letter. Please try again.`;
    } else {
        guessedLettersList.push(playerGuess);
        console.log(guessedLettersList);
        updatePage();
        updateWord(guessedLettersList);
    }
};

const updatePage = function () {
    // Empty the text of the unordered list where the player's guessed letters will display.
    guessedLetters.innerHTML = "";
    // Add guess to list of guesses.
    for (const letter of guessedLettersList) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetters.append(li);
    }
};

const updateWord = function (guessedLettersList) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
      if (guessedLettersList.includes(letter)) {
        revealWord.push(letter.toUpperCase());
      } else {
        revealWord.push("●");
      }
    }
    // console.log(revealWord);
    progress.innerText = revealWord.join("");
    checkIfWin();
};
  
const checkIfWin = function () {
    if (word.toUpperCase() === progress.innerText) {
      messages.classList.add("win");
      messages.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};