import React, { Component } from 'react';
import ReactDom from 'react-dom';
import fomat from 'utils/index';
import './app.css';

class App extends Component {
	constructor (){
		super();
	}

	render () {
		return (
			<div onClick={fomat.fomat} className="App app">
				<header className="App-header">
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default App;