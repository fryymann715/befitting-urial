import React, { PropTypes } from 'react'

const TaskItem = ({ id, text, completed }) => {
  return (
    <li className="topic-item" key={id}>
      <span>{text}</span>
      <span>{completed}</span>
    </li>
  )
}

TaskItem.propTypes = {
  completed:    PropTypes.bool.isRequired,
  id:           PropTypes.number.isRequired,
  text:         PropTypes.string.isRequired
}

export default TaskItem
