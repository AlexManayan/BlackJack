import Deck from './deck.js';

const computerDeckElement = document.querySelector('.computer-deck');
const playerDeckElement = document.querySelector('.player-deck');
const textElement = document.querySelector('.text');
const newGameButton = document.querySelector('#new-game-button');
const hitButton = document.querySelector('#hit-button');
const standButton = document.querySelector('#stand-button');

const deck = new Deck();
let computerHand = [];
let playerHand = [];

let isGameOver = false;
let playerWon = false;
let playerScore = 0;
let computerScore = 0;

newGameButton.addEventListener('click', startGame);
hitButton.addEventListener('click', () => {
  if (!isGameOver) {
    playerHand.push(deck.pop());
    updateScore();
    renderGame();
  }
});
standButton.addEventListener('click', () => {
  if (!isGameOver) {
    isGameOver = true;
    while (computerScore < playerScore && playerScore <= 21 && computerScore <= 21) {
      computerHand.push(deck.pop());
      updateScore();
    }
    checkResult();
    renderGame();
  }
});

function startGame() {
  deck.shuffle();
  isGameOver = false;
  playerWon = false;
  playerScore = 0;
  computerScore = 0;
  playerHand = [deck.pop(), deck.pop()];
  computerHand = [deck.pop(), deck.pop()];
  updateScore();
  renderGame();
}

function updateScore() {
  computerScore = getScore(computerHand);
  playerScore = getScore(playerHand);
}

function getScore(hand) {
  let score = 0;
  let hasAce = false;
  for (let card of hand) {
    score += getValue(card);
    if (card.value === 'A') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    score += 10;
  }
  return score;
}

function getValue(card) {
  if (card.value === 'A') {
    return 1;
  } else if (card.value === 'K' || card.value === 'Q' || card.value === 'J') {
    return 10;
  } else {
    return Number(card.value);
  }
}

function checkResult() {
  if (playerScore > 21) {
    playerWon = false;
    isGameOver = true;
  } else if (computerScore > 21) {
    playerWon = true;
    isGameOver = true;
  } else if (isGameOver) {
    if (playerScore > computerScore) {
      playerWon = true;
    } else {
      playerWon = false;
    }
  }
}


function renderGame() {

  computerDeckElement.innerHTML = '';
  playerDeckElement.innerHTML = '';


  computerHand.forEach(card => {
    const cardElement = card.getHTML();
    computerDeckElement.appendChild(cardElement);
  });


  playerHand.forEach(card => {
    const cardElement = card.getHTML();
    playerDeckElement.appendChild(cardElement);
  });


  textElement.textContent = `Player: ${playerScore} / Computer: ${computerScore}`;

 
  if (isGameOver) {
    if (playerWon) {
      textElement.textContent += ' - You won!';
    } else {
      textElement.textContent += ' - You lost!';
    }
    newGameButton.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
  } else {
    newGameButton.disabled = true;
    hitButton.disabled = false;
    standButton.disabled = false;
  }
}

startGame();
