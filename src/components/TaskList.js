import React, { PropTypes } from 'react'
import TaskItem from './TaskItem'

const TaskList = ({ tasks, onComplete, onDelete, onSort }) => {

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
        classString={classString}
        completed={task.completed}
        onComplete={onComplete}
        onDelete={onDelete}
        onSort={onSort}
        text={task.text}
      />
    )
  })

  return (
    <div className="list">
      <h5>Current Tasks:</h5>
        {taskItems}
    </div>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
}

export default TaskList
