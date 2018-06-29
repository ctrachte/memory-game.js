$(window).on('load', resetBoard);

 function resetBoard () {
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
    var currentIndex = array.length, temporaryValue, randomIndex;

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
// tracks matched sets
let matches = [];

// hides card icons (flips them back)
let hideCards = () => {
  $('.flippable').removeClass('show');
  $('.flippable').removeClass('open');
  cardsFlipped = [];
}

// Card click event handler
 $('.flippable').click(function () {
   if (cardsFlipped.length===0) {
     // setTimeout(hideCards, 1000);
     cardsFlipped.push(this.children[0].className);
     $(this).addClass('show');
     $(this).addClass('open');
   } else if (cardsFlipped.length===1) {
     cardsFlipped.push(this.children[0].className);
     $(this).addClass('show');
     $(this).addClass('open');
   } else {
     if (cardsFlipped[0] === cardsFlipped[1]) {
       console.log(cardsFlipped);
       $('.open').removeClass('flippable');
       matches.push(cardsFlipped);
       cardsFlipped = [];
       return;
     } else {
       hideCards();
     }
   }
 })
