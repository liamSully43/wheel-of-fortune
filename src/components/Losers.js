import React from "react";

function Losers (props) {
		return (
			<div key={props.id + "l"}>
				<h1 key={props.name + "n"}>{props.name}</h1>
				<h2 key={props.points + "p"}>{props.points}</h2>
			</div>
		)
}

export default Losers;