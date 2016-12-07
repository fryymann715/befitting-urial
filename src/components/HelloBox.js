import React, { PropTypes } from 'react'

const EntryBox = ({ onChange, textString, onSave }) => {

  const onKeyDown = ( event ) => {
    if ( event.keyCode === 13 ) {
      onSave()
    }
  }

  return (
    <div className="entry-box">
      <input className="entry-input"
        placeholder="Add a Task"
        onChange={onChange}
        value={textString}
        onKeyDown={onKeyDown} />
    </div>
  )
}

EntryBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  textString: PropTypes.string
}

export default EntryBox
