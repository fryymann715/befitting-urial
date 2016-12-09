import React, { Component } from 'react'
import TaskList from '../TaskList'
import EntryBox from '../HelloBox'

class App extends Component {

  constructor( props ){
    super( props )
    this.state = {
      fetchString: 'http://localhost:5000/task',
      tasks: [],
      textString: '',
      editTaskString: ''
    }
    this.onChange = this.onChange.bind( this )
    this.onComplete = this.onComplete.bind( this )
    this.onDelete = this.onDelete.bind( this )
    this.onEditTask = this.onEditTask.bind( this )
    this.onSetEdit = this.onSetEdit.bind( this )
    this.onSubmitEdit = this.onSubmitEdit.bind( this )
    this.onSave = this.onSave.bind( this )
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

    const fetchString = this.state.fetchString
    fetch( fetchString, fetchIsHappenning )
    .then( data => data.json() )
    .then( data => {
      const tasks = data.data
      tasks.map( task => task['beingEdited'] = false )
      this.setState({ tasks })
    })
  }

  onChange( event ) {
    this.setState({ textString: event.target.value })
  }


  onComplete({ id, completed }) {

    const tasks = this.state.tasks
    const fetchIsHappenning = {
      method: 'PUT',
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: `completed=${completed}&id=${id}`
    }
    const fetchString = this.state.fetchString
    fetch( fetchString, fetchIsHappenning )
    .then( () => {
      tasks.forEach( task => {
        if ( task.id === id ){ task.completed = completed }
      })
      this.setState({ tasks })
    })
  }

  onDelete({ id }) {
    const tasks = this.state.tasks
    const newTasks = []
    let x = 0
    for ( let i in tasks ) {
      if ( tasks[i].id !== id ){
        tasks[i].priority = x
        newTasks.push( tasks[i] )
        x++
      }
    }
    this.setState({ tasks: newTasks })

    const fetchIsHappenning = {
      method: 'DELETE',
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' })
          }

    let deleteString = this.state.fetchString
    deleteString += `/${id}`
    fetch( deleteString, fetchIsHappenning )

    newTasks.forEach( (task, index) => {
      this.updatePriority( task.id, index )
    })
  }

  onEditTask ( event ) {
    this.setState({ editTaskString: event.target.value })
  }

  onSetEdit( id ) {
    const tasks = this.state.tasks
    tasks.map( task => {
      if ( task.id === id ) {
        task.beingEdited = true
      } else {
        task.beingEdited = false
      }
    })
    this.setState({ tasks, editTaskString: '' })
  }

  onSubmitEdit( id ) {
    const editedString = this.state.editTaskString

    const fetchIsHappening = {
      method: 'PUT',
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json, application/xml, text/plain, text/html. *.*',
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: `text=${editedString}&id=${id}`
    }

    const fetchString = this.state.fetchString

    fetch( fetchString, fetchIsHappening )
    .then( () => {
      console.log("SUCCESS:")
    })
  }

  onSave() {

    const taskArray = this.state.tasks
    const nextPriority = taskArray.length

    const taskText = this.state.textString

    if ( taskText === undefined || taskText === '' ){
      return
    }

    const fetchIsHappenning = {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: `text=${taskText}&priority=${nextPriority}`
    }
    const fetchString = this.state.fetchString

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
    const fetchString = this.state.fetchString
    fetch( fetchString, fetchIsHappenning )

  }

  render() {
    return (
      <div className="app">
        <EntryBox onChange={this.onChange} textString={this.state.textString} onSave={this.onSave} />
        <TaskList
          editTaskString={this.state.editTaskString}
          onComplete={this.onComplete}
          onDelete={this.onDelete}
          onEditTask={this.onEditTask}
          onSetEdit={this.onSetEdit}
          onSubmitEdit={this.onSubmitEdit}
          onSort={this.onSort}
          tasks={this.state.tasks} />
      </div>
    )
  }
}

export default App
