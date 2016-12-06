import React, { PropTypes } from 'react'

const TaskList = ({ tasks }) => {

  const taskItems = tasks.map( ( task, key ) => {
    return (
      <div key={key}> {task.text} </div>
    ) })

    return (
      <div className="list">
        <ul>{taskItems}</ul>
      </div>
    )
}
