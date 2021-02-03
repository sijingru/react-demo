import React, { Component } from 'react'
import ReactDom from 'react-dom'

import './index.less'
import TopBar from './TopBar.jsx'
import TodoList from './TodoList.jsx'
import PutTask from './PutTask.jsx'
class App extends Component {
	constructor(props) {
		super(props);
    this.state = {oriTodoList: [
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
			],
			todoList: [
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
			],
		};
	}
	changeTaskStatus (id)  {
		const todoList = this.state.todoList;
		todoList.map(d => {
			if (d.id === id) d.status = !d.status;
			return d;
		});
		this.setState({todoList})
	}
	changeShowList (flag)  {
		const a = this.state.oriTodoList.filter(item => item.status === flag )
		this.setState({todoList: a})
	}
	addTask (taskName)   {
		const todoList = this.state.todoList
		todoList.push({
			name: taskName,
			status: false,
			id: todoList.length + 1
		})
		this.setState({
			todoList,
			oriTodoList: todoList
		})
	}
	render() {
		return <div>
				<div>
					<span onClick={() => this.changeShowList(true)}>待办</span>
					<span onClick={() => this.changeShowList(false)}>已完成</span>
				</div>
				<TodoList todoList={this.state.todoList} changeTaskStatus={(id) => this.changeTaskStatus(id)} />
				<PutTask addTask={(taskName) => this.addTask(taskName)}/>
		</div>
	}
}

ReactDom.render(<App />, document.getElementById('reactApp'))