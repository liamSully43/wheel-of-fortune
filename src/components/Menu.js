import React from 'react';
import logo from '../assets/wheel_of_fortune_logo.png';
import Help from './Help';

class Menu extends React.Component {
	
	valueVerify() {
		var colour = document.querySelector(".menu-name-input").style.borderColor;
		if(colour === "rgb(255, 0, 0)"){
			document.querySelector(".menu-name-input").style.webkitAnimation = "incorrect-name-field-reverse 1s";
			document.querySelector(".menu-name-input").style.msAnimation = "incorrect-name-field-reverse 1s";
			document.querySelector(".menu-name-input").style.borderColor = "#fff";
		}
	}
	
	howToPlay() {
		var display = document.querySelector("#menu-help").style.display;
		if (display === "") {
			document.querySelector("#menu-help").style.display = "none";
			display = document.querySelector("#menu-help").style.display;
		}
		if(display === "none") {
			for(var i = 0; 4 > i; i++) {
				document.querySelectorAll(".menu-name-input")[i].style.display = "none";
			}
			document.querySelector("#menu-help").style.display = "block";
		}
		else {
			for(i = 0; 4 > i; i++) {
				document.querySelectorAll(".menu-name-input")[i].style.display = "block";
			}
			document.querySelector("#menu-help").style.display = "none";
		}
	}
	
	render() {
		return (
			<div>
				<div className="background"></div>
				<div id="menu">
					<img id="menu-title-logo" alt="The wheel of fortune logo" src={logo} />
					<div id="menu-names-container">
						<Help />
						<input className="menu-name-input" onKeyPress={this.valueVerify} placeholder="Player 1" />
						<input className="menu-name-input" placeholder="Player 2" />
						<input className="menu-name-input" placeholder="Player 3" />
						<input className="menu-name-input" placeholder="Player 4" />
						<button className="universal-buttons" onClick={this.props.startGame}>Start</button>
						<button className="universal-buttons" onClick={this.howToPlay} >How to play</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Menu;