//  CONTENTS
//  1. INITIALIZATION
//    a. Ready..............Functions to call on DOMContentLoaded
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
function $(x) {return document.querySelector(x);};
const arrayCards = [
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
let $deck = $('.deck'),
 $moves = $('.moves'),
 $movesLabel = $('.moves-label'),
 $reset = $('.fa-repeat'),
 $timer = $('.timer'),
 $timerLabel = $('.timer-label'),
 flippedCards = [],
 movesCount = 0,
 paused = false,
 started = false,
 timeCount = 0;

// Run after the page has finished loading
document.addEventListener("DOMContentLoaded", function() {

  // Add cards to the page
  init();

  // Reset the game when button is clicked
  document.querySelector(".reset").click(resetGameWarning)
  
  ///////////////////////////////////////
  //  1b. Start
  ///////////////////////////////////////

  // Call functions to enable game functionality, establish global variables
  function init() {

  // Cards need to exist before their classes can be selected
    createCards();

  // Variables for selectors that can only be called after squares are created
    let $card = $('.card');

  // Enable functionality for square interaction
    hoverCard();
    $card.click(flipCards);

    // Shuffle the icons, then create li items for each
    function createCards() {
      let cards = shuffle(arrayCards);
      for (let card of cards) {
        const li = document.createElement("li");
        const i = document.createElement("i");
        li.setAttribute("class", "card ");
        i.setAttribute("class", "fas fa-" + card);
        li.appendChild(i);
        $deck.appendChild(li);
      };
    };


    // function createCards() {
    //   let cards = shuffle(arrayCards);
    //   cards.forEach(function($card) {
    //     const li = document.createElement("li");
    //     const i = document.createElement("i");
    //     li.setAttribute("class", "card ");
    //     i.setAttribute("class", "fas fa-" + $card);
    //     li.appendChild(i);
    //     $deck.appendChild(li);
    //   });
    // };



  // Function to shuffle deck items
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

      return array;
    };
  };
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


    // reset.addEventListener('click', function(event) {
    //   if (confirm("Do you really want to reset?")) {
    //     txt = "Game reset!";

    //   }
    // });

// Modal dialog to confirm reset
function resetGameWarning() {
  paused = true;

  confirm ({
    message: 'are you sure you wish to reset?',
    callback: function (value) {
      if (value) {
        resetGame();
      } else {
        paused = false;
      }
    }
  });
};


///////////////////////////////////////
//  2a. Matching
///////////////////////////////////////

//  Check if the two open squares match
function checkMatch() {

  // If the array elements are the same
  if (flippedCards[0] === flippedCards[1]) {
    $deck.find('open').removeClass('open show').addClass('match flipped');
  } else {
    setTimeout(function() {
      $deck.find('open').addClass('wrong').removeClass('open show')
    });
  };

  // Increment move count
    movesCount++

  // If all squares have been matched, win the game
  if (query(".match").length === arrayCards.length) {
    winGame();
  };

  // Clear temp array
  flippedCards = [];
};

///////////////////////////////////////
//  2b. Styling
///////////////////////////////////////

// When a square is clicked, do this stuff
function flipCard() {

  // Define currently clicked square
  let $this = $(this);

  // Traverse DOM element for this square's icon class
  let $thisClass = $this[0].firstChild.classList[1];

  // Prevent flipping over more than two cards at once
  if (f$this.hasClass('open') || $this.hasClass('match') || $('.open').length === 2) {
    return;
  };

  // Start timer when first square is clicked
  if (started === false) {
    startTimer();
  };

  // If the temporary array doesn't yet have two items in it
  if (arrayCards.length > 2) {
    $this.addClass('open show flipped');

  // Add class of clicked square to the temp array
    flippedCards.push($thisClass);
  }

  // If two squares have been flipped, check to see if they match
  if (flippedCards.length === 2) {
    checkMatch();
  };
};

// Styling when hovering over a square that hasn't been flipped
function hoverCard() {
  $('.card:not(.open)').addEventListener( 'mouseover' , function() { $(this).addClass('card-hover') });
  $('.card:not(.open)').addEventListener( 'mouseout' , function() { $(this).removeClass('card-hover') });
};

///////////////////////////////////////
//  3a. Stars
///////////////////////////////////////

// Change solid star icon class to outlined version when a star is removed
function removeStar() {
  let $star = $('.fas .fa-star:last');
  $star.toggleClass('fas far');

// Get current star count
  let starCount = $('.fas.fa-star').length;
};

// Increment moves
function moveCounter() {

  // Increase move count by one
  movesCount++;

  // Grammar check so score doesn't read "1 Moves"
  if (movesCount === 1) {
    $movesLabel.html('Move');
  } else {
    $movesLabel.html('Moves');
  }

  // Star removal when specific move counts are hit
  switch (movesCount) {
    case 9: 
      removeStar();
      break;
    case 12: 
      removeStar();
      break;
  }

  // Update page display of move count
  $moves.html(movesCount);
};

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
