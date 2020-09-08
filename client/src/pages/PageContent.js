import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import WelcomePage from './WelcomePage'
import Tasks from './Tasks'
import CalendarPage from './CalendarPage'
import { useSelector } from 'react-redux'

export default function PageContent(){
    
    return (
        <>
        <Route path="/home" component={WelcomePage}/>
        <Route exact path="/tasks" component={Tasks}/>
        <Route exact path="/calendar" render={()=><CalendarPage/>}/>
        </>
    )
}