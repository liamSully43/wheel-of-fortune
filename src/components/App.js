import React from 'react';
import Wheel from './Wheel';
import MysteryPhrase from './MysteryPhrase';
import players from ".././index";

var playerIndex = 0;
var player1Points = 0;
var player2Points = 0;
var player3Points = 0;
var player4Points = 0;
var playerPoints = [player1Points, player2Points, player3Points, player4Points];

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {money: 0, selectedMoney: 0, phrase: "", message: ""};
		this.currentPlayer = players[playerIndex];
		this.freePlay = false;
		this.spin = true;
		this.phraseCharacters = [];
		this.guessedCharacters = [];
		this.playerChange = this.playerChange.bind(this);
		this.changePoints = this.changePoints.bind(this);
	}
	
	playerChange() {
		this.spin = true;
		playerIndex++;
		if(playerIndex === players.length){
			playerIndex = 0;
		}
		this.setState({message: "Unlucky, " + players[playerIndex] + " you're up!"});
		setTimeout(() => {this.setState({message: ""})}, 3000);
		this.currentPlayer = players[playerIndex];
		this.setState({money: playerPoints[playerIndex]});
	}
	
	changePoints(points) {
		if (!isNaN(points)){
			setTimeout(() => {
				this.setState({selectedMoney: points});
			}, 3000);
		}
		else if(points === "Bankrupt") {
			var time = 0;
			if(playerPoints[playerIndex] < 2000) {
				time = 20;
			}
			else if (playerPoints[playerIndex] < 6000) {
				time = 10;
			}
			else if (playerPoints[playerIndex] < 10000){
				time = 5;
			}
			else {
				time = 1;
			}
			setTimeout(() => {
				this.setState({selectedMoney: 0});
				var b = setInterval(() => {
					if(this.state.money <= 0) {
						clearInterval(b);
						setTimeout(() => {this.playerChange(); this.spin = true}, 500);
					}
					if(playerPoints[playerIndex] >= 10) {
						playerPoints[playerIndex] -= 10;
						this.setState({money: playerPoints[playerIndex]});
					}
				}, time);
				this.spin = null;
			}, 3000);
		}
		else if(points === "Lose A Turn") {
			setTimeout(() => {
				this.setState({selectedMoney: 0});
				this.spin = true;
				this.playerChange();
			}, 3000);
		}
		else if(points === "Error") {
			this.setState({message: "An error occurred, spin again"});
			setTimeout(() => {this.setState({message: ""})}, 5000);
			this.setState({selectedMoney: 0});
			this.spin = true;
		}
		else {
			this.freePlay = true;
		}
	}
	
	updatePhrase = (phrase, characters) => {
		this.setState({phrase: phrase});
		this.phraseCharacters = characters;
		this.guessedCharacters = [];
	}
	
	//this is used to update the message from events outside of the App component
	updateMessage = message => {
		this.setState({message: message});
		setTimeout(() => {this.setState({message: ""})}, 3000);
	}
	
	checkAnswer = (event, vowel) => {
		this.showVowels(false);
		var guess = "";
		// checks if guess should be submitted
		if(event.which === 13) {
			if(this.spin) {
				this.setState({message: "Please spin the wheel before making a guess"});
				setTimeout(() => {this.setState({message: ""})}, 3000);
			}
			else if(this.spin === null) {
				this.setState({message: "Please wait for the current action to complete before continuing"});
				setTimeout(() => {this.setState({message: ""})}, 3000);
			}
			else {
				var x = document.querySelector("#app-guess-input").value;
				var paidFor = false;
				if (vowel) { //checks if the enter key is pressed or if vowel was selected via the buttons
					x = vowel;
					paidFor = true;
				}
				guess = x.toUpperCase();
				if(guess.length > 1) { //checks if guess is a word or a letter
					if(guess === this.state.phrase) { //checks if guess is correct
						var mon = this.state.selectedMoney
						if(mon < 1000) {
							mon = 1000;
						}
						playerPoints[playerIndex] += mon;
						this.setState({money: playerPoints[playerIndex]});
						var correctGuess = true;
						this.refs.mysteryPhrase.selectPhrase();
						this.setState({message: "Correct!"});
						if(playerPoints[playerIndex] < 1000) { //this is required for the end screen, changing the message state after the end screen shows prints an error to the console
							setTimeout(() => {this.setState({message: ""})}, 3000);
						}
						var letters = document.querySelectorAll(".app-letters");
						for(var u = 0; letters.length > u; u++) {
							letters[u].classList.remove("app-visible-letters");
						}
					}
					else {//sets the guess to incorrect
						correctGuess = false;
					}
				}
				else { //this is the path if the guess is only a single character/letter
					if (guess === "A" || guess === "I" || guess === "O" || guess === "U" || guess === "E") { //checks if guess is a vowel, if so it will set consonant to true or false on that basis
						var consonant = false; //var vowel had already been defined
					}
					else {
						consonant = true;
					}
					if(!this.freePlay && !consonant && !paidFor) {//this checks if the vowel guessed had beem paid for or not (paid for if selected via buttons) and if free play has been landed on
						this.setState({message: "Vowels must be purchased using the button above"});
						this.spin = false;
						setTimeout(() => {this.setState({message: ""})}, 3000);
						correctGuess = true; //this is needed to avoid counting the guess as incorrect and avoid a player change/swap
						return;
					}
					else {// this path is used if the guess is a consonant or a paid for vowel
						for(var i=0; this.guessedCharacters.length >= i; i++) {//loops through the previously guessed characters that have been added to the array this.guessedCharacters
							if(this.guessedCharacters[i] === guess){ //checks if the guess has been guessed before
								this.setState({message: "The letter has already been guessed, please guess a different letter"});
								setTimeout(() => {this.setState({message: ""})}, 3000);
								return; // this prevents the for loop and function from continuing
							}
							if (this.guessedCharacters.length === i) {
								this.guessedCharacters.push(guess); // this adds the guess to the guessed characters array
								break;
							}
						}
						for (i=0; this.phraseCharacters.length > i; i++) {// this loops through the phrase and checks if the guess is correct or not
							if (guess === this.phraseCharacters[i]) {
								correctGuess = true;
								if(consonant) { // this checks if the guess is a consonant or vowel, if it's a consonant it will increment the players money or do nothing if it's a vowel, the cost of vowels is handled in selectVowel()
									playerPoints[playerIndex] += this.state.selectedMoney;
								}
							}
						}
					}
				}
				// the following if statement will determin if the guess was correct or not by checking the var correctGuess, if the player has guessed correctly then the correctGuess variable would have been set to true in the
				// previous if statements. The point of this statement is to reduce the ammount of code used as the outcome code would have been used multiple times in statements above
				if(correctGuess||this.freePlay) { //this will be selected if the guess was correct and will continue with the current player and update their score
					this.setState({money: playerPoints[playerIndex]});
					this.spin = true;
					this.refs.mysteryPhrase.revealCharacters(guess);
					letters = document.querySelectorAll(".app-letters");
					var visibleLetters = 0;
					for(var y = 0; letters.length > y; y++) {
						if(letters[y].classList.contains("app-visible-letters")) {
							visibleLetters++;
						}
					}
					if(visibleLetters === letters.length) {
						playerPoints[playerIndex] += 1000;
						this.setState({money: playerPoints[playerIndex]});
						this.refs.mysteryPhrase.selectPhrase();
						this.setState({message: "Entire word guessed!"});
						setTimeout(() => {this.setState({message: ""})}, 3000);
					}
				}
				else { // this will be selected if the guess was incorrect and swap players
					this.playerChange();
				}
				// this code only needs to run once and applies to all outcomes (except for the unpaid for vowels and letters that have already been guessed) so I added it at the end instead of littered multiple times in
				// the possible outcomes above
				this.spin = true;
				this.freePlay = false;// this sets the free play state to false to indicate free play has not been landed on, it is set to true in the wheel component when free play is landed on
				this.setState({selectedMoney: 0});
				document.querySelector("#app-guess-input").value = "";
			}
		}
		if(playerPoints[playerIndex] >= 25000) {
			this.props.endGame(playerPoints, playerIndex);
		}
	}
	
	playerState = state => {
		this.spin = state;
	}
	
	showVowels(expand) {
		if(expand) {
			document.querySelector("#vowel-button").style.webkitTransitionDuration = "0.5s";
			document.querySelector("#vowel-button").style.msTransitionDuration = "0.5s";
			document.querySelector("#vowel-button").style.webkitTransform = "width: 200px";
			document.querySelector("#vowel-button").style.msTransform = "width: 200px";
			document.querySelector("#vowel-button").style.width = "200px";
			document.querySelector("#app-vowel-button").style.display = "none";
			for(var v = 0; 5 > v; v++) {
				document.querySelectorAll(".vowels")[v].style.display = "inline-block";
			}
		}
		else {
			document.querySelector("#vowel-button").style.webkitTransitionDuration = "0.5s";
			document.querySelector("#vowel-button").style.msTransitionDuration = "0.5s";
			document.querySelector("#vowel-button").style.webkitTransform = "width: 100px";
			document.querySelector("#vowel-button").style.msTransform = "width: 100px";
			document.querySelector("#vowel-button").style.width = "100px";
			document.querySelector("#app-vowel-button").style.display = "inline-block";
			for(v = 0; 5 > v; v++) {
				document.querySelectorAll(".vowels")[v].style.display = "none";
			}
		}
	}
	//called when a vowel is guessed, event object made to trick check answer function into thinking a key was pressed.
	selectVowel(vowel) {
		var event = {
				which: 13,
		}
		for(var e = 0; this.guessedCharacters.length > e; e++) {
			if(vowel === this.guessedCharacters[e]) {
				this.setState({message: "The letter has already been guessed, please guess a different letter"});
				setTimeout(() => {this.setState({message: ""})}, 3000);
				return;
			}
		}
		if(this.freePlay) {
			this.checkAnswer(event, vowel);
		}
		else if(playerPoints[playerIndex] >= 250) {
			playerPoints[playerIndex] -= 250;
			this.checkAnswer(event, vowel);
		}
		else {
			this.setState({message: "Not enough money to purchase a vowel"});
			setTimeout(() => {this.setState({message: ""})}, 3000);
			this.showVowels(false);
		}
	}
	
	render () {
		return (
			<div id="app-content-container">
			<div className="background"></div>
				<div id="app-left-container">
					<p id="app-money-won">{"$" + this.state.selectedMoney}</p>
					<Wheel spin={state => {this.playerState(state)}} playerState={this.spin} playerPoints={this.changePoints} playerChange={this.playerChange} vowels={() => {this.showVowels(false)}} message={message => {this.updateMessage(message)}} />
					<p id="app-input-title" >You can guess the full word at any time as long as the wheel has been spun</p>
					<div>
						<input placeholder="Guess a character here" id="app-guess-input" onKeyPress={event => this.checkAnswer(event)} />
						<div className="universal-buttons" id="vowel-button" >
							<button id="app-a-button" className="app-vowel-buttons vowels" onClick={() => {this.selectVowel("a")}} >A</button>
							<button id="app-i-button" className="app-vowel-buttons vowels" onClick={() => {this.selectVowel("i")}}>I</button>
							<button id="app-o-button" className="app-vowel-buttons vowels" onClick={() => {this.selectVowel("o")}}>O</button>
							<button id="app-u-button" className="app-vowel-buttons vowels" onClick={() => {this.selectVowel("u")}}>U</button>
							<button id="app-e-button" className="app-vowel-buttons vowels" onClick={() => {this.selectVowel("e")}}>E</button>
							<button id="app-vowel-button" className="app-vowel-buttons" onClick={() => {this.showVowels(true)}}>Vowels</button>
						</div>
					</div>
					<p id="app-message-warning">{this.state.message}</p>
				</div>
					<MysteryPhrase name={this.currentPlayer} money={this.state.money} phrase={this.updatePhrase} ref="mysteryPhrase" />
			</div>
		)
	}
}

export default App;