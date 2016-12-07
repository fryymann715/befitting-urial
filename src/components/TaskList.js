import React, { PropTypes } from 'react'
import TaskItem from './TaskItem'

const TaskList = ({ tasks }) => {

  const taskItems = tasks.map( (task, key) => {
    return (
      <TaskItem
        key={key}
        id={task.id}
        text={task.text}
        completed={task.completed} />
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
      <h5>TaskList Component</h5>
      <ul>
        {taskItems}
      </ul>
    </div>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array
}

export default TaskList
