// establish global variables to link code to document elements
var winsText = document.getElementById("wins");
var lossesText = document.getElementById("losses");
var guessText = document.getElementById("guesses-remaining");
var lettersText = document.getElementById("letters-guessed");
var wordDisplay = document.getElementById("word-display");
function isLetter(c) { // tests if something is a letter (credit to user 'daluege' on stack overflow)
  return c.toLowerCase() != c.toUpperCase();
};
var start = 1; // helps with starting and resetting

// define word guess game as an object
var wordGuessGame = {
    currentWord: 0, // placeholder value, will be redfined right away by currentWordFunction
    possibleWords: ["doom", "gloom", "sadness", "depression", "suicidal", "darkness","morose","dismal","desolation"], // defines possible words
    wins: 0, // keeps count of wins
    losses: 0, // keeps count of losses
    guessesRemaining: 12, // keeps count of guesses in reverse
    lettersGuessed: [], // records letters guessed
    underscores: "", // displays unguessed letters

    currentWordFunction: function() {
       this.currentWord = this.possibleWords[Math.floor(Math.random() * this.possibleWords.length)];
    }, // randomly selects a word from the list of possibles

    blankGenerator: function() { // generates a blank sequence the same length as the current word, for display
      this.underscores = "";
      for (var i = 0; i < this.currentWord.length; i++) {
        this.underscores = this.underscores + "_";
      }
      return this.underscores;
    },

    newGameReset: function() { // resets parameters of game when consecutive games are played
      this.currentWord = this.possibleWords[Math.floor(Math.random() * this.possibleWords.length)];
      this.guessesRemaining = 12;
      this.lettersGuessed = [];
      this.currentWordFunction();
      guessText.textContent = this.guessesRemaining;
      lettersText.textContent = this.lettersGuessed;
      start = 0;
      wordDisplay.textContent = this.blankGenerator();
    },

    correctGuess: function(keyInput) { // defines behavior when users guesses correctly
      this.guessesRemaining --; // decreases guesses left
      guessText.textContent = this.guessesRemaining; // logs new guess total onscreen
      this.lettersGuessed.push(keyInput); // updates letter history
      lettersText.textContent = this.lettersGuessed.toString(); //logs letter history to screen
      var underscoreRecord = this.underscores; // saves the previous blank arrangement for building the new one
      var winChecker = 0; // checks to see if there are any letters left
      this.underscores = ""; // need to redefine how the blanks are displayed
      for (var i = 0; i < this.currentWord.length; i++) { // rewrite blanks to reflect correct guesses
        if (underscoreRecord[i] === this.currentWord[i]) {
          this.underscores += underscoreRecord[i];
        }
        else if (keyInput === this.currentWord[i]) {
          this.underscores += keyInput;
        }
        else {
          this.underscores += "_";
          winChecker++;
        }
      }
      wordDisplay.textContent = this.underscores;
      if (winChecker === 0) {
        this.youWin();
      }
    },

    incorrectGuess: function(keyInput) { // defines incorrect user guess behavior, similar in construction to above function
      this.guessesRemaining --;
      guessText.textContent = this.guessesRemaining;
      this.lettersGuessed.push(keyInput).toString();
      lettersText.textContent = this.lettersGuessed.toString();
      if (this.guessesRemaining === 0) {
        this.youLose();
      }
    },

    youWin: function() { // when user successfully guesses word
      wordDisplay.textContent = "YOU WIN!";
      this.wins++;
      winsText.textContent = this.wins;
      start = 1; //signals a restart
    },

    youLose: function() { // when guesses run out
      wordDisplay.textContent = "YOU LOSE.";
      this.losses++;
      lossesText.textContent = this.losses;
      start = 1; //signals a restart
    }

}
// sets up game with random word and appropriate number of blanks
wordGuessGame.currentWordFunction();
winsText.textContent = wordGuessGame.wins;
lossesText.textContent = wordGuessGame.losses;
guessText.textContent = wordGuessGame.guessesRemaining;


// when key is pressed...
document.onkeyup = function(event) {
  if (start === 1) {
    wordGuessGame.newGameReset();
  } else {
  var keyInput = event.key.toLowerCase();

  // checks if guess is a letter
  if (isLetter(keyInput) && (wordGuessGame.lettersGuessed.indexOf(keyInput) < 0) && (keyInput.length === 1)) {
  // checks if letter is in word
  if (wordGuessGame.currentWord.indexOf(keyInput) >= 0) {

    // logs it in lettersGuessed, shows result in word
    wordGuessGame.correctGuess(keyInput);
   }
  else {
    wordGuessGame.incorrectGuess(keyInput);
    // removes a guess, logs letter in lettersGuessed
  }
}
}
}