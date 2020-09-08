import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../store/auth'
import { Redirect, NavLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import {loadUserTasks} from '../store/tasks'
import './LoginPage.css'
const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "white",
        padding: "30px",
    },
    TextField: {
        margin: "10px"
    },
    Button: {
        justifySelf: "left",
        margin: "10px"
    },
    demoUserLogin: {
        background: "#14aaf5",
        marginBottom: "45px",
        boxShadow: "none",
        textTransform: "none",
        fontSize: "13px",
    },
    signUpButton: {
        background: "transparent",
        color: "white",
        border: "1px solid white",
        textTransform: "none",
        fontSize: "13px"
    }
})
export default function LoginPage(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.auth.id)
    const classes = useStyles();
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(username,password))
    }

    if (currentUserId) {
        dispatch(loadUserTasks(currentUserId))
        return <Redirect to="/home" />;
    }

    return(
        <>
        <div id="main-content">
        <p className="is-white">vinyasa</p>
        <Container fixed maxWidth="sm" 
            classes={{root: classes.container}}
        >
        <div className="LoginContent-logInText">Log In</div>
        <Button classes={{ root: classes.demoUserLogin}}size="medium" variant="contained" color="primary">Demo User Login</Button>
        <div className={"SeparatorRow"}>
            <span className="SeparatorRow-horizontalLine"/>
            <span className="LoginContent-separatorRowLabel">or</span>
            <span className="SeparatorRow-horizontalLine" />
        </div>
        <form className={"signup-form"} onSubmit={handleSubmit}>
            <TextField classes={{ root: classes.TextField }} id="outlined" label="username" type="text" name="username" variant="outlined" value={username} placeholder="Enter username or email" onChange={e => setUsername(e.target.value)} />
            <TextField classes={{ root: classes.TextField }} id="outlined" type="password" label="password" name="password" value={password} placeholder="password..." variant="outlined" onChange={e => setPassword(e.target.value)} />
            <Button variant="outlined" classes={{ root: classes.Button }} type="submit">Log in</Button>
        </form>
        </Container>
                <NavLink style={{textDecoration:"none"}} to="/signup"><p className="is-white" id="signUpText">Don't have an account?  <Button classes={{ root: classes.signUpButton }} size="medium" variant="outlined">Sign Up</Button></p></NavLink>
        </div>
        </>
    )
}