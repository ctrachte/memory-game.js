$(window).on('load', resetBoard);

 function resetBoard () {
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

   moves=[10];
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

// tracks how many cards you've flipped.
let cardsFlipped = [];
// tracks the specific card ids to prevent double clicking
let cardIDs = [];
// tracks the games matched sets
let matches = [];
// tracks remaining attempts
let moves = 9;

// reduces player moves and star rating
function reduceMoves () {
  moves--;
  $('.moves').text(moves);
  if (moves === 6 || moves === 3) {
    $('.stars').find('li:first').remove();
  }
}

// hides card icons (flips them back)
function hideCards () {
  $('.flippable').removeClass('show');
  $('.flippable').removeClass('open');
  cardsFlipped = [];
  cardIDs = [];
}

// shows cards, flips them
function showCard (obj) {
  cardsFlipped.push(obj.children[0].className);
  cardIDs.push(obj.id);
  $(obj).addClass('show');
  $(obj).addClass('open');
  showGameResult();
}

// checks if all matches are flipped, or if moves are gone
function showGameResult () {
  if ($( ".flippable" ).length === 2 && $('.show').length === 12) {
    $('#win-lose-modal-Label').text('You Win!');
    $('#win-lose-modal').modal('show');
  } else if (moves === 0) {
    $('#win-lose-modal-Label').text('You Lose!');
    $('#win-lose-modal').modal('show');
    resetBoard();
  } else {
    return;
  }
}

// Card click event handler
 $('.flippable').click(function () {
   if (cardsFlipped.length===0) {
     showCard(this);
   } else if (cardsFlipped.length===1) {
     showCard(this);
   } else {
     if (cardsFlipped[0] === cardsFlipped[1] && cardIDs[0] !== cardIDs[1]) {
       $('.open').removeClass('flippable');
       matches.push(cardIDs);
       hideCards();
       showCard(this);
     } else {
       reduceMoves();
       hideCards();
       showCard(this);
     }
   }
 })
