import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {useEffect, useState} from 'react'
import TaskTable from './TaskTable'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function Tasks(){
    const classes = useStyles();
    const [userTasks, setUserTasks] = useState([])
    const [loading,setLoading] = useState(true)
    const userId = useSelector(state=> state.auth.id)
    let userTaskList
    const [userCalendarEvents, setUserCalendarEvents] = useState([]);
    const [userListEvents, setUserListEvents] = useState([]);
    let eventDetails = useSelector(state => state.userTasks.newTasks)
    useEffect(() => {
        if (eventDetails) {
            let calendarEvents = Object.values(eventDetails).map(event => {
                return { title: event.name, start: event.dueDate }
            })
            let listEvents = Object.values(eventDetails)
            setUserCalendarEvents(calendarEvents)
            setUserListEvents(listEvents)
        }
    }, [eventDetails]);
    useEffect(() => {
        const loadUserTasks = async () => {
            const res = await fetch(`/api/tasks/user/${userId}`);
            if (res.ok) {
                userTaskList = await res.json();
                setUserTasks(userTaskList)
                setLoading(false)
            }
        }
        loadUserTasks();
        return;
    }, [loading]);
    const tasks = []
    userTasks.forEach(task=>tasks.push(task))
    return (<>
        {loading ? <div className={classes.root}>
            <CircularProgress />
        </div>:<TaskTable data={userListEvents}/>}
       </>
    )
}