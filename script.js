'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const scores = [0, 0]; 
let currentScore;
let activePlayer;
let playing = true;




resetGame();

function swithchPlayer () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

    if (activePlayer === 1) {
        btnRoll.classList.remove('roll-left');
        btnRoll.classList.add('roll-right');
        btnHold.classList.remove('hold-left');
        btnHold.classList.add('hold-right');
    } else {
        btnRoll.classList.remove('roll-right');
        btnRoll.classList.add('roll-left');
        btnHold.classList.remove('hold-right');
        btnHold.classList.add('hold-left');
    }
}

function resetGame () {
    playing = true;
    activePlayer = 0;
    currentScore = 0;
    scores[0] = 0;
    scores[1] = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    // player0El.classList.remove('player--active');
    player1El.classList.remove('player--winner');
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');

    diceEl.classList.add('hidden');
    btnRoll.classList.remove('roll-right');
    btnRoll.classList.add('roll-left');
    btnHold.classList.remove('hold-right');
    btnHold.classList.add('hold-left');
}

// btnNew.addEventListener('click', function() {

// });

// ROLL THE DICE
btnRoll.addEventListener('click', function() {
    if (playing) {
        // Generate random dice
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // Check if dice result is 1 to switch the player
        if (dice != 1) {
            currentScore += dice;
            // console.log(currentScore);
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // current0El.textContent = currentScore;
        } else {
            swithchPlayer();
        }
    }
});

// HOLD RESULTS
btnHold.addEventListener('click', function() {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
            swithchPlayer();
        }
    }
    
});

btnNew.addEventListener('click', function() {
    resetGame();
});