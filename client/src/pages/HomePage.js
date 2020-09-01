import React from 'react'
import Menus from './MenuNavigation'
import { useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom'

export default function Homepage(){
    const currentUserId = useSelector(state=>state.auth.id)
    if (!currentUserId) return <Redirect to="/login" />;
    return(
        <Menus></Menus>
    )
}