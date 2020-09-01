import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useDispatch, useSelector} from 'react-redux'
import {removeUser, logout} from '../store/auth'
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'



export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    let currentUserId = useSelector(state => state.auth.id);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout())
        return <Redirect to="/login"/>
    }

    return (
        <div>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <AccountCircleIcon/>
      </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}