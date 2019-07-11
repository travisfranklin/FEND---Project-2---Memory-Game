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
  ],
  queryDeck = document.getElementById("deck"),
  queryMoves = document.getElementById("moves"),
  queryMovesLabel = document.getElementById("moves-label"),
  queryReset = document.getElementsByClassName("fa-repeat"),
  queryTimer = document.getElementById("timer"),
  queryTimerLabel = document.getElementById("timer-label");

let timecount = 0,
  flippedCards = [],
  movesCount = 0,
  paused = false,
  started = false;

// Call functions to enable game functionality, establish global variables
function init() {
  // Seconds counter must start at 0
  timeCount = 0;

  // Make the cards!
  console.log("Starting createCards()!");
  createCards();

  // Variables for selectors that can only be called after squares are created
  let queryCard = document.querySelectorAll(".card");

  // Shuffle the icons, create the cards!
  function createCards() {
    console.log("Running shuffle()!");
    let cards = shuffle(arrayCards);

    // Create li(s) for each card, and then insert icons inside them
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

  // Shuffle deck items (provided by Udacity)
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
document.body.addEventListener(
  "click",
  function(event) {
    if (event.target.classList.contains("card")) {
      console.log("Card clicked! starting flipCard().");
      flipCard();
    }
  },
  false
);

// Run after the page has finished loading
document.addEventListener("DOMContentLoaded", function() {
  // Reset the game when reset button is clicked
  console.log("setting reset listener");
  const resetListener = document.querySelectorAll(".reset");
  resetListener[0].addEventListener("click", resetGameWarning);

  // Add cards to the page
  console.log("DOM Content Loaded! Starting Init();");
  init();
});

//  Reset
//////////////////////////

// Reset game to init() state
function resetGame() {
  // Drop the current deck
  queryDeck.innerHTML = "";
  console.log("all list items removed.");

  // Pause the timer
  paused = true;
  console.log("paused = true || started = false");

  // Empty array of flipped cards
  flippedCards = [];
  console.log("flippedCards emptied");

  // Reset the timer
  timeCount = 0;

  // Reset # of moves
  movesCount = 0;

  // Count # of moves
  moveCounter();

  // Create a new deck
  console.log("starting init()");
  init();
  console.log("resetGame() complete!\n///////////////////////////\n\n");
}

// Confirm reset dialogue
function resetGameWarning() {
  paused = true;
  if (confirm("are you sure you wish to reset?") == true) {
    console.log("starting resetGame().");
    resetGame();
  } else {
    paused = false;
  }
  console.log("ResetGameWarning() complete!\n///////////////////////////\n\n");
}

// Matching
//////////////////////////

//  Check if the two open squares match
function checkMatch() {
  // If the array elements created from their FA icon classes are the same
  if (flippedCards[0] === flippedCards[1]) {
    console.log("flippedCards match!");

    // Add classes to show that those specific cards match!
    for (let i = 0; i < 2; i++) {
      let opened = document.querySelector(".open");
      opened.classList.remove("open", "show");
      opened.classList.add("match", "flipped");
      console.log("removed .open.show || added .match.flipped");
    }

    // Add classes to show that those specific cards do not match! (removed after short delay)
  } else {
    console.log("flippedCards don't match!");
    for (let i = 0; i < 2; i++) {
      let opened = document.querySelector(".open");
      opened.classList.add("wrong");
      opened.classList.remove("open");
      console.log("added .wrong || removed .open");
    }
  }

  // Increment move count
  movesCount++;
  console.log("movesCount incremented.");

  // Count the moves
  moveCounter();
  console.log("moveCounter() complete!");

  // If all squares have been matched, win the game
  if (document.getElementsByClassName("match").length === arrayCards.length) {
    winGame();
  }

  // Clear temp array to prep for next move
  flippedCards = [];
  console.log("cleared flippedCards");
  console.log("checkMatch() complete!\n///////////////////////////\n\n");
}

// Styling
//////////////////////////

// When a square is clicked, do this stuff
function flipCard() {
  // Look in DOM for this card's icon class
  let queryThisClass = event.target.firstChild.classList[1];
  console.log(
    "let queryThisClass = event.target.firstChild.classList[1]; or " +
      event.target.firstChild.classList[1]
  );

  // Don't flip over more than two at once
  if (
    event.target.classList.contains("open") ||
    event.target.classList.contains("match") ||
    document.getElementsByClassName("open").length === 2
  ) {
    console.log("couldn't flip over more than two cards at once!");
    return;
  }

  // Start the second counter when the first card is clicked
  if (started === false) {
    console.log("Starting startTimer().");
    startTimer();
  }

  // If the temporary array doesn't yet have two items in it, flip the target card
  if (flippedCards.length < 2) {
    event.target.classList.add("open", "show", "flipped");
    console.log("added classes '.open.show.flipped' to clicked card!");

    // Add the icon class of the clicked card to the temp array
    flippedCards.push(queryThisClass);
    console.log("added " + queryThisClass + " to temp array!");
  }

  // If two squares have been flipped, check to see if they match
  if (flippedCards.length === 2) {
    console.log("two cards have been flipped! starting checkMatch().");
    checkMatch();

    // After brief delay, remove styles from flipped cards that do not match.
    for (let i = 0; i < 2; i++) {
      if (
        document.querySelector(".open") != null ||
        document.querySelector(".wrong") != null
      ) {
        setTimeout(function() {
          let wrong = document.querySelector(".wrong");
          wrong.classList.remove("wrong", "flipped", "show");
          console.log("removed .wrong.flipped.show");
        }, 500);
      }
    }
  } else {
    console.log("only one card has been flipped!");
  }
  console.log("flipCard() complete!\n///////////////////////\n\n");
}

// Stars
//////////////////////////

// When a star is removed, grab the last solid star icon class from the ul and change it to the outlined version
function removeStar() {
  let queryStar = document.querySelectorAll(".fa-star");
  queryStar = Array.from(queryStar).slice(-1)[0];
  queryStar.classList.toggle("fa-star");
  queryStar.classList.toggle("fa-star-o");
  console.log("removeStar() complete!\n///////////////////////////\n\n");
}

// Increment moves
function moveCounter() {
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
function startTimer() {
  started = true;
  paused = false;

  // Increment the counter every second
  // Only increment when the game is started, and check if the game isn't paused
  if ((paused === false && started === true) === true) {
    let secondCounter = setInterval(time, 1000);
  }
}

function time() {
  ++timeCount;

  // Grammar check so timer doesn't read "1 Seconds"
  if (timeCount === 1) {
    queryTimerLabel.textContent = "Second";
  } else {
    queryTimerLabel.textContent = "Seconds";
  }

  // Update seconds on page
  queryTimer.textContent = timeCount;
}

// Win
//////////////////////////

// Modal dialog to announce that game has been won
function winGame() {
  // Pause the timer
  paused = true;

  // Announcement and option to reset
  const winGameConfirm =
    "You did it! You completed the game in:\n" +
    movesCount +
    " moves and " +
    timeCount +
    " seconds!\n" +
    document.querySelectorAll("#stars").length +
    "/3 stars!\n\nWould you like to try again?";
  if (confirm(winGameConfirm) == true) {
    console.log("starting resetGame().");
    resetGame();
  }
}
