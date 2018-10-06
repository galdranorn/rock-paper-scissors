'use strict';

// ---- link html with js
var startContainer = document.getElementById('start-container');
var container = document.getElementById('container');
var containerMove =  document.getElementById('container-move');
var headerText = document.getElementById('header-text');

var startButton = document.getElementById('startButton');
var newGameButton = document.getElementById('newGameButton');

var resultBox = document.getElementById('resultBox');
var scores = document.getElementById('result');

// ---- global variables
var playerMove;
var computerMoveNum; /*for Math.random()*/
var computerMove;
var result;
var resultDescription;
var rounds;
var playerName;

var resultsTableBody = "";
var endModalBody = `
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Player move</th>
          <th>Computer move</th>
          <th>Round result</th>
          <th>Game result</th>
        </tr>
      </thead>
      <tbody>${resultsTableBody}</tbody>
    </table>
  `;

// ---- object for game params

var params = {
  playerScore: 0,
  computerScore: 0,
  roundsCounting: 0,
  progress: [],
};

// ---- START THE GAME

function dontStartGame (){
  startContainer.classList.add('invisible');
  container.classList.remove('invisible');
  containerMove.classList.add('invisible');
  headerText.innerHTML="Wrong value - you need to put a number which cannot be negative or equal 0!";
  resultBox.innerHTML="";
  scores.innerHTML="";
  }
function startGame (){
  startContainer.classList.add('invisible');
  container.classList.remove('invisible');
  containerMove.classList.remove('invisible');
  headerText.innerHTML="Choose your move";
  params.playerScore=0;
  params.computerScore=0;
  params.roundsCounting=0;
  resultBox.innerHTML="";
  scores.innerHTML=params.playerScore+":" +params.computerScore;
  }
function startModal (){
  var modalBody = `
   <form>
      Nazwa:<br><input type="text" id="playerName"><br>
      Liczba rund:<br><input type="number" id="roundsNumber">
   </form>
  `;
  
  modal('Wpisz liczbę rund i swoje imię', modalBody, function() {
    var playerNameInput = document.querySelector("#playerName")
    var roundsNumberInput = document.querySelector("#roundsNumber")
    rounds = roundsNumberInput.value
    playerName = playerNameInput.value
    
    if (isNaN(rounds)) {dontStartGame()}
    else if (rounds<=0) {dontStartGame()}
    else {startGame()}
  });
}

startButton.addEventListener('click', startModal);
newGameButton.addEventListener('click', startModal);

// ---- COMPUTER MOVE
function computerChoice() {
  computerMoveNum = Math.floor(Math.random() * 3) + 1;
  if (computerMoveNum==1) {computerMove="ROCK";}
  else if (computerMoveNum==2) {computerMove="PAPER";}
  else if (computerMoveNum==3) {computerMove="SCISSORS"}
}

// ---- PLAYER MOVE

function playerMoveFn () {
  playerMove = this.getAttribute("data-move");
  computerChoice ();
  resultCounting ();

  }
var buttons = document.querySelectorAll(".player-move");

for(var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', playerMoveFn);
  }


// ---- RESULT COUNTING
function resultCounting () {
  if (playerMove==computerMove) {result="DRAW: ";}
  else if ((playerMove=="ROCK" && computerMove=="PAPER")||(playerMove=="PAPER" && computerMove=="SCISSORS")||(playerMove=="SCISSORS" && computerMove=="ROCK")) {
    result="YOU LOSE: ";
    params.computerScore++;
    }
  else if ((playerMove=="ROCK" && computerMove=="SCISSORS")||(playerMove=="PAPER" && computerMove=="ROCK")||(playerMove=="SCISSORS" && computerMove=="PAPER")){
    result="YOU WIN: ";
    params.playerScore++;
    }
  //adding played round
  params.roundsCounting++;
  //writing the results
  resultDescription="#"+params.roundsCounting+" - "+result+"you chose "+playerMove+", computer chose "+computerMove+"<br>";
  resultBox.innerHTML=resultDescription + resultBox.innerHTML;
scores.innerHTML=params.playerScore+":"+params.computerScore;
  endingGame();
}

// ---- END THE GAME

function endingGame() {
  if (params.roundsCounting>=rounds) {
  containerMove.classList.add('invisible');
    if (params.playerScore>params.computerScore) {
      headerText.innerHTML="Congratulations, you win! :-)";
      }
    else if (params.playerScore<params.computerScore) {
      headerText.innerHTML="You lose :-("; 
      }
    else {
        headerText.innerHTML="The game finished with the draw";
      }
    }
  //endModal();
}

// -----------------------------------

// ----- START MODAL

function modal(title, body, callback, btnOk = "Ok", btnClose = "Close") {
  
  var fog = document.createElement('div');
  fog.className = 'fog';
  
  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
     <header>
       <h1>${title}</h1>
     </header>
     <div class="modal-body">
       ${body}
     </div>
     <div class="modal-footer">
        <button class="btn-ok">${btnOk}</button>
        <button class="btn-close">${btnClose}</button>
     </div>
  `;
  
  modal.querySelector(".btn-close").addEventListener("click", function() {
    fog.remove();
  })
  
   modal.querySelector(".btn-ok").addEventListener("click", function() {
     callback();
     fog.remove();
   })
  
  fog.appendChild(modal);
  
  document.body.appendChild(fog);
}


// ----- RESULTS TABLE

/*function endModal (){
  var row = resultsTableBody.insertRow(0);
  row.insertCell(0).innerHTML = `${roundsCounting}`;
  row.insertCell(1).innerHTML = `${playerMove}`;
  row.insertCell(2).innerHTML = `${computerMove}`;
  row.insertCell(3).innerHTML = `${playerScore}:${computerScore}`;
  row.insertCell(4).innerHTML = `x`;
  console.log(row);
}*/