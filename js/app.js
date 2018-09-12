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

    function beginGame() {
        //using shuffle function to shuffle cards

        $('.timer').text('00 : 00')

        cards = shuffle(cards);
        for (let card of cards) {
            $('.deck').append(card);
        }

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
    }

    function restartGame() {
        counter = 0;

        clearInterval(time);
        
        time = 0;
        seconds = 0;
        minute = 0;

        $('.moves').text(counter.toString());
        $('.timer').text('00 : 00');

        const starsRemaining = $('.stars').children().length;
        if (starsRemaining === 2) {
            $('.stars').append('<li><i class="fa fa-star"></i></li>')
        } else if (starsRemaining === 1) {
            $('.stars').append('<li><i class="fa fa-star"></i></li>')
            $('.stars').append('<li><i class="fa fa-star"></i></li>')
        }

        matchedCards = 0;
        cardsOpened = [];
        initialClick = false;

        cards.each(function (index) {
            $(cards[index]).unbind('click');
            $(cards[index]).removeClass('clicked open show match');
        });

        beginGame();
    }

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

        if (counter === 10) {
            $('.stars li:last-child').remove();
        } else if (counter === 15) {
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
        //stop the timer immediately
        clearInterval(time);
        var scorePanel = document.getElementById('scorePanel');
        var span = document.getElementsByClassName('restartButton')[0];
        setTimeout(function () {
            $('#scorePanel').css({ opacity: 1, visibility: 'visible' });;
            $('.moves').text(counter.toString());
            $('.totalTime').text(`Time: ${minute} : ${second}`);
            var starLength = $('.stars li').length;
            $('.totalStars').text(`Stars: ${starLength}`);
            $('.totalMoves').text(`Moves: ${counter}`);
        }, );

    }

    //rounded reload game button
    $('.restart').on('click', function () {
        restartGame();
    })

    beginGame();

    // play again button after winning
    $('.restartButton').on('click', function () {
        scorePanel.style.display = "none";
        cards.each(function (index) {
            $(cards[index]).unbind('click');
            $(cards[index]).removeClass('clicked open show match');
        });
        restartGame();
        beginGame();
    })
    
};

domReady();

