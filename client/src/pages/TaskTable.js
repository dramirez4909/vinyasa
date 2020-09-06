import React, { useEffect, useState } from 'react';
import {createNewTask} from '../store/tasks'
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import InputLabel from '@material-ui/core/InputLabel';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { updateExistingTask, loadUserTasks} from '../store/tasks'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import Calendar from './CalendarPage'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { green, purple } from '@material-ui/core/colors';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NewTaskForm from './newTaskForm'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Select from '@material-ui/core/Select';
import './TaskTable.css'
import {markAsNew,markComplete} from '../store/tasks'
import { CircularProgress } from '@material-ui/core';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    rootTab: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    rootOne: {
        width: '100%',
        maxWidth: "560px",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    newTaskForm: {
        width: '100%',
        maxWidth: "480px",
        height: "470px",
        backgroundColor: theme.palette.background.paper,
        position: "absolute",
        bottom: "0px",
        right: "100px",
        boxShadow: "0px 0px 5px 7px rgba(0,0,0,0.05)"
    },
    taskDetailPaperRoot: {
        height: 180,
    },
    margin: {
        margin: theme.spacing(1),
    },
    completeButton: {
        color: "grey",
        '&:hover': {
            color: "#25e8c8",
        }
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    wrapper: {
        width: 100 + theme.spacing(2),
    },
    taskDetailPaper: {
        zIndex: 1,
        position: 'sticky',
        margin: theme.spacing(1),
        top: "350px"
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: "none",
        padding: theme.spacing(2, 4, 3),
        boxSizing: "auto"
    },
    newTaskPaper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1, 3, 1),
        outline: "none",
        boxSizing: "auto",
        minWidth: "400px"
    }
}));

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: "#14aaf5",
        '&:hover': {
            backgroundColor: "#e362e3",
        },
    },
}))(Button);
const ColorTaskButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: "#14aaf5",
        '&:hover': {
            backgroundColor: "#FFA500",
        },
    },
}))(Button);

const ColorCompleteButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: "grey",
        '&:hover': {
        backgroundColor: "#4158D0",
        backgroundImage:"linearGradient(43deg, #4158D00%, #C850C0 46%, #FFCC70 100%)"
        },
    },
}))(Button);

const ColorCompletedButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: "#25e8c8",
        '&:hover': {
            backgroundColor: "#FFA500",
        },
    },
}))(Button);

export default function SelectedListItem(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const authorId = useSelector(state => state.auth.id)
    const bull = <span className={classes.bullet}>•</span>;
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const newTasks = useSelector(state => state.userTasks.newTasks)
    const [editField,setEditField] = useState("")
    const [checked, setChecked] = React.useState(false);
    const [newTask, setNewTask] = React.useState(false);
    const [newTaskName, setNewTaskName] = useState('')
    const [newTaskDescription, setNewTaskDescription] = useState('')
    const [newTaskAssigneeId, setNewTaskAssigneeId] = useState(null)
    const [newTaskPriority, setNewTaskPriority] = useState("")
    const [newTaskDueDate, setNewTaskDueDate] = useState(new Date())
    const [value, setValue] = React.useState(0);
    const [userCalendarEvents,setUserCalendarEvents] = useState([]);
    const [userListEvents, setUserListEvents] = useState([]);
    const [calendarLoading,setCalendarLoading]= useState(true)
    let newTaskDetails = useSelector(state=>state.userTasks.newTasks)
    let completedTaskDetails = useSelector(state=>state.userTasks.completedTasks)

    useEffect(() => {
        if (newTaskDetails) {
            let newCalendarEvents = Object.values(newTaskDetails).map(event => {
                return { title: event.name, start: event.dueDate, allDay: true, color: "#FF9966" }
            })
            let completedCalendarEvents = Object.values(completedTaskDetails).map(event => {
                return { title: event.name, start: event.dueDate, allDay: true, color: "lightgreen" }
            })
            let calendarEvents = [...newCalendarEvents,...completedCalendarEvents]
            let newListEvents= Object.values(newTaskDetails)
            let completedListEvents = Object.values(completedTaskDetails)
            let listEvents = [...newListEvents,...completedListEvents]
            setUserCalendarEvents(calendarEvents)
            setUserListEvents(listEvents)
            setCalendarLoading(false)
        }
    }, [calendarLoading, newTaskDetails]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleNewTaskNameUpdate = (e) => {
        setNewTaskName(e.target.value)
    }

    const handleNewTaskDescriptionUpdate = (e) => {
        setNewTaskDescription(e.target.value)
    }

    const handleNewTaskAssigneeIdUpdate = (e) => {
        setNewTaskAssigneeId(e.target.value)
    }

    const handleNewTaskPriorityUpdate = (e) => {
        setNewTaskPriority(e.target.value)
    }

    const handleNewTaskDueDateUpdate = (date) => {
        setNewTaskDueDate(date)
    }

    const markTaskNew = () => {
        userListEvents[selectedIndex].status = "new"
        dispatch(updateExistingTask(userListEvents[selectedIndex].id,{status:"new"}))
    }

    const handleNewTaskSubmit = async (e) => {
        e.preventDefault()
        const newTask = {
            name: newTaskName,
            description: newTaskDescription,
            authorId,
            assigneeId: newTaskAssigneeId,
            status: "new",
            priority: newTaskPriority,
            dueDate: newTaskDueDate
        }
        dispatch(createNewTask(newTask))
        setNewTaskName('')
        setNewTaskDescription('')
        setNewTaskAssigneeId(null)
        setNewTaskDueDate(new Date())
        setNewTaskPriority(null)
        if (newTask.assigneeId === authorId){
            console.log(newTask.assigneeId, "HAHAHHAA", authorId)
            userListEvents.push(newTask)
            setUserListEvents(userListEvents)
            setUserCalendarEvents(userListEvents)
        }
        setNewTask(false)
    }
    const handleNewTask = () =>{
        setNewTask(true)
    }
    const closeNewTaskEditor = () => {
        setNewTask(false)
    }
    const handleCloseDetail = () => {
        setChecked(false)
    };

    const EditFormInput = () => {
        return(
            <input type="text" key={`name-input-box-${selectedIndex}`} onChange={(e) => handleTextInput(e, selectedIndex)} style={{ outline: "none", fontSize: "24px", fontWeight: "550", marginBottom: "5px" }} defaultValue={userListEvents[selectedIndex] ? userListEvents[selectedIndex].name : ""} />
        )
    }

    const handleMouseDown = (e,index) => {
        handleListItemClick(e,index)
    }

    const handleMouseUp = (e,index) => {
        markTaskComplete()
    }

    const markTaskComplete = () => {
        debugger
        userListEvents[selectedIndex].status = "complete"
        dispatch(updateExistingTask(userListEvents[selectedIndex].id, { status: "complete" }))
        setChecked(false)
        setChecked(true)
    }

    const handleListItemClick = (event, index) => {
        console.log("index: ",index)
        console.log("selectedIndex before set:",selectedIndex)
        setSelectedIndex(index);
        console.log("selectedIndex after set: ", selectedIndex)
        setEditField()
        console.log("usereventlisttask:",userListEvents[index])
        setChecked(true)
        console.log("selectedIndex after set: ", selectedIndex)
    };

    const EditFormInputSmall = ({index}) => {
        return(
        <input type="text" key={index} style={{ fontSize: "14px", width: "200px" }} className={"no-outline"} onChange={(e) => handleTextInput(e, index)} defaultValue={userListEvents[index].name}></input>
        )
    }

    const handleTextInput=async (e,index)=>{
        debugger
        userListEvents[selectedIndex].name = e.target.value;
        userListEvents[index].name = e.target.value
        setUserListEvents(userListEvents)
        setUserCalendarEvents(userListEvents)
        dispatch(updateExistingTask(userListEvents[index].id,{name:e.target.value}))
        return
    }

    // useEffect(()=>{
    //     const setNewTaskName = async () =>{ 

    //     }
    // })

    return (calendarLoading ? <CircularProgress /> :
        <div className={classes.root}>
            <div style={{ backgroundColor: "f6f8f9" }}>
            <Tabs value={value} style={{ height: "20px", backgroundColor:"f6f8f9"}}onChange={handleChange} aria-label="simple tabs example">
                <Tab label="List" {...a11yProps(0)} />
                <Tab label="Calendar" {...a11yProps(1)} />
            </Tabs>
            </div>
            <TabPanel value={value} index={0} style={{ backgroundColor: "#f6f8f9"}}>
                <div id="main-content-list-view">
                    <div id="current-tasks-table">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <ColorButton variant="contained" onClick={handleNewTask} color="primary" startIcon={<LibraryAddIcon />} className={classes.margin}>
                                Add Task
                            </ColorButton>
                        </div>
                        <div id="current-tasks-list">
                            <div style={{ width: "100%", marginRight: "25px" }}>
                                <div className={classes.root}>
                                    <List style={{ width: "100%"}} component="nav" aria-label="main mailbox folders">
                                        {userListEvents.map((task, index) => {
                                            return (
                                                <ListItem
                                                    button
                                                    selected={selectedIndex === index}
                                                    onClick={(event) => handleListItemClick(event, index)}
                                                    style={{paddingTop: "0", paddingBottom: "0"}}
                                                >
                                                        <IconButton className={classes.completeButton} onMouseDown={(e)=>handleMouseDown(e,index)} onMouseUp={(e)=>handleMouseUp(e)}>
                                                            <CheckCircleOutlineIcon />
                                                        </IconButton>
                                                    
                                                    <input type="text" key={index} style={{ fontSize: "14px", width: "200px" }} className={"no-outline"} onChange={(e) => handleTextInput(e, index)} defaultValue={userListEvents[index].name}></input>
                                                    <IconButton style={{ color: "white" }} >
                                                        {<MenuIcon />}
                                                    </IconButton>
                                                </ListItem>)
                                        })}
                                    </List>
                                    <Divider />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                        <Card className={classes.rootOne}>
                            <CardContent style={{padding:"0"}}>
                                <div style={{display:"flex", flexDirection:"row",justifyContent: "space-between", width: "100%", marginRight:"0"}}>
                                    {userListEvents[selectedIndex].status === "new" ? <ColorCompleteButton variant="contained" onClick={markTaskComplete} style={{ boxShadow: "none" }} startIcon={<CheckCircleOutlineIcon />} color="primary" size="small" className={classes.margin}>
                                        Mark Complete
                                    </ColorCompleteButton> : <ColorCompletedButton variant="contained" onClick={markTaskNew} style={{boxShadow: "none"}} startIcon={<CheckCircleOutlineIcon/>} color="primary" size="small" className={classes.margin}>
                                        Completed
                                    </ColorCompletedButton>}
                                    <div>
                                    <IconButton style={{ color: "grey" }} onClick={handleCloseDetail}>
                                    <CloseIcon/>
                                    </IconButton>
                                    </div>
                                </div>
                                <Divider />
                                <EditFormInput/>
                                <Typography className={classes.pos} color="textSecondary">
                                    {userListEvents[selectedIndex].description}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    task details go here foo
                     <br />
                                    {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                
                            </CardActions>
                        </Card>
                    </Slide>
                    </div>
      </TabPanel>
            <TabPanel value={value} index={1}>
                <Calendar events={userCalendarEvents}/>
      </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
      </TabPanel>
        <Slide direction="up" in={newTask} mountOnEnter unmountOnExit>
                <Card className={classes.newTaskForm}>
                    <CardContent>
                        <form id="new-task-form" onSubmit={handleNewTaskSubmit}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <CheckCircleOutlineIcon style={{ color: "lightcoral", marginRight: "4px" }} />
                                <input name="name" type="text" style={{ outline: "none", fontSize: "24px", fontWeight: "550", marginBottom: "5px" }} placeholder={"Task Name"} form="new-form-id" onChange={handleNewTaskNameUpdate} label="Task Name" />
                            </div>
                                <IconButton onClick={closeNewTaskEditor}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                            <div>
                                <TextField
                                    id="filled-number"
                                    label="AssigneeId"
                                    type="number"
                                    onChange={handleNewTaskAssigneeIdUpdate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
                                    <Select native defaultValue="" id="grouped-native-select">
                                        <option aria-label="None" value="" />
                                        <optgroup label="Category 1">
                                            <option value={1}>Option 1</option>
                                            <option value={2}>Option 2</option>
                                        </optgroup>
                                        <optgroup label="Category 2">
                                            <option value={3}>Option 3</option>
                                            <option value={4}>Option 4</option>
                                        </optgroup>
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <p style={{ color: "grey", fontSize: "15px" }}>Due: </p><DatePicker style={{ fontSize: "18px", marginLeft: "10px" }} selected={newTaskDueDate} onChange={handleNewTaskDueDateUpdate}></DatePicker>
                            </div>
                            
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                onChange={handleNewTaskDescriptionUpdate}
                                rows={4}
                            />
                        </form>
                    </CardContent>
                    <CardActions>
                        <ColorTaskButton variant="contained" type={"submit"} form="new-task-form" color="primary" startIcon={<ControlPointIcon />} className={classes.margin}>
                            Create Task
                        </ColorTaskButton>
                    </CardActions>
                </Card>
        </Slide>
        </div>    
    );
}