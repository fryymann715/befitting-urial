import React, { Component } from 'react'

export default class HelloBox extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      textString: ''
    }
    this.onChange = this.onChange.bind( this )
    this.onSave = this.onSave.bind( this )
  }

  onChange( event ) {
    this.setState({ textString: event.target.value })
  }

  onSave( event ) {
    if ( event.key === 'Enter' ) {
      
    }
  }

  render() {
    return (
      <div>
        <form action="http://localhost:5000/task" method="post">
        <input name="text" type="text" value={this.state.textString} onChange={this.onChange} onSubmit={this.onSave} />
      </form>
      </div>
    )
  }
}
