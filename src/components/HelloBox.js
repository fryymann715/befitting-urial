import React, { Component } from 'react'

export default class HelloBox extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      textString: ''
    }
  }

  handleChange( event ) {
    this.setState({ textString: event.target.value })
  }

  render() {
    return (
      <div>
        <span>Hello, I am box.</span>
        <input type="text" value={this.state.textString} onChange={this.handleChange} />
      </div>
    )
  }
}
