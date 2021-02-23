import React, { Component } from 'react'
import ReactDom from 'react-dom'
class TodoList extends Component {

	render() {
		const AllStatus = this.props.doneStatus,
		showList = this.props.todoList.filter(item => item.status === AllStatus)
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
							<input type="checkbox" onChange={() => this.props.changeTaskStatus(item.id)} readOnly value={item.status} checked={item.status ? 'checked' : null}/>
							<span>{item.name}</span>
						</section>
				))
		}
		return <div>
			{list}
		</div>
	}
}

export default TodoList