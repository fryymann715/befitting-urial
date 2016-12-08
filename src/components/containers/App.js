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
    this.onSort = this.onSort.bind( this )
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

  onSort({ id, isUp }) {

    const tasks = this.state.tasks
    let taskPriority, swapID, swapPriority

    for ( let index in tasks ) {
      if ( tasks[index].id === id ) {
        taskPriority = tasks[index].priority
      }
    }
    console.log(tasks.length);

    if ( taskPriority <= 0 && isUp ){
      return
    }

    if ( taskPriority >= tasks.length - 1 && !isUp ){
      return
    }

    if ( isUp ){
      swapID = tasks[ taskPriority - 1 ].id
      swapPriority = taskPriority - 1
     }

     else {
       swapID = tasks[ taskPriority + 1 ].id
       swapPriority = taskPriority + 1
     }


    this.updatePriority( id, swapPriority )
    this.updatePriority( swapID, taskPriority )

    const unsortedTasks = tasks.map( task => {
      if ( task.id === id ) {
        task.priority = swapPriority
      }
      else if ( task.id === swapID ) {
        task.priority= taskPriority
      }
      return task
    })

    const sortedTasks = []

    for( let i=0; i < unsortedTasks.length; i++) {

      for( let x=0; x < unsortedTasks.length; x++ ) {
        if ( unsortedTasks[x].priority === i ){
          sortedTasks.push( unsortedTasks[ x ] )
        }
      }
    }

    this.setState({ tasks: sortedTasks })
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
      <div className="app">
        <EntryBox onChange={this.onChange} textString={this.state.textString} onSave={this.onSave}/>
        <TaskList onComplete={this.onComplete} onSort={this.onSort} tasks={this.state.tasks} />
      </div>
    )
  }
}

export default App
