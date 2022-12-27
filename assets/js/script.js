const wordList = ["words","people","letter","numebrs","zones"];

let startBtn = $(".start-game");
let resetBtn = $(".reset-game");
let timeEl = $("#time");
let secretEl = $("#secret-word");

let gameWins, gameLoses;


/* Need to make a timer and stuff */
function setTime() {
    // Sets interval in variable
    // setInterval (function(),<time-for-interval-in-milliseconds>);
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.text(secondsLeft);
    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
    }

  }, 60000);
}

function guessLetter (secretWord,currentWord, letter) {
  if (letter !== guessedLetters) {
    for (let i=0; i<secretWord.length; i++) {
      if (letter === seccretWord[i]) {
	currentWord[i] = letter;
      }
    }
    return currentWord;
  } else {
    // letter guessed has alrayd been guessed
    alert(`${letter} has already been guessed. Please selecct another.`);
    return currentWord;
  }
}

function displayCurrentWord(currentWord) {
  let displayWord = [];
  for (character in currentWord.split("")) {
    displayWord[i] = character;
  }
  secretEl.text(displayWord.join(" "));
  return 0	
}

function main(prevWord = "") {
  // start the timer
  // selecct secretWord
  selectWord(wordList, prevWord = "");
  // display currentWord
  displayCurrentWord(cWord);
  // listen for keybord event(KeyboardEvent.key)
  
  // check if letter was guessed
  // check if letter is in secretWord and update currentWord
  cWord = = guessLetter(sWord,cWord,letter);
  // display currentWord
  displayCurrentWord(cWord);
  
}

function restartMain(prevSecretWord) {
  // select new secret word
  // reset timer
  gameWins = 0;
  gameLoses = 0;
  localStorage.setItems("guessGameWins", 0);
  localStorage.setItems("guessGameLoses", 0);
  main(selectWord(wordList, prevSecretWord));
}


startBtn.on("click", main);
resetBtn.on("click", restartMain);
