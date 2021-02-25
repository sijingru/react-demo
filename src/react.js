import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { 
	HashRouter as Router,
	 Route,
	 Link, 
	 Switch, 
	 useRouteMatch,
   useParams,
} from 'react-router-dom'
import './index.less'
import TodoList from './TodoList.jsx'
import NameForm from './NameForm.jsx'
import Calculator from './Calculator.jsx'
class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
			routePath: [
				'todoList',
				'nameForm',
				'calculator'
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
				<Switch>
					<Route exact path='/todoList' >
						<TodoList	/>
					</Route>
					<Route exact path='/nameForm' >
						<NameForm />
					</Route>
					<Route exact path='/calculator' >
						<Calculator  />
					</Route>
				</Switch>
		</div>
	}
}
ReactDom.render((
	<Router>
		<Route path='/' >
			<App />
		</Route>
	</Router>
), document.getElementById('reactApp'))
