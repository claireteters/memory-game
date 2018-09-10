function domReady() {
    //a list that holds all of my cards//
    let cards = $('.card');
    let counter = 0;
    let initialClick = false;
    let cardsOpened = [];
    let matchedCards = 0;
    let time;
    let minute = 0;
    let seconds = 0;
    let second = 0;



    /*
     * Display the cards on the page
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */

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

        // console.log(array);
        return array;
    }

    function beginGame() {
        //using shuffle function to shuffle cards
        $('.timer').html('00 : 00')

        cards = shuffle(cards);
        for (let card of cards) {
            $('.deck').append(card);
        }
    }

    beginGame();

    // [card] is each index in the cards array.
    cards.each(function (card) {
        $(cards[card]).on('click', function () {
            if (initialClick === false) {
                timer();
                initialClick = true;
            }

            displaySymbol($(cards[card]));

            openCards(cards[card]);

            setTimeout(function () {
                checkMatch(cards[card]);
            }, 320);
        });
    });

    // If the element passed in doesnt have class show or class match then flip that card.
    function displaySymbol(elem) {
        if (!elem.hasClass('show') || !elem.hasClass('match') || !elem.hasClass('clicked')) {
            elem.addClass('open show clicked');
        }
    }

    function openCards(elem) {
        // Checks to see if the previous clicked tile is the same tile the user had allready clicked.
        // if the tile clicked is them EXACT same as the previous then dont push the tile again
        if (cardsOpened.length <= 1 && cardsOpened[0] !== elem) {
            cardsOpened.push(elem);
        }
    }

    function checkMatch(elem) {
        if (cardsOpened.length === 2) {
            incrementCounter();
            const lastCardOpenedIcon = $(elem).children().attr('class');

            const previouslyOpenedCardIcon = $(cardsOpened[0]).children().attr('class');


            if (lastCardOpenedIcon === previouslyOpenedCardIcon) {
                $(elem).addClass('match');
                $(cardsOpened[0]).addClass('match');
                $(elem).removeClass('clicked');
                $(cardsOpened[0]).removeClass('clicked');
                matchedCards += 1;
            } else if (lastCardOpenedIcon !== previouslyOpenedCardIcon) {
                $(elem).removeClass('open show clicked');
                $(cardsOpened[cardsOpened.length - 2]).removeClass('open show clicked');
            }

            if (matchedCards === 8) {
                playerHasWon();
            }

            cardsOpened = [];
        }
    }

    function incrementCounter() {
        counter += 1;

        if (counter === 1) {
            $('.moves-title').text(' Move');
        } else {
            $('.moves-title').text(' Moves');
        }

        $('.moves').text(counter.toString());

        if (counter === 8) {
            $('.stars li:last-child').remove();
        } else if (counter === 13) {
            $('.stars li:last-child').remove();
        }
    }

    function timer() {
        time = setInterval(function () {
            seconds += 1;

            second = (seconds % 60);
            minute = parseInt(seconds / 60);

            if (second < 10) {
                second = `0${(seconds % 60)}`;
            }

            if (minute < 10) {
                minute = `0${parseInt(seconds / 60)}`;
            }

            $('.timer').html(`${minute} : ${second}`);

        }, 1000);
    }

    function playerHasWon() {
        setTimeout(function () {
            
            
        }, );
    }

    /*
     * set up the event listener for a card. If a card is clicked:
     *  - display the card's symbol (put this functionality in another function that you call from this one)
     *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
     *  - if the list already has another card, check to see if the two cards match
     *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
     *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
     *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
     */
};

domReady();

