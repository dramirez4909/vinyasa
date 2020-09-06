import React, { useEffect, useState } from 'react';
import { createNewTask } from '../store/tasks'
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { green, purple } from '@material-ui/core/colors';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    rootOne: {
        width: '100%',
        maxWidth: "600px",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        top: "20px"
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
            color: "green",
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

export default function SelectedListItem(props) {
    const classes = useStyles();
    const [newTaskName, setNewTaskName] = useState('')
    const [newTaskDescription, setNewTaskDescription] = useState('')
    const [newTaskAssigneeId, setNewTaskAssigneeId] = useState(null)
    const [newTaskPriority, setNewTaskPriority] = useState(null)
    const [newTaskDueDate, setNewTaskDueDate] = useState(null)
    const dispatch = useDispatch();
    const authorId = useSelector(state => state.auth.id)


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

    const handleNewTaskDueDateUpdate = (e) => {
        setNewTaskDueDate(e.target.value)
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
        setNewTaskDueDate(null)
        setNewTaskPriority(null)
    }
    return(
            <Card className={classes.rootOne}>
                <CardContent>
                    <form id="new-task-form" onSubmit={handleNewTaskSubmit}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <CheckCircleOutlineIcon style={{ color: "lightcoral", marginRight: "4px" }} />
                            <input name="name" type="text" style={{ outline: "none", fontSize: "24px", fontWeight: "550", marginBottom: "5px" }} placeholder={"Task Name"} form="new-form-id" onChange={handleNewTaskNameUpdate} label="Task Name" />
                        </div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            onChange={handleNewTaskDescriptionUpdate}
                            rows={4}
                            defaultValue="Default Value"
                            variant="outlined"
                        />
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
                        </div>
                    </form>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
    )}