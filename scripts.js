
// Get It Ready
//////////////////////////

// Variables

const arrayCards = [
  "sign-language",
  "sign-language",
  "building",
  "building",
  "compass",
  "compass",
  "sun-o",
  "sun-o",
  "ship",
  "ship",
  "bell",
  "bell",
  "ra",
  "ra",
  "modx",
  "modx"
];
const queryDeck = document.getElementById("deck");
const queryMoves = document.getElementById("moves");
const queryMovesLabel = document.getElementById("moves-label");
const queryReset = document.getElementsByClassName("fa-repeat");
const queryTimer = document.getElementById("timer");
const queryTimerLabel = document.getElementById("timer-label");
  
let flippedCards = [],
  movesCount = 7,
  paused = false,
  started = false,
  timeCount = 0;


// Call functions to enable game functionality, establish global variables
function init() {
  
  // Cards need to exist before their classes can be selected
  console.log("Starting createCards()!");
  createCards();

  // Variables for selectors that can only be called after squares are created
  let queryCard = document.querySelectorAll(".card");


  // Create cards & Shuffle the icons
  function createCards() {
    console.log("Running shuffle()!");
    let cards = shuffle(arrayCards);

    // Create li items for each card
    for (let card of cards) {
      const li = document.createElement("li");
      const i = document.createElement("i");
      li.setAttribute("class", "card");
      i.setAttribute("class", "fa fa-" + card);
      li.appendChild(i);
      queryDeck.appendChild(li);
    }
    console.log("createCards() completed!");
  }

  // Shuffle deck items
  function shuffle(array) {
    var currentIndex = arrayCards.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    console.log("shuffle() complete!\n///////////////////////////\n\n");
    return array;
  }
console.log("init() complete!\n///////////////////////////\n\n");
}

// Enable functionality for square interaction
console.log("adding card click event listener");
document.body.addEventListener('click', function (event) {
  if (event.target.classList.contains('card')) {
    console.log("Card clicked! starting flipCard().");
    flipCard()
  }
}, false);

// Run after the page has finished loading
document.addEventListener("DOMContentLoaded", function() {

  // Add cards to the page
  console.log("DOM Content Loaded! Starting Init();");
  init();

  // Reset the game when reset button is clicked
  console.log("setting reset listener");
  const resetListener = document.querySelectorAll(".reset");
  resetListener[0].addEventListener( "click" , resetGameWarning);

  
  // Start
  //////////////////////////
  console.log("Init() complete!\n///////////////////////////\n\n");

});


//  Reset
//////////////////////////

// Reset game to initialization state
function resetGame() {
  let queryStars = document.querySelectorAll(".fa.fa-star");
  queryDeck.innerHTML = '';
  console.log("all list items removed. Starting moveCounter().");
  moveCounter();
  paused = false;
  console.log("paused = false");

  queryTimerLabel.textContent = "Seconds";
  console.log("queryTimerLabel changed to 'seconds'");

  // queryStars.classList.toggle(".fa");
  flippedCards = [];
  console.log("flippedCards emptied");
  // console.log("starting resetTimer()");
  // resetTimer();

  // removes old event listener
  // document.body.removeEventListener('click', function (event) {
  //   if (event.target.classList.contains('card')) {
  //     console.log("Card clicked! starting flipCard().");
  //     flipCard()
  //   }
  // }, false);
  // console.log("removing old card click event listener")

  console.log("starting init()");
  init();
  console.log("resetGame() complete!\n///////////////////////////\n\n");
}

// Confirm reset
function resetGameWarning() {
  paused = true;
  if (confirm("are you sure you wish to reset?") == true) {
    console.log("starting resetGame().");
    resetGame();
  } else {
    paused = false
  }
  console.log("ResetGameWarning() complete!\n///////////////////////////\n\n");
}

// Matching
//////////////////////////

//  Check if the two open squares match
function checkMatch() {
  // setTimeout(function() {
    // If the array elements are the same
    if (flippedCards[0] === flippedCards[1]) {
      console.log("flippedCards match!");

      for (let i = 0; i < 2; i++) {
        let opened = document.querySelector('.open');
        opened.classList.remove("open", "show");
        opened.classList.add("match", "flipped");
        console.log("removed .open.show || added .match.flipped");
      }

    } else {
      console.log("flippedCards don't match!");
      for (let i = 0; i < 2; i++) {
        let opened = document.querySelector('.open');
        opened.classList.add("wrong");
        opened.classList.remove("open");
        console.log("added .wrong || removed .open");
      }
    }

    // Increment move count
    moveCounter();
    console.log("movesCount incremented");


    // If all squares have been matched, win the game
    if (document.getElementsByClassName("match").length === arrayCards.length) {
      winGame();
    }

    // Clear temp array
    flippedCards = [];
    console.log("cleared flippedCards");
    console.log("checkMatch() complete!\n///////////////////////////\n\n");
  // }, 500);
}

// Styling
//////////////////////////

// When a square is clicked, do this stuff
function flipCard() {
  // Traverse DOM element for this card's icon class
  let queryThisClass = event.target.firstChild.classList[1];
  console.log("let queryThisClass = event.target.firstChild.classList[1]; or " + event.target.firstChild.classList[1])


  // Prevent flipping over more than two cards at once
  if (
    event.target.classList.contains("open") ||
    event.target.classList.contains("match") ||
    document.getElementsByClassName("open").length === 2
  ) {
    console.log("couldn't flip over more than two cards at once!");
    return;
  }

  // Start timer when first square is clicked
  // if (started === false) {
  //   console.log("start timer when first square is clicked. starting startTimer().");
  //   startTimer();
  // }

  // If the temporary array doesn't yet have two items in it
  if (flippedCards.length < 2) {
    event.target.classList.add("open", "show", "flipped");
    console.log("added classes '.open.show.flipped' to clicked card!");


  // Add class of clicked square to the temp array
    flippedCards.push(queryThisClass);
    console.log("added " + queryThisClass + " to temp array!");

  }

  // If two squares have been flipped, check to see if they match
  if (flippedCards.length === 2) {
    console.log("two cards have been flipped! starting checkMatch().");
    checkMatch();

    for (let i = 0; i < 2; i++) {
      if (document.querySelector('.open') != null || document.querySelector('.wrong') != null) { 
        setTimeout(function(){
          let wrong = document.querySelector('.wrong');
          wrong.classList.remove("wrong", "flipped", "show");
          console.log("removed .wrong.flipped.show");
        }, 500);
      }
    }

    flippedCards = [];

  } else {
    console.log("only one card has been flipped!");
  }
  console.log("flipCard() complete!\n///////////////////////\n\n");
}

// Stars
//////////////////////////

// Change solid star icon class to outlined version when a star is removed
function removeStar() {
  let queryStar = document.querySelectorAll(".fa-star");
  queryStar = Array.from(queryStar).slice(-1)[0];
  queryStar.classList.toggle("fa-star");
  queryStar.classList.toggle("fa-star-o");

  // Get current star count
  let starCount = document.querySelectorAll(".fa.fa-star").length;
  console.log("removeStar() complete!\n///////////////////////////\n\n");

}

// Increment moves
function moveCounter() {
  // Increase move count by one
  movesCount++;
  console.log("movesCount incremented.");

  // Grammar check so score doesn't read "1 Moves"
  if (movesCount === 1) {
    queryMovesLabel.textContent = "Move";
    console.log("'Move' label chosen for grammar!");
  } else {
    queryMovesLabel.textContent = "Moves";
    console.log("'Moves' label chosen for grammar!");
  }

  // Star removal when specific move counts are hit
  switch (movesCount) {
    case 9:
      console.log("running removeStar()!");
      removeStar();
      break;
    case 12:
      console.log("running removeStar()!");
      removeStar();
      break;
  }
  console.log("Star removal switch run!");

  // Update page display of move count
  queryMoves.textContent = movesCount;
  console.log("updated moves number on page!");

  console.log("moveCounter() complete!\n///////////////////////////\n\n");
}

// Timer
//////////////////////////

// Start the timer

// Increment the counter every second

// Only increment if the game isn't "paused" (a modal window is open)

// Grammar check so timer doesn't read "1 Seconds"

// Game has been started

// Clear the timer when game is reset

// Win
//////////////////////////

// Modal dialog to announce that game has been won

// Pause the timer

// Get star count

// Announcement and option to reset
// message: 'You win with ' + (3 - document.querySelectorAll('.star').length) + ' or ' + starCount + ' stars',
