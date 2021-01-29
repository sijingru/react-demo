import React, { Component } from 'react'
import ReactDom from 'react-dom'

class TopBar extends Component {
	render() {
		return <div>
			<input type="text" value={}/>
			<button onClick={this.props.addTask}>添加</button>
		</div>
	}
}

export default TopBar