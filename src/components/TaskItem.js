import React, { PropTypes } from 'react'


const TaskItem = ({ id, text, onComplete, onSort, classString }) => {

  const handleClick = (event) => {
    if ( event.type === 'dblclick' ){
      const options = { event: event, id: id }
      onComplete(options)
    }
  }

  const handleOnSortUp = () => {
    onSort({ id: id, isUp: true })
  }

  const handleOnSortDown = () => {
    onSort({ id: id })
  }


  return (
      <div className={classString} onDoubleClick={handleClick} key={id}>
        <span>{text}</span>
        <div className="task-buttons">
          <button onClick={handleOnSortUp}>&#8593;</button>
          <button onClick={handleOnSortDown}>&#8595;</button>
        </div>
      </div>
  )
}

TaskItem.propTypes = {
  classString:  PropTypes.string.isRequired,
  handleClick:  PropTypes.func,
  id:           PropTypes.number.isRequired,
  onComplete:   PropTypes.func,
  onSort:       PropTypes.func.isRequired,
  text:         PropTypes.string.isRequired,
}

export default TaskItem
