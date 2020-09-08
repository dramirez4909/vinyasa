import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, signUp } from '../store/auth'
import { Redirect, NavLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { loadUserTasks } from '../store/tasks'
import './SignUp.css'
const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "white",
        padding: "20px",
    },
    TextField: {
        margin: "5px"
    },
    Button: {
        justifySelf: "left",
        margin: "10px"
    },
    demoUserLogin: {
        background: "#14aaf5",
        marginBottom: "8px",
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
export default function SignUpPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.auth.id)
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(username,email,password,confirmPassword))
    }

    if (currentUserId) {
        dispatch(loadUserTasks(currentUserId))
        return <Redirect to="/home" />;
    }

    return (
        <>
            <div id="main-content-sign-up">
                <p className="is-white">vinyasa</p>
                <Container fixed maxWidth="sm"
                    classes={{ root: classes.container }}
                >
                    <div className="LoginContent-logInText">Sign Up</div>
                    <Button classes={{ root: classes.demoUserLogin }} size="medium" variant="contained" color="primary">Demo User Login</Button>
                    <div className={"SeparatorRow"}>
                        <span className="SeparatorRow-horizontalLine" />
                        <span className="LoginContent-separatorRowLabel">or</span>
                        <span className="SeparatorRow-horizontalLine" />
                    </div>
                    <form className={"signup-form"} onSubmit={handleSubmit}>
                        <TextField classes={{ root: classes.TextField }} id="outlined" label="username" type="text" name="username" variant="outlined" value={username} placeholder="Enter username or email" onChange={e => setUsername(e.target.value)} />
                        <TextField classes={{ root: classes.TextField }} id="outlined" type="password" label="password" name="password" value={password} placeholder="password..." variant="outlined" onChange={e => setPassword(e.target.value)} />
                        <TextField classes={{ root: classes.TextField }} id="outlined" type="password" label="confirm password" name="password" value={confirmPassword} placeholder="confirm password..." variant="outlined" onChange={e => setConfirmPassword(e.target.value)} />
                        <TextField classes={{ root: classes.TextField }} id="outlined" type="text" label="first name" name="firstName" value={firstName} placeholder="first name" variant="outlined" onChange={e => setFirstName(e.target.value)} />
                        <TextField classes={{ root: classes.TextField }} id="outlined" type="text" label="last name" name="lastName" value={lastName} placeholder="last name" variant="outlined" onChange={e => setLastName(e.target.value)} />
                        <TextField classes={{ root: classes.TextField }} id="outlined" type="email" label="email" name="email" value={email} placeholder="email..." variant="outlined" onChange={e => setEmail(e.target.value)} />
                        <Button variant="outlined" classes={{ root: classes.Button }} type="submit">Sign Up and Log In</Button>
                    </form>
                </Container>
                <NavLink style={{ textDecoration: "none" }} to="/login"><p className="is-white" id="signUpText">Already have an account?  <Button classes={{ root: classes.signUpButton }} size="medium" variant="outlined">Log In</Button></p></NavLink> 
            </div>
        </>
    )
}