import React, { Component } from 'react'
import ReactDom from 'react-dom'

class App extends Component {
	render() {
		return <div>
			hello word 12
			</div>
	}
}

ReactDom.render(<App />, document.getElementById('reactApp'))