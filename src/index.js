import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './components/app'

render((
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/task/add" component={addTask} />
    </Router>
), document.getElementById('app'))
