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
    this.onSortUp = this.onSortUp.bind( this )
    this.updatePriority = this.updatePriority.bind( this )
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

  onComplete({ id }) {

    const tasks = this.state.tasks

    const fetchIsHappenning = {
      method: 'PUT',
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: `completed=True&id=${id}`
    }
    const fetchString = 'http://localhost:5000/task'
    fetch( fetchString, fetchIsHappenning )
    .then( () => {
      tasks.forEach( task => {
        if ( task.id === id ){ task.completed = true }
      })
      this.setState({ tasks })
    })

  }

  onSave() {

    const taskArray = this.state.tasks
    const nextPriority = taskArray.length

    const taskText = this.state.textString
    const fetchIsHappenning = {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: `text=${taskText}&priority=${nextPriority}`
    }
    const fetchString = 'http://localhost:5000/task'
    fetch( fetchString, fetchIsHappenning )
    .then( response => response.json() )
    .then( raw_task => {
      const task = raw_task.data
      taskArray.push(task)
      this.setState({ textString: '', tasks: taskArray })
    })
    .catch( error => console.error( error ) )
  }

  onSortUp({ id }) {
    console.log("ID:", id)
    const tasks = this.state.tasks
    let taskPriority, swapID, swapPriority

    for ( let index in tasks ) {
      if ( tasks[index].id === id ) {
        taskPriority = tasks[index].priority
        swapID = tasks[index-1].id
        swapPriority = tasks[index-1].priority
      }
    }
    console.log("SWAP ID ", swapID)
    this.updatePriority( id, swapPriority )
    this.updatePriority( swapID, taskPriority )
    //
    // const resortedTasks = []
    //
    // for( let i=0; i < tasks.length; i++) {
    //
    //
    // }
    //
    // this.setState({ tasks: resortedTasks })
  }

  updatePriority( id, priority ) {
    const fetchIsHappenning = {
      method: 'PUT',
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: `priority=${priority}&id=${id}`
    }
    const fetchString = 'http://localhost:5000/task'
    fetch( fetchString, fetchIsHappenning )

  }

  render() {
    return (
      <div className="container app">
        <div>
          <EntryBox onChange={this.onChange} textString={this.state.textString} onSave={this.onSave}/>
        </div>
        <TaskList onComplete={this.onComplete} onSortUp={this.onSortUp} tasks={this.state.tasks} />
      </div>
    )
  }
}

export default App
