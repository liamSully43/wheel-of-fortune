import React from 'react';
import Losers from "./Losers"
import players from ".././index";
function generateLosers(loser) {
	return <Losers name={loser.name} points={loser.points} id={loser.id} key={loser.id} />
}

class EndScreen extends React.Component {
	
	positions(names, points) {
		class player {
			constructor(name, points, id) {
				this.name = name;
				this.points = points;
				this.id = id;
			}
		}
		var players = [];
		for(var i = 0; names.length > i; i++) {
			var currentPlayer = new player(names[i], points[i], i);
			for(var x = 0; players.length <= names.length; x++) {
				if(typeof players[x] === "undefined" || players[x].points < currentPlayer.points) {
					players.splice(x, 0, currentPlayer);
					break;
				}
			}
		}
		var element = <div>
				<h1 id="endScreen-wining-player-name" key={"1w"} >{players[0].name}</h1>
				<h2 id="endScreen-wining-player-points" key={"2w"} >${players[0].points}</h2>
			</div>
		players.shift()
		return (
			<div>
				<h1 id="endScreen-wining-header" key={"0w"}>Winner!</h1>
				{element}
				{players.map(generateLosers)}
			</div>
		)
	}
	
	render() {
		return (
			<div className="background">
				<div id="endScreen-container">
					<div>{this.positions(players, this.props.points)}</div>
				</div>
			</div>
		)
	}
}

export default EndScreen;