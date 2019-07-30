//establish variables
var possibleWords = [];
var currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
var Wins = 0;
var guessesRemaining = 12;
var lettersGuessed = [];

// when key is pressed...
document.onkeyup = function(event) {
  var keyInput = event.key.toLowerCase();

  // checks if letter is in word
  if (currentWord(keyInput)) {
    // logs it in lettersGuessed, shows result in word
   }
  else {
    // removes a guess, logs letter in lettersGuessed
  }
}