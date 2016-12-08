import React, { PropTypes } from 'react'


const TaskItem = ({ id, text, onComplete, onDelete, onSort, classString }) => {

  const handleComplete = (event) => {
    if ( event.type === 'dblclick' ){
      const options = { event: event, id: id }
      onComplete(options)
    }

  }

  const handleDelete = () => {
    onDelete({ id: id })
  }

  const handleOnSortUp = () => {
    onSort({ id: id, isUp: true })
  }

  const handleOnSortDown = () => {
    onSort({ id: id })
  }



  return (
      <div className={classString} key={id}>
        <span onDoubleClick={handleComplete}>{text}</span>
          <div className="task-buttons">
            <button className="sort btn" onClick={ handleOnSortUp }> &#8593; </button>
            <button className="sort btn" onClick={ handleOnSortDown }> &#8595; </button>
            <button className="delete btn" onClick={ handleDelete }> x </button>
          </div>
      </div>
  )
}

TaskItem.propTypes = {
  classString:  PropTypes.string.isRequired,
  handleClick:  PropTypes.func,
  id: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default TaskItem
