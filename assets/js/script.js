const wordList = ["words","people","letter","numebrs","zones","variable","array", "modulus", "object", "function", "string", "boolean"];

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

/* Need to make a timer and stuff */
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
  function flashTimer() {
    
  }
  win = true;
  winsEl.text(parseInt(winsEl.text()) + 1);
  // flash complete word 5 times then select new word
  flashTimer();
  
  selectWord(wordList);  
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
  localStoreage.setItem("guessGameWins", winEl.text());
  localStoreage.setItem("guessGameLoses", loseEl.text());
  if (window.confirm("Play another round?")) {
    init();
  }
  return 0;
}

function init() {

  gameWins = localStorage.getItems("guessGameWins", 0);
  gameLoses = localStorage.getItems("guessGameLoses", 0);

  if !(gameWins) {
    gameWins = 0;
  }
  if !(gameLoses) {
    gameLoses = 0;
  }

  
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
$("*").on("keydown", (event) => {
  if (secondsLeft === 0) {
    gameOver();
  }
  guessLetter(event.key);
  displayCurrentWord();
  
});
