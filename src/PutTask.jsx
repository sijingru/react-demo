import React, { Component } from 'react'
import ReactDom from 'react-dom'

class PutTask extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inputValue: ''
		}
	}
	changeValue(e) {
		this.setState({
			inputValue: e.target.value
		})
	}
	render() {
		return <div>
			<input type="text"  onChange={(e) => this.changeValue(e)}/>
			<button onClick={() => this.props.addTask(this.state.inputValue)}>添加</button>
		</div>
	}
}

export default PutTask