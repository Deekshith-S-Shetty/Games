const words = ["hello", "world", "hangman", "javascript", "programming"];
const maxChances = 6;

let word, hiddenWord, usedLetters, remainingChances;

const wordElem = document.getElementById("word");
const lettersElem = document.getElementById("letters");
const chancesElem = document.getElementById("chances");
const resetBtn = document.getElementById("reset");

function startGame() {
  // Pick a random word
  word = words[Math.floor(Math.random() * words.length)];

  // Initialize game state
  hiddenWord = new Array(word.length).fill("_");
  usedLetters = [];
  remainingChances = maxChances;

  // Update UI
  updateUI();
}

function updateUI() {
  // Update word display
  wordElem.textContent = hiddenWord.join(" ");

  // Update letters display
  lettersElem.innerHTML = "";
  for (let letter of "abcdefghijklmnopqrstuvwxyz") {
    const className = usedLetters.includes(letter)
      ? "letter selected"
      : "letter";
    const div = document.createElement("div");
    div.textContent = letter;
    div.className = className;
    div.addEventListener("click", () => selectLetter(letter));
    lettersElem.appendChild(div);
  }

  // Update chances display
  chancesElem.innerHTML = "Chances left: ";
  for (let i = 0; i < remainingChances; i++) {
    const span = document.createElement("span");
    span.textContent = "X";
    chancesElem.appendChild(span);
  }

  // Check for game over
  if (remainingChances === 0) {
    endGame("You lost! The word was " + word);
  } else if (!hiddenWord.includes("_")) {
    endGame("You won!");
  }
}

function selectLetter(letter) {
  // Ignore if letter has already been used
  if (usedLetters.includes(letter)) {
    return;
  }

  // Add letter to used letters
  usedLetters.push(letter);

  // Check if letter is in word
  if (word.includes(letter)) {
    // Update hidden word
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWord[i] = letter;
      }
    }
  } else {
    // Decrement remaining chances
    remainingChances--;

    // Update UI
    updateUI();
  }
}

function endGame(message) {
  // Disable letter buttons
  const letterElems = lettersElem.querySelectorAll(".letter");
  for (let letterElem of letterElems) {
    letterElem.removeEventListener("click", selectLetter);
    letterElem.classList.add("disabled");
  }

  // Show message
  wordElem.textContent = message;
}

// Initialize game
startGame();

// Reset game when reset button is clicked
resetBtn.addEventListener("click", () => {
  // Re-enable letter buttons
  const letterElems = lettersElem.querySelectorAll(".letter");
  for (let letterElem of letterElems) {
    letterElem.addEventListener("click", selectLetter);
    letterElem.classList.remove("disabled");
  }

  // Start new game
  startGame();
});
