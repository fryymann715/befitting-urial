import React, { PropTypes } from 'react'


const TaskItem = ({ completed, id, text, onComplete, onDelete, onSort, classString }) => {

  const handleClick = (event) => {
    if ( event.type === 'dblclick' ){
      let options
      if( completed ){
        options = { id: id, completed: false }
      }
      else {
        options = { id: id, completed: true }
      }
      onComplete(options)
    }

    if( event.type === 'click' ) {
      //TODO: Select the span and make it typeable
      console.log(event)

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
        <span onDoubleClick={handleClick}>{text}</span>
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
  completed: PropTypes.bool.isRequired,
  handleClick:  PropTypes.func,
  id: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default TaskItem
