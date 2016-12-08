import React, { PropTypes } from 'react'


const TaskItem = ({ id, text, completed, onComplete, classString }) => {

  const handleClick = (event) => {
    if ( event.type === 'dblclick' ){
      const options = { event: event, id: id }
      onComplete(options)
    }
  }


  return (
    <div className={classString} onDoubleClick={handleClick} key={id}>
      <span>{text}</span>
      <span>{completed}</span>
    </div>
  )
}

TaskItem.propTypes = {
  completed:    PropTypes.bool.isRequired,
  id:           PropTypes.number.isRequired,
  text:         PropTypes.string.isRequired,
  handleClick:  PropTypes.func
}

export default TaskItem
