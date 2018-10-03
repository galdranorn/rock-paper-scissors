'use strict';

// ----- link html with js
// divs - containers
var startContainer = document.getElementById('start-container');
var container = document.getElementById('container');
var containerMove =  document.getElementById('container-move');
var headerText = document.getElementById('header-text');
// buttons
var startButton = document.getElementById('startButton');
var newGameButton = document.getElementById('newGameButton');

// result boxes
var resultBox = document.getElementById('resultBox');
var scores = document.getElementById('result');

// ---- define helper variables
var playerMove;
var computerMoveNum; /*for Math.random()*/
var computerMove;
var result;
var resultDescription;
var playerScore;
var computerScore;
var roundsCounting;
var rounds;

// function for computer move
var computerChoice = function () {
  computerMoveNum = Math.floor(Math.random() * 3) + 1;
  if (computerMoveNum==1) {computerMove="ROCK";}
  else if (computerMoveNum==2) {computerMove="PAPER";}
  else if (computerMoveNum==3) {computerMove="SCISSORS"}
}

// function for result counting from computerMove and playerMove
var resultCounting = function () {
  if (playerMove==computerMove) {
    result="DRAW: ";
  }
  else if ((playerMove=="ROCK" && computerMove=="PAPER")||(playerMove=="PAPER" && computerMove=="SCISSORS")||(playerMove=="SCISSORS" && computerMove=="ROCK")) {
    result="YOU LOSE: ";
    computerScore++;
  }
  else if ((playerMove=="ROCK" && computerMove=="SCISSORS")||(playerMove=="PAPER" && computerMove=="ROCK")||(playerMove=="SCISSORS" && computerMove=="PAPER")){
    result="YOU WIN: ";
    playerScore++;
  }

  //adding played round
  roundsCounting++;

  //writing the results
  resultDescription="#"+roundsCounting+" - "+result+"you chose "+playerMove+", computer chose "+computerMove+"<br>";
  resultBox.innerHTML=resultDescription + resultBox.innerHTML;
scores.innerHTML=playerScore+":"+computerScore;
  endingGame();
}

//function for ending the game

var endingGame = function () {
  if (roundsCounting>=rounds) {
  containerMove.classList.add('unvisible');
    if (playerScore>computerScore) {
    headerText.innerHTML="Congratulations, you win! :-)";
    }
    else if (playerScore<computerScore) {
     headerText.innerHTML="You lose :-("; 
    }
    else {
      headerText.innerHTML="The game finished with the draw";
    }
  }
}

//eventListener for start and newGame buttons

startButton.addEventListener('click', function(){
  
  rounds = Number(window.prompt('How many rounds you wanna play?'));
  if (isNaN(rounds)) {
  startContainer.classList.add('unvisible');
  container.classList.remove('unvisible');
  containerMove.classList.add('unvisible');
  headerText.innerHTML="Wrong value - you need to put a number";
  resultBox.innerHTML="";
  scores.innerHTML="";
  }
  else if (rounds<=0) {
  startContainer.classList.add('unvisible');
  container.classList.remove('unvisible');
  containerMove.classList.add('unvisible');
  headerText.innerHTML="Wrong value - number cannot be negative or equal 0!";
  resultBox.innerHTML="";
  scores.innerHTML="";
  }
  else {
  startContainer.classList.add('unvisible');
  container.classList.remove('unvisible');
  containerMove.classList.remove('unvisible');
  headerText.innerHTML="Choose your move";
  playerScore=0;
  computerScore=0;
  roundsCounting=0;
  resultBox.innerHTML="";
 scores.innerHTML=playerScore+":" +computerScore;
  }
});

newGameButton.addEventListener('click', function(){
	startContainer.classList.toggle('unvisible');
  container.classList.toggle('unvisible');
  headerText.innerHTML="Choose your move";
});

// ---- player move

var playerMoveFn = function () {
  playerMove = this.getAttribute("data-move");
  computerChoice ();
  resultCounting ();
}

var buttons = document.querySelectorAll(".player-move");

for(var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', playerMoveFn);
}
