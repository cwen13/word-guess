const wordList = ["words","people","letter","numebrs","zones"];

let startBtn = $(".start-game");
let resetBtn = $(".reset-game");
let timeEl = $("#time");
let secretEl = $("#secret-word");
let winsEl = $("#wins");
let losesEl = $("#loses");


let gameWins, gameLoses;
let guessedLetters = [];
let currentWord = "";
let prevWords = [];

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

function guessLetter (secretWord, letter) {
  letter = letter.toLowerCase();
  if (alphaNumeric.indexOf(letter) === -1) {
    alert("That key is not a letter accepted.");
    return 0;
  }
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


function selectWord(wordList) {
  let wordIndex = Math.random() % wordList.length;
  if (wordList[wordIndex]. )
  
  return wordList[wordIndex];
}

function winGame() {
  function flashTimer() {
    
  }
  winsEl.text(parseInt(winEl.text()) + 1);
  // flash complete word 5 times then select new word
  flashTimer();
  
  selectWord(wordList);  
}

function displayCurrentWord() {
  let displayWord = [];

  for (character in currentWord.split("")) {
    displayWord[i] = character;
  }
  secretEl.text(displayWord.join(" "));

  if (displayWord.indexOf("_") === -1) {
    winGame();
  }
  return 0	
}

function gameOver() {
  localStoreage.setItem("guessGameWins", winEl.text());
  localStoreage.setItem("guessGameLoses", loseEl.text());
  if (window.confirm("Play another round?")) {
    init();
  } else {
    // action when user does not want to play another round
  }
  return 0;
}

function init() {
  // start the timer
  // selecct secretWord
  selectWord(wordList);
  // display currentWord
  displayCurrentWord();

  return 0;
}

function restart(prevSecretWord) {
  // select new secret word
  // reset timer
  gameWins = 0;
  gameLoses = 0;
  localStorage.setItems("guessGameWins", 0);
  localStorage.setItems("guessGameLoses", 0);
  init(selectWord(wordList, prevSecretWord));
}


startBtn.on("click", init);
resetBtn.on("click", restart);
$().on("keypress", (event) => {
  if (timeLeft === 0) {
    gameOver();
  }
  guessLetter(sWord, event.key);
  displayCurrentWord();
  
});
