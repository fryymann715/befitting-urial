import React, { PropTypes } from 'react'
import TaskItem from './TaskItem'

const TaskList = ({ tasks, onComplete }) => {

  const taskItems = tasks.map( (task, key) => {

    let classString

    if ( task.completed === true ){
      classString = 'task-item completed'
    } else {
      classString = 'task-item'
    }

    return (
      <TaskItem
        key={key}
        id={task.id}
        text={task.text}
        completed={task.completed}
        onComplete={onComplete}
        classString={classString}/>
    )
  })

  // const taskItems = tasks.map( (task, key) => {
  //   return (
  //     <li key={key}>
  //       <span>{task.text}</span>
  //     </li>
  //   )
  // })

  return (
    <div className="list">
      <h5>Current Tasks:</h5>
        {taskItems}
    </div>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  onComplete: PropTypes.func
}

export default TaskList
