$(window).on('load', resetBoard);

 function resetBoard () {
  let cardIcons = ["fa fa-diamond", "fa fa-cube","fa fa-bolt","fa fa-leaf","fa fa-bicycle","fa fa-paper-plane-o"]; // our deck of card icons
  let cardSets = shuffle(cardIcons).concat(shuffle(cardIcons)); // create sets by shuffling two decks together
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

let cardsFlipped = 0;

const hideCards = () => {
  $('.card').removeClass('show');
  $('.card').removeClass('open');
  cardsFlipped = 0;
}

 $('.card').click(function () {
   if (cardsFlipped===0) {
     setTimeout(hideCards, 1000);
     cardsFlipped++;
     $(this).addClass('show');
     $(this).addClass('open');
   } else if (cardsFlipped===1) {
     cardsFlipped++;
     $(this).addClass('show');
     $(this).addClass('open');
   } else {
     hideCards();
   }
 })
