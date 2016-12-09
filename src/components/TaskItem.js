import React, { PropTypes } from 'react'


const TaskItem = ({ classString, completed, editTaskString, id, onComplete, onDelete, onEditTask, onSetEdit, onSubmitEdit, onSort, text }) => {

  const handleComplete = (event) => {

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
  }

  const handleEdit = ( event ) => {

    if( event.type === 'click' ) {
      onSetEdit( id )

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

  const handleSubmit = ( event ) => {
    if ( event.keyCode === 13 ){
      onSubmitEdit( id )
    }
  }

  return (
      <div className={classString} key={id}>
        <span onDoubleClick={handleComplete}><input id={id} onChange={onEditTask} onKeyDown={handleSubmit} value={text}  /></span>
          <div className="task-buttons">
            <button className="edit btn" onClick={ handleEdit }>EDIT</button>
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
  editTaskString: PropTypes.string,
  handleClick:  PropTypes.func,
  id: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEditTask: PropTypes.func,
  onSetEdit: PropTypes.func,
  onSubmitEdit: PropTypes.func,
  onSort: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default TaskItem
