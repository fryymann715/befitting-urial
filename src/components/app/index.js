import React from 'react'
import style from './style.css'

const App = props => (

  <div className={style.root}>
    <AppContainer { ...props }  />
  </div>
)

export default App
