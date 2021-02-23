import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import './index.less'
import TodoList from './TodoList.jsx'
import NameForm from './NameForm.jsx'
class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
			routePath: [
				'todoList',
				'nameForm'
			]
		};
	}
	
	render() {
		return <div>
				{
					this.state.routePath.map(item => {
						return <button >
								<Link to={item}>{item}</Link>
							</button>
					})
				}
				<Route exact path='/todoList' component={TodoList}></Route>
				<Route exact path='/nameForm' component={NameForm}></Route>
		</div>
	}
}

ReactDom.render((
	<Router>
		<Route path='/' component={App}></Route>
	</Router>
), document.getElementById('reactApp'))
