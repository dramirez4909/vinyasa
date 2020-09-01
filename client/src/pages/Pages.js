import React from 'react'
import {Route} from 'react-router-dom'
import LoginPage from './LoginPage'
import HomePage from './HomePage'

export default function Pages(){
    return (
        <>
        <Route exact path="/login" component={LoginPage}/>
        <Route path="/" component={HomePage}/>
        </>
    )
}