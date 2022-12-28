const wordList = ["words","people","letter","numbers","zones","variable","array", "modulus", "object", "function", "string", "boolean"];

let startBtn = $(".start-game");
let resetBtn = $(".reset-game");
let timeEl = $("#time");
let secretEl = $("#secret-word");
let winsEl = $("#wins");
let losesEl = $("#loses");

let gameWins, gameLosees;
let win = false;
let guessedLetters = [];
let currentWord = [];
let secretWord = "";
let prevWords = [];
let alphaNumeric = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
let secondsLeft;

function setTime() {
    // Sets interval in variable
    // setInterval (function(),<time-for-interval-in-milliseconds>);
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.text(secondsLeft);
    if(secondsLeft >= 0) {
      if(win && secondsLeft > 0) {
      // Stops execution of action at set interval
	clearInterval(timerInterval);
	winGame();
      }
    }
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      loseGame();
    }
  }, 1000);
}

function guessLetter (letter) {
  letter = letter.toLowerCase();
  if (alphaNumeric.indexOf(letter) === -1) {
    return 0;
  } else {
    for (let i=0; i<secretWord.length; i++) {
      if (letter === secretWord[i]) {
	currentWord[i] = letter;
      }
    }
    return 0;
  }
}


function selectWord(wordList) {
  let wordIndex = Math.round((Math.random()*10000) % wordList.length);
  if ( secretWord != wordList[wordIndex] ) {
    secretWord = wordList[wordIndex];
  } else {
    secretWord = wordList[wordIndex + 1];
  }
  for (let i=0; i<secretWord.length; i++) {
    currentWord[i] = "_";
  }
  return 0;
}

function winGame() {
  win = true;
  winsEl.text(parseInt(winsEl.text()) + 1);
  gameOver();
}

function loseGame() {
  win = false;
  losesEl.text(parseInt(losesEl.text()) + 1);
  gameOver();
}

function displayCurrentWord() {
  
  secretEl.text(currentWord.join(" "));
  
  if (currentWord.indexOf("_") === -1) {
    win = true;
    winGame();
  }
  return 0	
}

function gameOver() {
  startBtn.disabled = false;
  secretEl.text("SECRET WORD GAME");  
  localStorage.setItem("guessGameWins", winsEl.text());
  localStorage.setItem("guessGameLoses", losesEl.text());
  return 0;
}

function init() {

  gameWins = localStorage.getItem("guessGameWins");
  if (!gameWins) {
    gameWins = 0;
  }

  gameLoses = localStorage.getItem("guessGameLoses");
  if (!gameLoses) {
    gameLoses = 0;
  }
  startBtn.disabled = true;
  win = false;
  // start the timer
  secondsLeft = 10;
  setTime();
  // selecct secretWord
  selectWord(wordList);
  // display currentWord
  displayCurrentWord();
  return 0;
}

function reset(prevSecretWord) {
  // select new secret word
  // reset timer
  gameWins = 0;
  gameLoses = 0;
  localStorage.setItem("guessGameWins", gameWins);
  localStorage.setItem("guessGameLoses", gameLoses);
  init();
}


startBtn.on("click", init);
resetBtn.on("click", reset);
$("*").on("keydown", (event) => {
  guessLetter(event.key);
  displayCurrentWord();
  
});
