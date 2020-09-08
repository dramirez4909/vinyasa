import React from 'react'
import {Route} from 'react-router-dom'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import SignUpPage from './SignUp'

export default function Pages(){
    return (
        <>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/signup" component={SignUpPage} />
        <Route path="/" component={HomePage}/>
        </>
    )
}