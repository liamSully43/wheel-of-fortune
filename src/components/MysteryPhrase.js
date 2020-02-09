import React from 'react';
import NameField from './NameField';

var phrases = [
/* Around The House */			["FRIDGE FREEZER", "SHOWER CURTAIN", "TELEVISION SET", "KETTLE", "LAMP SHADE", "LEAF BLOWER", "DESK", "WARDROBE", "RADIATOR COVER", "LAWN CHAIR"],
/* TV & Movies */				["THE WOLF OF WALL STREET", "MISSION IMPOSSIBLE", "DUMB AND DUMBER", "ONCE UPON A TIME IN HOLLYWOOD", "THE AVENGERS", "FRIENDS", "IT'S ALWAYS SUNNY IN PHILADELPHIA", "THE OFFICE", "STRANGER THINGS", "GAME OF THRONES"],
/* People & Characters */		["SHERLOCK HOLMES", "TOM HANKS", "BATMAN", "AARON PAUL", "JAMES BOND", "WILL SMITH", "JESSICA JONES", "IDRIS ELBA", "KATNISS EVERDEEN", "DAME JUDI DENCH"],
/* Music */						["QUEEN", "BOHEMIAN RHAPSODY", "KANYE", "TAYLOR SWIFT", "SMELLS LIKE TEEN SPIRIT", "HEY JUDE", "BAD GUY", "HAPPY", "ED SHEERAN", "LADY GAGA"],
/* Landmarks */					["THE EIFFEL TOWER", "THE GREAT BARRIER REEF", "BIG BEN", "THE STATUE OF LIBERTY", "THE GREAT WALL OF CHINA", "THE GREAT PYRAMIDS OF EGYPT", "THE LEANING TOWER OF PISA", "CENTRAL PARK", "THE NIAGARA FALLS", "THE MOSCOW KREMLIN"],
/* History */					["THE MOON LANDING", "THE BLACK PLAGUE", "NOTRE DAME DE PARIS FIRE", "THE GREAT DEPRESSION", "WORLD WAR TWO", "THE FALL OF THE BERLIN WALL", "CHERNOBYL DISASTER", "GULF WAR", "THE GREAT FIRE OF LONDON", "COLD WAR"]
];
var phraseNames = ["Around the House", "TV & Movies", "People & Characters", "Music", "Landmarks", "History"];

class MysteryPhrase extends React.Component {
	constructor(props){
		super(props);
		this.arrayNumber = Math.floor(Math.random() * 6);
		this.phraseNumber = Math.floor(Math.random() * 10);
		this.phraseCharacters = phrases[this.arrayNumber][this.phraseNumber].split("");
		this.props.phrase(phrases[this.arrayNumber][this.phraseNumber], this.phraseCharacters);
		this.phrases = phrases;
	}
	selectPhrase = () => {
		for(var y = 0; this.phraseCharacters.length > y; y++) {
			document.querySelectorAll(".app-letters")[y].classList.remove("app-visible-letters");
		}
		phrases[this.arrayNumber].splice(this.phraseNumber, 1);
		if(phrases[this.arrayNumber].length === 0) {
			phrases.splice(this.arrayNumber, 1);
			phraseNames.splice(this.arrayNumber, 1);
		}
		this.arrayNumber = Math.floor(Math.random() * phrases.length);
		this.phraseNumber = Math.floor(Math.random() * phrases[this.arrayNumber].length);
		this.phraseCharacters = phrases[this.arrayNumber][this.phraseNumber].split("");
		this.props.phrase(phrases[this.arrayNumber][this.phraseNumber], this.phraseCharacters);
	}
	
	mysteryPhrase() {
		var x = <p></p>;
		var letters = [];
		var word = React.createElement('div', {className: "app-words"}, []);
		var elements = [];
		for (var i=0; this.phraseCharacters.length > i; i++) {
			if(this.phraseCharacters[i] === " ") {
				x = <p key={i} className="app-visible-letters app-letters space-letter">{this.phraseCharacters[i]}</p>;
				letters.push(x);
				word = React.createElement('div', {className: "app-words", key: i}, letters);
				letters = [];
				elements.push(word);
			}
			else if(this.phraseCharacters[i] === "'") {
				x = <p key={i} className="app-visible-letters app-letters">{this.phraseCharacters[i]}</p>;
				letters.push(x);
			}
			else {
				x = <p key={i} className="app-hidden-letters app-letters">{this.phraseCharacters[i]}</p>;
				letters.push(x);
			}
		}
		word = React.createElement('div', {className: "app-words", key: i}, letters);
		letters = [];
		elements.push(word);
		return elements;
	}
	
	revealCharacters(guess) {
		for(var e = 0; this.phraseCharacters.length > e; e++) {
			if(this.phraseCharacters[e] === guess) {
				document.querySelectorAll(".app-letters")[e].classList.add("app-visible-letters");
			}
		}
	}

	render() {
		return (
			<div id="app-right-container">
				<NameField name={this.props.name} money={this.props.money} />
				<div className="app-right-containers">
					<span id="app-mystery-phrase-container">
						<div id="app-mystery-phrase-cover" />
						{this.mysteryPhrase()}
					</span>
				</div>
				<p className="app-right-containers"><span>{phraseNames[this.arrayNumber]}</span></p>
			</div>
			)
	}
}

export default MysteryPhrase;