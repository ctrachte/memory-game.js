$(window).on('load', resetBoard); // ensures a fresh board when the page is refreshed or loaded

//new game button event listeners for popup modal and home screen
$('#newGameMain').click(function () {
  clearInterval(timer); // clear the timer out
  resetBoard(); //reset the board
});
$('#newGameModal').click(function () {
  clearInterval(timer);
  resetBoard();
});

// resets the entire game board
function resetBoard () {

  setTimer();

  clearTimeout();

  $('.flippable').off(); // clear out old event listeners

  $('.card').removeClass('red');

  $('.card').removeClass('green');

  $('.card').removeClass('flippable');

  $('.card').removeClass('show');

  $('.card').removeClass('open');

  $('.card').addClass('flippable');

  $('.stars').html(
    `
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    `
   );
   // add back in the event listener to all cards
   $('.flippable').on('click', function () {
     handleClick($(this));
   });

   moves = [9]; // reset moves
   cardIDs = [];
   cardsFlipped = [];
   matches = [];

   $('.moves').text(moves);

  let cardIcons = ["fa fa-diamond", "fa fa-cube","fa fa-bolt","fa fa-leaf","fa fa-bicycle","fa fa-paper-plane-o","fa fa-diamond",
    "fa fa-cube","fa fa-bolt","fa fa-leaf","fa fa-bicycle","fa fa-paper-plane-o"]; // our deck of card icons

  let cardSets = shuffle(cardIcons); // shuffles deck

  // For each card in the deck, add a random icon.
   $('#deck').children('li').each(function (index) {
     this.children[0].className = cardSets[index];
   });
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// declaring a variable to store our timer
let timer;

// tracks how many cards you've flipped.
let cardsFlipped = [];

// tracks the specific card ids to prevent double clicking
let cardIDs = [];

// tracks the games matched sets
let matches = [];

// tracks remaining attempts
let moves = 9;

// displays Timer
function getTime(totalSec) {

  function formatTime(x) {
    return ( x < 10 ? "0" : "" ) + x;
  }

  let hours = Math.floor(totalSec / 3600);
  totalSec = totalSec % 3600;

  let minutes = Math.floor(totalSec / 60);
  totalSec = totalSec % 60;

  let seconds = Math.floor(totalSec);

  minutes = formatTime(minutes);
  seconds = formatTime(seconds);

  let timeString = minutes + ":" + seconds;

  return timeString;
}

function setTimer () {
  let elapsed_seconds = 0;
  timer = setInterval(function() {
   elapsed_seconds++;
   $('.Timer').text(getTime(elapsed_seconds));
  }, 1000);
}

// reduces player moves and star rating
function reduceMoves () {
  moves--;
  $('.moves').text(moves);
  if (moves === 6 || moves === 3) {
    $('.stars').find('li:last').remove();
  }
}

// hides card icons (flips them back)
function hideCards () {
  // first add event listeners back to all unmatched cards
  $('.flippable').on('click', function () {
    handleClick($(this));
  })
  //clear all non-matches
  $('.card').removeClass('red');
  $('.flippable').removeClass('show');
  $('.flippable').removeClass('open');
  //reset our arrays
  cardsFlipped = [];
  cardIDs = [];
  showGameResult();
}
// shows cards, flips them
function showCard (obj) {
  cardsFlipped.push(obj[0].children[0].className);
  cardIDs.push(obj[0].id);
  $(obj).addClass('show');
  $(obj).addClass('open');
  showGameResult();
}

// checks if all matches are flipped, or if moves are gone
function showGameResult () {
  if ($( ".flippable" ).length === 2 && $('.show').length === 12) { // we pop up a winner modal
    $('.modal-body').html(
      `
      <div class="score-item">Your Time: ${$('.Timer').text()}</div>
      <div class="score-item">Your Score: ${$('.stars').html()}<div>
      `
    );
    $('#endGameModalLabel').text('You Win!');
    $('#endGameModal').modal('show');
    clearInterval(timer);
    resetBoard();
  } else if (moves === 0) { // else we pop up a loser modal
    $('.modal-body').html(
      `
      <div class="score-item">Your Time: ${$('.Timer').text()}</div>
      `
    );
    $('#endGameModalLabel').text('You Lose!');
    $('#endGameModal').modal('show');
    clearInterval(timer);
    resetBoard();
  } else { // not the end of the game!
    return;
  }
}

// function that handles click
function handleClick(obj) {
 if (cardsFlipped.length===0) {
   showCard(obj);
   $(obj).off(); // remove event listener so user cant keep clicking
 } else {
   showCard(obj);
   $('.flippable').off();// remove all event listeners to prevent flipping more than 2
   if (cardsFlipped[0] === cardsFlipped[1] && cardIDs[0] !== cardIDs[1]) {
     $('.open').removeClass('flippable');
     $('.open').addClass('green');
     matches.push(cardIDs);
     hideCards();
   } else {
     $('.open').addClass('red');
     setTimeout(hideCards,1000);
     reduceMoves();
   }
 }
}
