import React, { PropTypes } from 'react'


const TaskItem = ({ id, text, onComplete, onSortUp, classString }) => {

  const handleClick = (event) => {
    if ( event.type === 'dblclick' ){
      const options = { event: event, id: id }
      onComplete(options)
    }
  }

  const handleSortUp = () => {
    onSortUp({ id: id })
  }


  return (
      <div className={classString} onDoubleClick={handleClick} key={id}>
        <span>{text}</span>
        <button onClick={handleSortUp}>&#8593;</button>
        <button>&#8595;</button>
      </div>
  )
}

TaskItem.propTypes = {
  classString:  PropTypes.string.isRequired,
  handleClick:  PropTypes.func,
  id:           PropTypes.number.isRequired,
  onComplete:   PropTypes.func,
  onSortUp:     PropTypes.func.isRequired,
  text:         PropTypes.string.isRequired,
}

export default TaskItem
