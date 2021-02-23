import React, { Component } from 'react'

class NameForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: '',
			selectValue: ['coconut', 'lime'],
			isGoing: true,
			numberOfGuests: 2
		}
		this.handleInputChange = this.handleInputChange.bind(this)
	}
	handleChnage(event) {
		this.setState({value: event.target.value, selectValue: event.target.value})
	}
	handleSubmit(event) {
		alert('提交的名字：' + this.state.value)
		event.preventDefault()
	}
	handleInputChange(event) {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name

		this.setState({
			[name]: value
		})
	}
	render() {
		return (
			<form onSubmit={(event) => this.handleSubmit(event)}>
				<label >
					名字：
					<input type="text" value={null} onChange={(event) => this.handleChnage(event)}/>
        	<br />
					<textarea value={this.state.value} onChange={(event) => this.handleChnage(event)} name="" id="" cols="30" rows="10"></textarea>
				</label>
        <br />
				<label>
					你喜欢的风味：
					<select value={this.state.selectValue} multiple={true} onChange={(event => this.handleChnage(event))} >
						<option value="grapefruit">葡萄柚</option>
						<option value="lime">酸橙</option>
						<option value="coconut">椰子</option>
						<option value="mango">芒果</option>
					</select>
				</label>
        <br />
				<label>
          参与:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          来宾人数:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
        <br />
				<input type="submit" value="提交"/>
			</form>
		)
	}
}

export default NameForm