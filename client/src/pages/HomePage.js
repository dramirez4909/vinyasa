import React, { useEffect } from 'react'
import Menus from './MenuNavigation'
import { useSelector, useDispatch } from 'react-redux';
import {Redirect} from 'react-router-dom'
import { loadUserTasks } from '../store/tasks';

export default function Homepage(){
    const currentUserId = useSelector(state=>state.auth.id)
    if (!currentUserId) return <Redirect to="/login" />;
    return(
        <>
        <Menus></Menus>
        </>
    )
}