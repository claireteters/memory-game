function domReady() {
    //a list that holds all of my cards//
    let allCards = $('.card');
    let numberOfMoves = 0;
    let initialClick = false;
    let cardsOpened = [];
    let matchedCards = 7;
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

        allCards = shuffle(allCards);
        for (let card of allCards) {
            $('.deck').append(card);
        }

        allCards.each(function (card) {
            $(allCards[card]).on('click', function () {
                if (initialClick === false) {
                    timer();
                    initialClick = true;
                }

                displaySymbol($(allCards[card]));

                openCards(allCards[card]);

                setTimeout(function () {
                    checkMatch(allCards[card]);
                }, 320);
            });
        });
    }

    function restartGame() {
        //  when either of the reset buttons are clicked, the game will reset moves to 0,
        //  time to 0, stars to 3, reset the memory of matching cards back to 0, and shuffle
        //  the cards again
        numberOfMoves = 0;

        clearInterval(time);
        
        time = 0;
        seconds = 0;
        minute = 0;

        $('.moves').text(numberOfMoves.toString());
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

        allCards.each(function (index) {
            $(allCards[index]).unbind('click');
            $(allCards[index]).removeClass('clicked open show match');
        });

        beginGame();
    }

    // If the element passed in doesnt have class show or class match then flip that card.
    function displaySymbol(cardSelected) {
        if (!cardSelected.hasClass('show') || !cardSelected.hasClass('match') || !cardSelected.hasClass('clicked')) {
            cardSelected.addClass('open show clicked');
        }
    }

    function openCards(cardSelected) {
        // Checks to see if the previous clicked tile is the same tile the user had allready clicked.
        // if the tile clicked is them EXACT same as the previous then dont push the tile again
        if (cardsOpened.length <= 1 && cardsOpened[0] !== cardSelected) {
            cardsOpened.push(cardSelected);
        }
    }

    function checkMatch(cardSelected) {
        // checks to see if the  first card opened matches the second card opened. if
        //  it does, it will save it as a matching card.
        if (cardsOpened.length === 2) {
            incrementCounter();
            const lastCardOpenedIcon = $(cardSelected).children().attr('class');

            const previouslyOpenedCardIcon = $(cardsOpened[0]).children().attr('class');


            if (lastCardOpenedIcon === previouslyOpenedCardIcon) {
                $(cardSelected).addClass('match');
                $(cardsOpened[0]).addClass('match');
                $(cardSelected).removeClass('clicked');
                $(cardsOpened[0]).removeClass('clicked');
                matchedCards += 1;
            } else if (lastCardOpenedIcon !== previouslyOpenedCardIcon) {
                $(cardSelected).removeClass('open show clicked');
                $(cardsOpened[cardsOpened.length - 2]).removeClass('open show clicked');
            }

            if (matchedCards === 8) {
                playerHasWon();
            }

            cardsOpened = [];
        }
    }

    function incrementCounter() {
        // counts the number of moves the player makes while playing, and based on the 
        // number of moves, the stars will decrease the higher the number of moves the 
        // player makes
        numberOfMoves += 1;

        if (numberOfMoves === 1) {
            $('.moves-title').text(' Move');
        } else {
            $('.moves-title').text(' Moves');
        }

        $('.moves').text(numberOfMoves.toString());

        if (numberOfMoves === 10) {
            $('.stars li:last-child').remove();
        } else if (numberOfMoves === 15) {
            $('.stars li:last-child').remove();
        }
    }

    function timer() {
        // timer function
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
        var resultsScreen = document.getElementById('resultsScreen');
        var playAgain = document.getElementsByClassName('restartButton')[0];

        setTimeout(function () {
            $('#resultsScreen').css({ opacity: 1, visibility: 'visible' });;
            $('.moves').text(numberOfMoves.toString());
            $('.totalTime').text(`Time: ${minute} : ${second}`);
            var starLength = $('.stars li').length;
            $('.totalStars').text(`Stars: ${starLength}`);
            $('.totalMoves').text(`Moves: ${numberOfMoves}`);
            allCards.each(function (index) {
                $(allCards[index]).unbind('click');
            });
        }, 320);

    }

    //rounded reload game button
    $('.restart').on('click', function () {
        resultsScreen.style.visibility = "hidden";
        restartGame();
    })

    beginGame();

    // play again button after winning
    $('.restartButton').on('click', function () {
        resultsScreen.style.visibility = "hidden";
        restartGame();
    })
    
};

domReady();

