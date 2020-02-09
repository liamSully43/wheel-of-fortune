import React from 'react';
import WheelImage from '../assets/wheel.png';

class Wheel extends React.Component {
	constructor(props){
		super(props)
		this.currentAngle = 0;
	}

	spinWheel() {
		if(this.props.playerState) {
			this.props.vowels();
			this.props.spin(null);
			setTimeout(() => {this.props.spin(false)}, 3000);
			var number = Math.floor(Math.random() * 360 + 1080);
			this.currentAngle += number;
			document.querySelector("#wheel").style.webkitTransitionDuration = "3s";
			document.querySelector("#wheel").style.msTransitionDuration = "3s";
			document.querySelector("#wheel").style.webkitTransform = "rotate(" + this.currentAngle + "deg)";
			document.querySelector("#wheel").style.msTransform = "rotate(" + this.currentAngle + "deg)";
			var degree = this.currentAngle % 360;
			switch(true){			
				case (degree <= 15): this.props.playerPoints(5000);
				break;
				case (degree <= 30): this.props.playerPoints("Bankrupt");
				break;
				case (degree <= 45): this.props.playerPoints(300);
				break;
				case (degree <= 60): this.props.playerPoints(500);
				break;
				case (degree <= 75): this.props.playerPoints(450);
				break;
				case (degree <= 90): this.props.playerPoints(500);
				break;
				case (degree <= 105): this.props.playerPoints(800);
				break;
				case (degree <= 120): this.props.playerPoints("Lose A Turn");
				break;
				case (degree <= 135): this.props.playerPoints(700);
				break;
				case (degree <= 150): this.props.playerPoints("Free Play"); setTimeout(() => {this.props.message("Free Play will give you immunity from incorrect guesses of either letters or words, as well as the option to buy a vowel for free")}, 3000);
				break;
				case (degree <= 165): this.props.playerPoints(650);
				break;
				case (degree <= 180): this.props.playerPoints("Bankrupt");
				break;
				case (degree <= 195): this.props.playerPoints(900);
				break;
				case (degree <= 210): this.props.playerPoints(500);
				break;
				case (degree <= 224): this.props.playerPoints(350);
				break;
				case (degree <= 240): this.props.playerPoints(600);
				break;
				case (degree <= 255): this.props.playerPoints(500);
				break;
				case (degree <= 270): this.props.playerPoints(400);
				break;
				case (degree <= 285): this.props.playerPoints(550);
				break;
				case (degree <= 300): this.props.playerPoints(800);
				break;
				case (degree <= 315): this.props.playerPoints(300);
				break;
				case (degree <= 330): this.props.playerPoints(700);
				break;
				case (degree <= 345): this.props.playerPoints(900);
				break;
				case (degree < 360): this.props.playerPoints(500);
				break;
				case (degree = 360): this.props.playerPoints(5000);
				break;
				default: this.props.playerPoints("Error");
			}
		}
		else {
			this.props.message("The wheel has already been spun, please guess a letter or word");
		}
	};
	
	render () {
		return (
			<div id="wheel-container">
				<div id="app-wheel-pointer" />
				<img src={WheelImage} onClick={this.spinWheel.bind(this)} id="wheel" alt="The Wheel of fortune" />
			</div>
		)
	}
}

export default Wheel;