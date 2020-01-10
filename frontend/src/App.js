import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Grommet } from 'grommet'
import theme from './theme'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'

function App() {
  return (
    <Grommet theme={theme}>
      <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
      </BrowserRouter>
    </Grommet>
  )
}

export default App;
