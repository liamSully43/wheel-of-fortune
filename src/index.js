import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/Menu';
import App from './components/App';
import EndScreen from './components/EndScreen';

function startGame() {
	var playerNames = document.querySelectorAll(".menu-name-input");
	var namesString = "";
	for (var i=0; 4 > i; i++){ 
		namesString += playerNames[i].value; 
	}
	if(namesString === "") {
		playerNames[0].style.webkitAnimation = "incorrect-name-field 1s";
		playerNames[0].style.msAnimation = "incorrect-name-field 1s";
		playerNames[0].style.borderColor = "#ff0000";
	}
	else{
		for (i=0; 4>i; i++) {
			if(playerNames[i].value !== "") {
				players.push(playerNames[i].value)
			}
		}
		ReactDOM.render(<App name={players} endGame={(points, playerIndex) => {endGame(points, playerIndex)}}/>, document.getElementById('root'));
	}
}

function endGame(points, playerIndex) {
	ReactDOM.render(<EndScreen players={players} points={points} playerIndex={playerIndex} />, document.getElementById('root'));
}


function WheelOfFortune (props){
	return (
		<div>
			<Menu startGame={startGame} />
		</div>
		);

};

var players = [];

export default players;

ReactDOM.render(<WheelOfFortune />, document.getElementById('root'));