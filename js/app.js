$(window).on('load', resetBoard);

 function resetBoard () {
   $('.card').removeClass('flippable');
   $('.card').removeClass('show');
   $('.card').removeClass('open');
   $('.card').addClass('flippable');
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

// hides card icons (flips them back)
let hideCards = () => {
  $('.flippable').removeClass('show');
  $('.flippable').removeClass('open');
  cardsFlipped = [];
  cardIDs = [];
}

function showCard (obj) {
  cardsFlipped.push(obj.children[0].className);
  cardIDs.push(obj.id);
  $(obj).addClass('show');
  $(obj).addClass('open');
}

function showGameResult () {
  if (matches.length === 5) {
    $('#win-lose-modal').modal('show');
  } else {
    return;
  }
}

// Card click event handler
 $('.flippable').click(function () {
   showGameResult();
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
       hideCards();
       showCard(this);
     }
   }
 })
