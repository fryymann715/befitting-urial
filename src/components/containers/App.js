import React, { Component } from 'react'
import TaskList from '../TaskList'
import EntryBox from '../HelloBox'

class App extends Component {

  constructor( props ){
    super( props )
    this.state = {
      tasks: [],
      textString: ''
    }
    this.onChange = this.onChange.bind( this )
    this.onSave = this.onSave.bind( this )
    this.onComplete = this.onComplete.bind( this )
  }

  componentDidMount() {
    const fetchIsHappenning = {
      method: 'GET', mode: 'cors', headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    const fetchString = 'http://localhost:5000/task'
    fetch( fetchString, fetchIsHappenning )
    .then( data => data.json() )
    .then( data => {
      const tasks = data.data
      this.setState({ tasks })
    })
  }

  onChange( event ) {
    this.setState({ textString: event.target.value })
  }

  onComplete({ event , id }) {
    console.log("EVENT", id)
    const tasks = this.state.tasks
    tasks.forEach( task => {
      if ( task.id === id ){ task.completed = true }
    })
    this.setState({ tasks })
  }

  onSave() {
    const taskText = this.state.textString
    const fetchIsHappenning = {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({ 'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                             'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: `text=${taskText}`
    }
    const fetchString = 'http://localhost:5000/task'
    fetch( fetchString, fetchIsHappenning )
    .then( response => response.json() )
    .then( raw_task => {
      const taskArray = this.state.tasks
      const task = raw_task.data
      taskArray.push(task)
      this.setState({ textString: '', tasks: taskArray })
    })
    .catch( error => console.log( error ) )
  }

  render() {
    return (
      <div className="container app">
        <div>
          <EntryBox onChange={this.onChange} textString={this.state.textString} onSave={this.onSave}/>
        </div>
        <TaskList onComplete={this.onComplete} tasks={this.state.tasks} />
      </div>
    )
  }
}

export default App
