import React, { PropTypes } from 'react'

const TaskItem = ({ id, text, completed }) => {
  return (
    <div className="task-item" key={id}>
      <span>{text}</span>
      <span>{completed}</span>
    </div>
  )
}

TaskItem.propTypes = {
  completed:    PropTypes.bool.isRequired,
  id:           PropTypes.number.isRequired,
  text:         PropTypes.string.isRequired
}

export default TaskItem
