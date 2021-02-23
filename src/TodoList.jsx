import React, { Component } from 'react'
import PutTask from './PutTask'
class TodoList extends Component {
	constructor(props) {
		super(props)
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
			doneStatus: false,
		}
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
		const AllStatus = this.state.doneStatus,
		showList = this.state.todoList.filter(item => item.status === AllStatus)
		let list  = ''
		if(AllStatus) {
			list = showList.map(item => (
						<section key={item.id}>
							{/* <input type="checkbox" onChange={() => this.props.changeTaskStatus(item.id)} readOnly value={item.status} checked={item.status ? 'checked' : null}/> */}
							<span>{item.name}</span>
						</section>
				))
		} else {
			list = showList.map(item => (
						<section key={item.id}>
							<input type="checkbox" onChange={() => this.changeTaskStatus(item.id)} readOnly value={item.status} checked={item.status ? 'checked' : null}/>
							<span>{item.name}</span>
						</section>
				))
		}
		return <div>
			<div>
				<span onClick={() => this.changeShowList(false)}>待办</span>
				<span onClick={() => this.changeShowList(true)}>已完成</span>
			</div>
			{list}
			<PutTask addTask={(taskName) => this.addTask(taskName)}/>
		</div>
	}
}

export default TodoList