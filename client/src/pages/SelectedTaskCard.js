import React, { useEffect, useState, useContext } from 'react';
import { createNewTask } from '../store/tasks'
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
import { updateExistingTask, loadUserTasks } from '../store/tasks'
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
import './TaskTable.css';
import { markAsNew, markComplete } from '../store/tasks'
import { CircularProgress } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import TaskListContext from './TaskListContext';
import UserTeamsContext from './UserTeamsContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'All Tasks',
    'Incomplete Tasks',
    'Completed Tasks',
    'Unassigned Tasks',
    'Outgoing Tasks',
    'Incoming Tasks',
];

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
    formControlSelect: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
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
        },
        outline: "none"
    },
    DeCompleteButton: {
        color: "#25e8c8",
        '&:hover': {
            color: "grey",
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

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ColorCompleteButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: "grey",
        '&:hover': {
            backgroundColor: "#4158D0",
            backgroundImage: "linearGradient(43deg, #4158D00%, #C850C0 46%, #FFCC70 100%)"
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

export default function SelectedTaskCard(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const context = useContext(TaskListContext);
    const teamContext = useContext(UserTeamsContext)
    const authorId = useSelector(state => state.auth.id)
    const bull = <span className={classes.bullet}>•</span>;
    const [selectedIndex, setSelectedIndex] = React.useState();
    const newTasks = useSelector(state => state.userTasks.newTasks)
    const [editField, setEditField] = useState("")
    const [newTask, setNewTask] = React.useState(false);
    const [newTaskName, setNewTaskName] = useState('')
    const [newTaskDescription, setNewTaskDescription] = useState('')
    const [newTaskAssigneeId, setNewTaskAssigneeId] = useState(null)
    const [newTaskPriority, setNewTaskPriority] = useState("")
    const [newTaskDueDate, setNewTaskDueDate] = useState(new Date())
    const [taskList, setTaskList] = useState([])
    const [value, setValue] = React.useState(0);
    const [userCalendarEvents, setUserCalendarEvents] = useState([]);
    const [userListEvents, setUserListEvents] = useState([]);
    const [loading, setLoading] = useState(true)
    const theme = useTheme();
    const [selectedTask,setSelectedTask] = useState({})
    const [personName, setPersonName] = React.useState(['Incomplete Tasks']);
    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setPersonName(value);
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
        dispatch(updateExistingTask(selectedTask.id, { status: "new" }))
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
    }

    const handleNewTask = () => {
        setNewTask(true)
    }
    const closeNewTaskEditor = () => {
        setNewTask(false)
    }
    const handleCloseDetail = () => {
        context.setChecked(false)
    };

    const EditFormInput = () => {
        return (
            <input type="text" key={`name-input-box-${context.selectedIndex}`} onChange={handleTextInput} style={{ outline: "none", fontSize: "24px", fontWeight: "550", marginLeft: "10px", marginBottom: "5px" }} value={selectedTask ? selectedTask.name : ""} />
        )
    }


    const handleMouseUpDeComplete = (e, index) => {
        markTaskNew()
    }
    const markTaskComplete = () => {
        dispatch(updateExistingTask(selectedTask.id, { status: "complete" }))
    }

    const handleTextInput = async (e) => {
        dispatch(updateExistingTask(selectedTask.id, { name: e.target.value }))
        return
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let newTaskDetails = useSelector(state => state.userTasks.newTasks)
    let completedTaskDetails = useSelector(state => state.userTasks.completedTasks)

    // useEffect(()=>{context.setTaskDetails(newTaskDetails)},[newTaskDetails])

    useEffect(() => {
        setSelectedTask(Object.values(context.taskDetails)[context.selectedIndex])
        debugger
    }, [context.selectedIndex,context.taskDetails])
    console.log(taskList)
    if (context.selectedIndex >= Object.values(context.taskDetails).length) {
        context.handleCloseDetail()
        return (<div>no tasks to display</div>)
    }
    console.log(selectedTask)
    if (selectedTask === {}) {return context.setChecked(false)}
    return(
        <CardContent style={{ padding: "0" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginRight: "0" }}>
                {selectedTask.status === "new" ? <ColorCompleteButton variant="contained" onClick={markTaskComplete} style={{ boxShadow: "none" }} startIcon={<CheckCircleOutlineIcon />} color="primary" size="small" className={classes.margin}>
                    Mark Complete
                                    </ColorCompleteButton> : <ColorCompletedButton variant="contained" onClick={markTaskNew} style={{ boxShadow: "none" }} startIcon={<CheckCircleOutlineIcon />} color="primary" size="small" className={classes.margin}>
                        Completed
                                    </ColorCompletedButton>}
                <div>
                    <IconButton style={{ color: "grey" }} onClick={handleCloseDetail}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
            <Divider />
            <EditFormInput style={{width:"100%"}}/>
            <div style={{display:"flex",flexDirection:"row"}}>
            <Typography style={{ margin: "10px", color: "grey"}} className={classes.pos} color="body2">
                Description:
            </Typography>
            <Typography style={{ margin: "10px" }} className={classes.pos} color="body2">
                {selectedTask.description}
            </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Typography style={{ margin: "10px", color: "grey"}} className={classes.pos} color="body2">
                    Due Date:
            </Typography>
                <Typography style={{ margin: "10px"}} className={classes.pos} color="body2">
                    {Date(selectedTask.dueDate)}
                </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Typography style={{ margin: "10px", color: "grey"}} className={classes.pos} color="body2">
                    Status:
            </Typography>
                <Typography style={{ margin: "10px" }} className={classes.pos} color="body2">
                    {selectedTask.status}
                </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Typography style={{ margin: "10px", color: "grey"}} className={classes.pos} color="body2">
                    Priority:
            </Typography>
                <Typography style={{ margin: "10px" }} className={classes.pos} color="body2">
                    {selectedTask.priority}
                </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Typography style={{ margin: "10px", color: "grey"}} className={classes.pos} color="body2">
                    Project:
            </Typography>
                <Typography style={{ margin: "10px" }} className={classes.pos} color="body2">
                    Add a project!
                </Typography>
            </div>
            <Typography variant="body2" component="p">
                     <br />
            </Typography>
        </CardContent>
    )
}