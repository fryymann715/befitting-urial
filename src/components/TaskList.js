import React, { PropTypes } from 'react'
import TaskItem from './TaskItem'

const TaskList = ({ editTaskString, onComplete, onDelete, onEditTask, onSetEdit, onSubmitEdit, onSort, tasks }) => {

  const taskItems = tasks.map( (task, key) => {

    let classString

    let taskText

    let onChangeThing

    if ( task.completed === true ){
      classString = 'task-item completed'
    } else {
      classString = 'task-item'
    }

    if ( task.beingEdited === true ){
      taskText = editTaskString
      onChangeThing = onEditTask
    } else {
      taskText = task.text

    }

    return (
      <TaskItem
        classString={classString}
        completed={task.completed}
        editTaskString={editTaskString}
        id={task.id}
        key={key}
        onComplete={onComplete}
        onDelete={onDelete}
        onEditTask={onChangeThing}
        onSetEdit={onSetEdit}
        onSubmitEdit={onSubmitEdit}
        onSort={onSort}
        text={taskText}
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
  editTaskString: PropTypes.string,
  tasks: PropTypes.array,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEditTask: PropTypes.func,
  onSetEdit: PropTypes.func,
  onSubmitEdit: PropTypes.func,
  onSort: PropTypes.func.isRequired,
}

export default TaskList
