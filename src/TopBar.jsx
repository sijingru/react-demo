import React, { Component } from 'react'
import ReactDom from 'react-dom'

class TopBar extends Component {
	render() {
		return <div>
			<span onClick={this.props.changeShowList(true)}>待办</span>
			<span onClick={this.props.changeShowList(false)}>已完成</span>
		</div>
	}
}

export default TopBar