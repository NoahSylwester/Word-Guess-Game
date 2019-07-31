// establish global variables to link code to document elements
var winsText = document.getElementById("wins");
var guessText = document.getElementById("guesses-remaining");
var lettersText = document.getElementById("letters-guessed");
var wordDisplay = document.getElementById("word-display");

// define word guess game as an object
var wordGuessGame = {
    currentWord: 0, // placeholder value, will be redfined right away by currentWordFunction
    possibleWords: ["red", "blue", "yellow", "green"], // defines possible words
    wins: 0, // keeps count of wins
    guessesRemaining: 12, // keeps count of guesses in reverse
    lettersGuessed: [], // records letters guessed

    currentWordFunction: function() {
       this.currentWord = this.possibleWords[Math.floor(Math.random() * this.possibleWords.length)];
    }, // randomly selects a word from the list of possibles

    blankGenerator: function() {
      let underscores = "";
      for (var i = 0; i < this.currentWord.length; i++) {
        underscores = underscores + "_ ";
      }
      return underscores;
    },

    newGameReset: function() { // resets parameters of game when consecutive games are played
      this.currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
      this.guessesRemaining = 12;
      this.lettersGuessed = [];
      this.currentWordFunction();
      guessText.textContent = this.guessesRemaining;
      lettersText.textContent = this.lettersGuessed;
    },

    correctGuess: function() { // defines behavior when users guesses correctly
      this.guessesRemaining --;
    },

    incorrectGuess: function() { // defines incorrect user guess behavior
      this.guessesRemaining --;
    },

    youWin: function() { // when user successfully guesses word
      wordDisplay.textContent = "YOU WIN!";
    },

    youLose: function() { // when guesses run out
      wordDisplay.textContent = "YOU LOSE.";
    }

}
// sets up game with random word and appropriate number of blanks
wordGuessGame.currentWordFunction();
wordDisplay.textContent = wordGuessGame.blankGenerator();
winsText.textContent = wordGuessGame.wins;

// when key is pressed...
document.onkeyup = function(event) {
  var keyInput = event.key.toLowerCase();
  alert(wordGuessGame.currentWord[keyInput]); // tester
  // checks if letter is in word
  if (wordGuessGame.currentWord[keyInput] >= 0) {
    // logs it in lettersGuessed, shows result in word
    lettersText.textContent = wordGuessGame.lettersGuessed.push(keyInput);
   }
  else {
    // removes a guess, logs letter in lettersGuessed
  }
}
