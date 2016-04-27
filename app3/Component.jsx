import React from 'react';
// import './component.css';

const style = {
	backgroundColor: '#AAA'
};

export default class Hello extends React.Component {
	render() {
		return (
			<div style={style}>
				<h1>Hello world</h1>
			</div>
		);
	}
}