//70
'use strict';

//Resetting the page

//Selecting Element
const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

//Setting the score to 0
scoreEl0.textContent = 0;
scoreEl1.textContent = 0;

//Remove the dice from the page
diceEl.classList.add('hidden');
//Resetting of HTML page is completed.

//Selecting Elements
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
let currentScore0 = document.getElementById('current--0');
currentScore0.textContent = 0;
let currentScore1 = document.getElementById('current--1');
let currentScore = 0;
let activePlayer = 0;
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
let playing = true;

btnRollEl.addEventListener('click', function () {
  if (playing) {
    //1.Generate a random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    //2.Roll the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;

    //3.Check if diceNumber === 1;
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch Player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      /* Changing the background add the time of player change.
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
      */
      activePlayer = activePlayer === 0 ? 1 : 0;
      /* Changing the background at the time of player change.
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
      */

      playerEl0.classList.toggle('player--active');
      playerEl1.classList.toggle('player--active');
    }
  }
});
//creating a varible to hold the current values.
let scorePlayer0 = 0;
let scorePlayer1 = 0;

// Creating the function for the hold button
btnHoldEl.addEventListener('click', holdValue);

function holdValue() {
  if (playing) {
    console.log('run');
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    playerEl0.classList.toggle('player--active');
    playerEl1.classList.toggle('player--active');
    activePlayer
      ? (scorePlayer1 += currentScore)
      : (scorePlayer0 += currentScore);
    document.querySelector(`#score--${activePlayer}`).textContent = activePlayer
      ? scorePlayer1
      : scorePlayer0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    //Checking the logic for winner function.
    if (scorePlayer1 >= 100 || scorePlayer0 >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
      activePlayer = activePlayer === 0 ? 1 : 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
    }
  }
}
