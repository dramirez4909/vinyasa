import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import ProfileButton from '../components/ProfileButtonWithMenu'
import './MenuNavigation.css'
import EcoIcon from '@material-ui/icons/Eco';
import { Route, useLocation, Redirect, NavLink} from 'react-router-dom';
import PageContent from './PageContent'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import SpaIcon from '@material-ui/icons/Spa';
import {useSelector} from 'react-redux'
import { CircularProgress } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import UserTeamsContext from './UserTeamsContext'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        '&:hover': {
            backgroundColor: "slategrey",
        }
    },
    appBar: {
        backgroundColor: "white",
        color:"black",
        boxShadow: "none",
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#151b26",
        color: "white",
        fontSize: "16px"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
        color: 'white'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft() {
    const teams = useSelector(state=>state.userTeams.teamsUserIsIn)
    const usersInUserTeams = useSelector(state => state.userTeams.usersInUserTeams)
    const location = useLocation();
    let currentPath = location.pathname;
    const classes = useStyles();
    const [userTeams,setUserTeams] = useState([])
    const [usersInTeams, setUsersInTeams] = useState({})
    const theme = useTheme();
    const [loading,setLoading] = useState(true)
    const [open, setOpen] = React.useState(true);
    const [mainDisplayText, setMainDisplayText] = React.useState("Home");

    useEffect(()=>{
        if(teams){
        setUserTeams(Object.values(teams))
        }
    },[teams])
    useEffect(() => {
        if (teams) {
            setUsersInTeams(usersInUserTeams)
            setLoading(false)
        }
    }, [usersInUserTeams])
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const goHome = () => {
        return <Redirect to="/hey"/>
    }

    return (loading ? <CircularProgress /> :
        <UserTeamsContext.Provider value={{userTeams,usersInTeams}}>
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                boxShadow={0}
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
            <Toolbar>
                <div className={"tool-bar-content"}>
                <div className={"header-and-menu-button-holder"}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
            <span style={{fontSize:"18px"}}>{mainDisplayText}</span>
                </Typography>
                </div>
                <div className="right-side-toolbar-items">
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                <ProfileButton style={{color: "purple"}}/>
                </div>
                </div>
            </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <NavLink to="/home" style={{textDecoration:"none", color:"white"}}>
                    <div style={{display: "flex",flexDirection: "row", alignItems:"center"}}>
                        <IconButton size="large" style={{ color: "lightcoral", outline: "none" }}>
                            {<SpaIcon/>}
                        </IconButton>
                        <h5>vinyasa</h5>
                    </div>
                    </NavLink>
                    <IconButton style={{ color: "white" }} onClick={handleDrawerClose} >
                        {<MenuIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <NavLink to="/home" style={{
                        fontWeight: "bold",
                        color: "white",
                        textDecoration: "none",
                    }}>
                        <ListItem button onClick={goHome} key={1} >
                            <ListItemIcon>{<HomeIcon style={{ color: "white" }} />}</ListItemIcon>
                            <ListItemText style={{ fontSize: "14px" }} primary={"Home"} />
                        </ListItem>
                    </NavLink>
                    <NavLink to="/tasks" style={{
                        fontWeight: "bold",
                        color: "white",
                        textDecoration: "none",
                    }}>
                        <ListItem button key={2}>
                            <ListItemIcon>{< CheckCircleOutlineIcon style={{ color: "white" }}/>}</ListItemIcon>
                            <ListItemText primary={"My Tasks"} />
                        </ListItem>
                    </NavLink>
                    <ListItem button key={3}>
                        <ListItemIcon>{<NotificationsIcon style={{ color: "white" }}/>}</ListItemIcon>
                        <ListItemText primary={"Inbox"} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {userTeams.map((team, index) => {
                        return (<ListItem>
                            <div>
                            <div>{team.name}</div>
                                <AvatarGroup max={5} style={{marginTop:"5px"}}>
                                {usersInTeams[team.id] ? Object.values(usersInTeams[team.id]).map((user) => <Avatar size="small" className={classes.purple}>{user.firstName[0] + user.lastName[0]}</Avatar>) : ""}
                                </AvatarGroup>
                            </div>
                        </ListItem>)
                    })}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <PageContent/>
            </main>
        </div>
        </UserTeamsContext.Provider>
    );
}