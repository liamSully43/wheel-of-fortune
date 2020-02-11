import React from 'react';

class NameField extends React.Component {
	render() {
		return 	<p className="app-right-containers"><span>Player: {this.props.name} <br />${this.props.money}</span></p>
	}
}

export default NameField;