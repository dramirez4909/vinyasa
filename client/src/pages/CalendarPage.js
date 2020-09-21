import React, { useState, useContext,useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import TaskListContext from './TaskListContext'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


import 'bootstrap/dist/css/bootstrap.css';
// import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!
import { Calendar } from '@fullcalendar/core';
// import bootstrapPlugin from '@fullcalendar/bootstrap';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import './CalendarPage.css'
import { CircularProgress, Divider } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux'
import {updateExistingTask} from '../store/tasks'


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paperModal: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline:"none"
    },
}));

const ToggleWeekendButton = withStyles((theme) => ({
    root: {
        textTransform: "none",
        fontSize: "14px",
        color: "white",
        backgroundColor: "lightgrey",
        '&:hover': {
            background: "#FFA500"
        },
    },
}))(Button);

// "background-color: #08AEEA"
// background-image: "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)"
// "

const CompleteColorButton = withStyles((theme) => ({
    root: {
        color: "grey",
        backgroundColor: "transparent",
        border: "1px solid",
        borderColor: "grey",
        '&:hover': {
            color: "white",
            background: "#25e8c8",
            border: "1px solid",
            borderColor: "white",
        },
    },
}))(Button);

const DeCompleteColorButton = withStyles((theme) => ({
root: {
    color: "#25e8c8",
        backgroundColor: "transparent",
            border: "1px solid",
                borderColor: "#25e8c8",
                    '&:hover': {
        color: "grey",
            background: "white",
                border: "1px solid",
                    borderColor: "grey",
        },
},
})) (Button);
export default function CalendarPage(){
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const calendarComponentRef = React.createRef();
    const context = useContext(TaskListContext)
    const [taskList,setTaskList] = useState([])
    const [loading,setLoading] = useState(true)
    const [calendarWeekends,setCalendarWeekends] = useState(false)
    const [calendarEvents,setCalendarEvents] = useState(taskList)
    const [selectedTaskId,setSelectedTaskId] = useState(null)
    const [selectedTask,setSelectedTask] = useState({})
    const [selectedTaskName, setSelectedNewTaskName] = useState('')
    const [selectedTaskDescription, setSelectedTaskDescription] = useState('')
    const [selectedTaskAssigneeId, setSelectedTaskAssigneeId] = useState(null)
    const [selectedTaskPriority, setSelectedTaskPriority] = useState("")
    const [selectedTaskDueDate, setSelectedTaskDueDate] = useState(new Date())
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const toggleWeekends = () => {
        setCalendarWeekends(!calendarWeekends)
    }
    const gotoPast = () => {
        let calendarApi = calendarComponentRef.current.getApi()
        calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    }

    const handleDateClick = (arg) => {
            context.setNewTask(true)
            // setCalendarEvents(calendarEvents.concat({ // creates a new array
            //     title: 'New Event',
            //     start: arg.date,
            //     allDay: arg.allDay,
            // }))
    }

    const handleMarkComplete = () => {
        dispatch(updateExistingTask(selectedTask.id, { status: "complete" }))
    }

    const handleMarkNew = () => {
        dispatch(updateExistingTask(selectedTask.id, { status: "new" }))
    }

    useEffect(() => {
        setTaskList(Object.values(context.taskDetails).map((task) => {
        if (task.status === "complete") {
            return {title: task.name, id:task.Id, date: task.dueDate, eventColor: "blue", classNames: [`event-${task.id}`] }
        } else if (task.status === "new") return { title: task.name, id: task.Id, date: task.dueDate, eventColor: "red", classNames: [`event-${task.id}`] }
        }))
    }, [context.taskDetails])

    useEffect(()=>{
        setCalendarEvents(taskList)
    },[taskList])

    const handleEventClick = (arg) => {
        const taskId = Number(arg.event._def.ui.classNames[0].split("-")[1])
        setSelectedTaskId(taskId)
        if (selectedTask) handleOpen()
    }

    useEffect(()=>{
        const fetchTask = async (id) => {
            const response = await fetch(`/api/tasks/${id}`)
            const task = await response.json();
            setSelectedTask(task)
            console.log(task)
        }
        fetchTask(selectedTaskId);
        setLoading(false)
    },[selectedTaskId])

    return (
        <>
            <div className='demo-app'>
                <div className='demo-app-top' style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"right"}}>
                    <div></div>
                    <ToggleWeekendButton onClick={toggleWeekends}>weekends</ToggleWeekendButton>
                </div>
                <div className='demo-app-calendar'>
                    <FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        ref={calendarComponentRef}
                        weekends={calendarWeekends}
                        events={calendarEvents}
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                    />
                </div>
            </div>
            <div>
                <button type="button" onClick={handleOpen}>
                    react-transition-group
      </button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paperModal} style={{outline: "none"}}>
                            {loading ? <img style={{
                                margin: "auto", position: "fixed", /* or absolute */
                                top: "50%",
                                left: "50%"
                            }} src="https://blog.asana.com/wp-content/post-images/Yeti_riding_unicorn_320.gif" /> : <>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "3px"}}>
                                    <div>
                                        {selectedTask.status === "new" ? <CompleteColorButton size="small" onClick={handleMarkComplete} startIcon={<CheckCircleOutlineIcon />}>Mark Complete</CompleteColorButton>
                                            : <DeCompleteColorButton size="small" onClick={handleMarkNew} startIcon={<CheckCircleOutlineIcon />}>Mark New</DeCompleteColorButton>}
                                    </div>
                                    <div>
                                        <IconButton style={{ color: "grey" }} size="small" onClick={handleClose}>
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            <Divider style={{width:"100%"}}/>
                                <div style={{ display: "flex", flexDirection: "column", margin: "3px" }}>
                                <TextField
                                    id="outlined-full-width"
                                    label="Task Name"
                                    value={selectedTask.name}
                                    style={{ margin: 8, fontWeight: "550" }}
                                    placeholder="Task Name"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <div>
                                </div>


                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Typography style={{ margin: "10px", color: "grey" }} className={classes.pos} color="body2">
                                            Description:
            </Typography>
                                        <Typography style={{ margin: "10px" }} className={classes.pos} color="body2">
                                            {selectedTask.description}
                                        </Typography>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Typography style={{ margin: "10px", color: "grey" }} className={classes.pos} color="body2">
                                            Due Date:
            </Typography>
                                        <Typography style={{ margin: "10px" }} className={classes.pos} color="body2">
                                            {Date(selectedTask.dueDate)}
                                        </Typography>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Typography style={{ margin: "10px", color: "grey" }} className={classes.pos} color="body2">
                                            Status:
            </Typography>
                                        <Typography style={{ margin: "10px" }} className={classes.pos} color="body2">
                                            {selectedTask.status}
                                        </Typography>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Typography style={{ margin: "10px", color: "grey" }} className={classes.pos} color="body2">
                                            Priority:
            </Typography>
                                        <Typography style={{ margin: "10px" }} className={classes.pos} color="body2">
                                            {selectedTask.priority}
                                        </Typography>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Typography style={{ margin: "10px", color: "grey" }} className={classes.pos} color="body2">
                                            Project:
            </Typography>
                                        <Typography style={{ margin: "10px" }} className={classes.pos} color="body2">
                                            Add a project!
                </Typography>
                                    </div>
                            </div>
                            </>}
                        </div>
                    </Fade>
                </Modal>
            </div>
            </>
        )
}