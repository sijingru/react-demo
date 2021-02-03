import React, { Component } from 'react'
import ReactDom from 'react-dom'
class TodoList extends Component {

	render() {
		return <div>
			{
				this.props.todoList.map(item => (
					(
						<section key={item.id}>
							<input type="checkbox" onChange={() => this.props.changeTaskStatus(item.id)} readOnly value={item.status} checked={item.status ? 'checked' : null}/>
							<span>{item.name}</span>
						</section>
					)
				))
			}
		</div>
	}
}

export default TodoList