import React, { Component } from 'react'
import ReactDom from 'react-dom'

import './index.less'
import TopBar from './TopBar.jsx'
import TodoList from './TodoList.jsx'
class App extends Component {
	constructor(props) {
		super(props);
    this.state = {todoList: [
			{
				name: '待办1',
				status: false,
				id: 1
			},
			{
				name: '待办2',
				status: false,
				id: 2
			},
			{
				name: '待办3',
				status: false,
				id: 3
			},
			{
				name: '待办4',
				status: false,
				id: 4
			},
		]};
	}
	changeTaskStatus(id) {
		const todoList = this.state.todoList;
		todoList.map(d => {
			if (d.id === id) d.status = !d.status;
			return d;
		});
		
		this.setState({todoList})
		
	}
	render() {
		return <div>
			<TopBar />
			<TodoList todoList={this.state.todoList} changeTaskStatus={this.changeTaskStatus.bind(this)} />
		</div>
	}
}

ReactDom.render(<App />, document.getElementById('reactApp'))