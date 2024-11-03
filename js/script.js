const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playerGuess = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".message")
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLettersList = [];
let remainingGuesses = 8;

const getWord = async function () {
  const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await request.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
}; 

// Fire off the game
getWord();

// Display symbols as placeholder for the word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    progress.innerText = placeholderLetters.join("");
};

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
    playerGuess.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messages.innerText = `Please type a letter.`;
    } else if (input.length > 1) {
        messages.innerText = `Please enter ONE letter at a time.`;
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = `Please enter a letter.`;
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLettersList.includes(guess)) {
        messages.innerText = `You've already guessed that letter. Please try again.`;
    } else {
        guessedLettersList.push(guess);
        console.log(guessedLettersList);
        updateGuessesRemaining(guess);
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

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        messages.innerText = `The word does not include ${guess}. Please try again.`;
        remainingGuesses -= 1;
    } else {
        messages.innerText = `Good guess! The word includes the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        messages.innerHTML = `Game over. The word was <span class="highlight">${word}</span>.`;
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function () {
    if (word.toUpperCase() === progress.innerText) {
      messages.classList.add("win");
      messages.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
      startOver();
    }
};

const startOver = function() {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLetters.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
   //reset game
    messages.classList.remove("win");
    remainingGuesses = 8;
    guessedLettersList = [];
    guessButton.classList.add("guess");
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLetters.innerHTML = "";
    messages.innerText = "";
    getWord();

    //reset UI
    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLetters.classList.remove("hide");
    playAgainButton.classList.add("hide");
});
