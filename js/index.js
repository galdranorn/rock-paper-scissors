// ----- link html with js
// divs - containers
var startContainer = document.getElementById('start-container');
var container = document.getElementById('container');
var containerMove =  document.getElementById('container-move');
var headerText = document.getElementById('header-text');
// buttons
var startButton = document.getElementById('startButton');
var newGameButton = document.getElementById('newGameButton');
var rockButton = document.getElementById('rockButton');
var paperButton = document.getElementById('paperButton');
var scissorsButton = document.getElementById('scissorsButton');
// result boxes
var resultBox = document.getElementById('resultBox');
var scores = document.getElementById('result');

// ---- define helper variables
var playerMove; /*number*/
var playerMoveName; /*description*/
var computerMove; /*number*/
var computerMoveName; /*description*/
var result;
var resultDescription;
var playerScore;
var computerScore;
var roundsCounting;
var rounds;

// function for computer move
var computerChoice = function () {
  computerMove = Math.floor(Math.random() * 3) + 1;
  if (computerMove==1) {
    computerMoveName="ROCK";
  }
  else if (computerMove==2) {
    computerMoveName="PAPER";
  }
  else if (computerMove==3) {
    computerMoveName="SCISSORS"
  }
}
// function for result counting from computerMove and playerMove
var resultCounting = function () {
  if (playerMove==computerMove) {
    result="DRAW: ";
  }
  else if ((playerMove==1 && computerMove==2)||(playerMove==2 && computerMove==3)||(playerMove==3 && computerMove==1)) {
    result="YOU LOSE: ";
    computerScore++;
  }
  else if ((playerMove==1 && computerMove==3)||(playerMove==2 && computerMove==1)||(playerMove==3 && computerMove==2)){
    result="YOU WIN: ";
    playerScore++;
  }
  //adding played round
  roundsCounting++;
  //writing the results
  resultDescription="#"+roundsCounting+" - "+result+"you chose "+playerMoveName+", computer chose "+computerMoveName+"<br>";
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

// ---- eventListeners for player buttons
rockButton.addEventListener('click', function(){
	playerMove = 1;
  playerMoveName = "ROCK";
  computerChoice ();
  resultCounting ();
});

paperButton.addEventListener('click', function(){
	playerMove = 2;
  playerMoveName = "PAPER";
  computerChoice ();
  resultCounting ();
});

scissorsButton.addEventListener('click', function(){
	playerMove = 3;
  playerMoveName = "SCISSORS";
  computerChoice ();
  resultCounting ();
});