import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import style from './style.css'
import HelloBox from '../HelloBox'

class App extends Component {

  componentDidMount() {

    const fetchIsHappenning = {
      method: 'GET', mode: 'cors', headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      })
    }
    const fetchString = `http://localhost:5000/task`
    fetch( fetchString, fetchIsHappenning )
    .then( data => data.json() )
    .then( data => {
      console.log(data)

    })

}
  render() {
    return (
        <div className={style.root}>
            <h1>{'React App'}</h1>
            <HelloBox />
            <div className="list">
              {this.props.children}
            </div>

        </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

export default App
