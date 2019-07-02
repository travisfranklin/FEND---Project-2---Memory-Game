//  CONTENTS
//  1. INITIALIZATION
//    a. Ready..............Functions to call on document.querySelector(document).ready
//    b. Start..............Functions to start the game
//    c. Reset..............Reset current game
//
//  2. SQUARES
//    a. Matching...........Functions to determine matches
//    b. Styling............Functions to style the squares upon interaction
//
//  3. SCORING
//    a. Stars..............Functions to decrement stars
//    b. Timer..............Functions to time the current game
//    c. Win................Declare when game is won

///////////////////////////////////////
//  1a. Ready
///////////////////////////////////////

// Variables
let cards = [
  "bell-slash",
  "bell-slash",
  "building",
  "building",
  "compass",
  "compass",
  "sun",
  "sun",
  "snowflake",
  "snowflake",
  "bell",
  "bell",
  "dot-circle",
  "dot-circle",
  "gem",
  "gem"
];

const deck = document.querySelector(".deck");
let moves = document.querySelector(".moves");
let movesLabel = document.querySelector(".moves-label");
let reset = document.querySelector(".fa-repeat");
let timer = document.querySelector(".timer");
let timerLabel = document.querySelector(".timer-label");
let flippedCards = [];
let movesCount = 0;
let paused = false;
let started = false;
let timeCount = 0;

// Run after the page has finished loading
document.addEventListener("DOMContentLoaded", function() {
  // Add cards to the page
  // Reset the game when button is clicked

  
  ///////////////////////////////////////
  //  1b. Start
  ///////////////////////////////////////

  // Call functions to enable game functionality, establish global variables
  function init() {

  // Cards need to exist before their classes can be selected
    createCards();

  // Variables for selectors that can only be called after squares are created
    let card = document.querySelector('.card');

  // Enable functionality for square interaction
  hoverCard();
    document.querySelector(card).click(flipCards);

  }
  // Shuffle the icons, then create li items for each

  // Function to shuffle deck items
  function shuffle(array) {
    var currentIndex = cards.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // Create List Items and add icons to them.
  function createCards() {
    cards = shuffle(cards);
    cards.forEach(function(card) {
      const li = document.createElement("li");
      li.setAttribute("class", "card ");
      const i = document.createElement("i");
      i.setAttribute("class", "fas fa-" + card);
      li.appendChild(i);
      deck.appendChild(li);
    });
  }
});
///////////////////////////////////////
//  1c. Reset
///////////////////////////////////////

// Reset game to initialization state
function resetGame() {
  deck.empty();
  movesCount = -1;
  moveCounter();
  paused = false;
  timerLabel.html('Seconds');
  document.querySelector('.far.fa-star').toggleClass('fas far');
  arrIconsOpen = [];
  resetTimer();
  init();
};


    reset.addEventListener('click', function(event) {
      if (confirm("Do you really want to reset?")) {
        txt = "Game reset!";
        flippedCards = [];
        movesCount = 0;
        paused = false;
        started = false;
        timeCount = 0;
      }
    });

// Modal dialog to confirm reset



///////////////////////////////////////
//  2a. Matching
///////////////////////////////////////

//  Check if the two open squares match

// If the array elements are the same

// Increment move count

// If all squares have been matched, win the game

// Clear temp array

///////////////////////////////////////
//  2b. Styling
///////////////////////////////////////

// When a square is clicked, do this stuff

// Working with currently clicked square

// Traverse DOM element for this square's icon class

// Prevent flipping over more than two cards at once

// Start timer when first square is clicked

// If the temporary array doesn't yet have two items in it

// Add class of clicked square to the temp array

// If two squares have been flipped, check to see if they match

// Styling when hovering over a square that hasn't been flipped

///////////////////////////////////////
//  3a. Stars
///////////////////////////////////////

// Change solid star icon class to outlined version when a star is removed

// // Get current star count
// let starCount = document.querySelector('.fas.fa-star').length;

// Increment moves

// Increase move count by one

// Grammar check so score doesn't read "1 Moves"

// Star removal when specific move counts are hit

// Update page display of move count

///////////////////////////////////////
//  3b. Timer
///////////////////////////////////////

// Start the timer

// Increment the counter every second

// Only increment if the game isn't "paused" (a modal window is open)

// Grammar check so timer doesn't read "1 Seconds"

// Game has been started

// Clear the timer when game is reset

///////////////////////////////////////
//  3c. Win
///////////////////////////////////////

// Modal dialog to announce that game has been won

// Pause the timer

// Get star count

// Announcement and option to reset
// message: 'You win with ' + (3 - document.querySelector('.star').length) + ' or ' + starCount + ' stars',
