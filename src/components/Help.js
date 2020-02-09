import React from 'react';

class Help extends React.Component {
	
	expandField(num) {
		if(document.querySelectorAll(".menu-help-content-titles")[num].style.height === "auto") {
			document.querySelectorAll(".menu-help-content-titles")[num].style.height = "40px";
		}
		else {
			document.querySelectorAll(".menu-help-content-titles")[num].style.height = "auto";
		}
	}
	
	render() {
		return (
			<div id="menu-help">
				<h1 id="menu-help-title">How to play</h1>
				<div id="menu-help-content">
					<div className="menu-help-content-titles" onClick={() => {this.expandField(0)}}>
						<h3>The Main Goal</h3>
						<p>The main goal for the contestants is to reach $25,000, the first contestant to do this comes first with the other players following them in descending order of money. Contestants can earn money with correct guesses, each correct letter guess is worth the amount of money they landed on and correct word guesses are worth $1000 unless the contestant landed on $5000.</p>
					</div>
					<div className="menu-help-content-titles" onClick={() => {this.expandField(1)}}>
						<h3>Spinning vs Guessing</h3>
						<p>Contestants will get to spin the wheel and after they have span they will then be able to guess a letter or word, if the guess is correct they can then spin again before guessing another letter or word. However, if they are wrong they will lose their turn.</p>
					</div>
					<div className="menu-help-content-titles" onClick={() => {this.expandField(2)}}>
						<h3>Consonants & Vowels</h3>
						<p>Consonants are free to guess and will reward the player with the money they landed on for each correct guessed consonant in the word, vowels however cost $250 each but will only charge the player once even if the vowel appears multiple times in a word.</p>
					</div>
					<div className="menu-help-content-titles" onClick={() => {this.expandField(3)}}>
						<h3>Wheel Segments</h3>
						<p><strong>Bankrupt - </strong> If a contestant lands on Bankrupt then they will lose all of their winnings and lose their turn.</p>
						<p><strong>Lose A Turn - </strong> If a contestant lands on Lose A Turn then they will just lose their turn.</p>
						<p><strong>Fee Play - </strong> If a contestant lands on Free Play then they get a free guess, the player won't win any money from a correct guess but won't lose a turn for an incorrect guess. Vowels are also free when landing on Free Play.</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Help;