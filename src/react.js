import React, { Component } from 'react'
import ReactDom from 'react-dom'

import './index.less'
import TopBar from './TopBar.jsx'
import TodoList from './TodoList.jsx'
import PutTask from './PutTask.jsx'
import NameForm from './NameForm.jsx'
class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
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
			doneStatus: false
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
		this.setState({doneStatus: flag})
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
		})
	}
	render() {
		return <div>
				<div>
					<span onClick={() => this.changeShowList(false)}>待办</span>
					<span onClick={() => this.changeShowList(true)}>已完成</span>
				</div>
				<TodoList todoList={this.state.todoList} doneStatus={this.state.doneStatus} changeTaskStatus={(id) => this.changeTaskStatus(id)} />
				<PutTask addTask={(taskName) => this.addTask(taskName)}/>
				<NameForm ></NameForm>
		</div>
	}
}

ReactDom.render(<App />, document.getElementById('reactApp'))