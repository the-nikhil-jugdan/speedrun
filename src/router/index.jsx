import React from 'react'
import {Switch,Route} from 'react-router'
import Home from '../components/home'

export default function index() {
  return (
    <Switch>
      <Route exact path='/' render={
        (props) => <Home /> 
      } />
    </Switch>
  )
}
