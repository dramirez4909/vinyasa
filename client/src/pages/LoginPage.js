import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../store/auth'
import { Redirect } from 'react-router-dom';

export default function LoginPage(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const currentUserId = useSelector(state => state.auth.id)
    const dispatch = useDispatch();
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(username,password))
    }

    if (currentUserId) return <Redirect to="/"/>;
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={username} placeholder="Enter username or email" onChange={e => setUsername(e.target.value)}/>
                <input type="password" name="password" value={password} placeholder="password..." onChange={e => setPassword(e.target.value)} />
            <button type="submit">Log in</button>
        </form>
        </>
    )
}