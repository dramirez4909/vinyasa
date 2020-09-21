import React, { useEffect, useState, useContext } from 'react';
import { createNewTask } from '../store/tasks'
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ButtonBase from "@material-ui/core/ButtonBase";
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
import { SnackbarProvider, useSnackbar } from 'notistack';
import {TouchRipple} from '@material-ui/core/ButtonBase/TouchRipple';
import transitions from '@material-ui/core/styles/transitions';

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
    colorSpash: {
        backgroundColor: "lightgreen",
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
    child: {
        backgroundColor: 'blue',
        backgroundImage: `"${"url(\"../images/159960637489457530 (1).png\")"}`
    },
    rippleVisible: {
        opacity: 0.5,
        animation: `$enter 550ms ${theme.transitions.easing.easeInOut}`
    },
    "@keyframes enter": {
        "0%": {
            transform: "scale(0)",
            opacity: 0.2
        },
        "100%": {
            transform: "scale(1)",
            opacity: 0.5
        }
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
    [`${"MuiTouchRipple-root"}`]: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: "hidden",
        position: "absolute",
        borderRadius: "inherit",
        pointerEvents: "none",
        color:"blue",
        display: "none"
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
    touchRipple:{
        opacity: 1,
        color: `lightgreen`,
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

export default function CurrentTaskList (props){
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles();
    const dispatch = useDispatch();
    const context = useContext(TaskListContext)
    const authorId = useSelector(state => state.auth.id)
    const bull = <span className={classes.bullet}>•</span>;
    const [selectedIndex, setSelectedIndex] = React.useState();
    const newTasks = useSelector(state => state.userTasks.newTasks)
    const [editField, setEditField] = useState("")
    const [newTask, setNewTask] = React.useState(false);
    const [checkIndex, setCheckIndex] = React.useState();
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
        dispatch(updateExistingTask(taskList[selectedIndex].id, { status: "new" }))
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
            <input type="text" key={`name-input-box-${selectedIndex}`} onChange={(e) => handleTextInput(e, selectedIndex)} style={{ outline: "none", fontSize: "24px", fontWeight: "550", marginBottom: "5px" }} value={taskList[selectedIndex] ? taskList[selectedIndex].name : ""} />
        )
    }

    const handleMouseDown = (e, index) => {
        setCheckIndex(index)
        handleListItemClick(e, index)
    }

    const handleMouseUpComplete = (e, index) => {
        markTaskComplete()
    }

    const handleMouseUpDeComplete = (e, index) => {
        markTaskNew()
    }
    const markTaskComplete = () => {
        enqueueSnackbar(`${taskList[selectedIndex].name} marked complete`, {
            variant: 'info',
        });
        dispatch(updateExistingTask(taskList[selectedIndex].id, { status: "complete" }))
        
        if (context.flyOverObject !== "") context.setAnimation("animation")
    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
        context.setSelectedIndex(index)
        context.setChecked(true)
        console.log("selectedIndex after set: ", selectedIndex)
    };

    const EditFormInputSmall = ({ index }) => {
        return (
            <input type="text" key={index} style={{ fontSize: "14px", width: "200px" }} className={"no-outline"} onChange={(e) => handleTextInput(e, index)} value={taskList[index].name}></input>
        )
    }

    const handleTextInput = async (e, index) => {
        dispatch(updateExistingTask(taskList[index].id, { name: e.target.value }))
        return
    }
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let newTaskDetails = useSelector(state => state.userTasks.newTasks)
    let completedTaskDetails = useSelector(state => state.userTasks.completedTasks)

    // useEffect(()=>{context.setTaskDetails(newTaskDetails)},[newTaskDetails])
    const rippleClasses = { rippleVisible: classes.rippleVisible, child: classes.child, [`${"@keyframes enter"}`]: classes[`${"@keyframes enter"}`] }

    useEffect(() => {
        setTaskList(Object.values(context.taskDetails))
    }, [context.taskDetails])
    console.log(taskList)
    return (
    <div id="current-tasks-list">
    <div style={{ width: "100%", marginRight: "25px" }}>
        <div className={classes.root}>
            
            <List style={{ width: "100%" }} component="nav" aria-label="main mailbox folders">
                {taskList.map((task, index) => {
                    return (
                        <>
                            {selectedIndex !== index && selectedIndex !== index - 1 ? <Divider style={{ width: "100%" }}/> : <Divider style={{ width:"100%" }} light />}
                            <ButtonBase
                                style={{
                                    width: "100%",
                                    outline:"none",
                                }}
                                // primary
                                TouchRippleProps={{ classes: {...rippleClasses}}}
                            >
                            <div style={{width:"100%"}} className={classes.colorSplash}>
                            <ListItem
                                key={`list-item-${index}`}
                                selected={selectedIndex === index}
                                onClick={(event) => {
                                    handleListItemClick(event, index)
                                }}
                                className={"TaskPaperListItem"}
                                style={{ paddingTop: "3px", paddingBottom: "3px", outline: "none" }}
                            >
                                {taskList[index].status === "new" ?
                                        <IconButton className={classes.completeButton} size="small" className={"no-outline"} className={"no-outline"} onMouseOver={() => (setCheckIndex(index))} onMouseDown={(e) => handleMouseDown(e, index)} onMouseUp={(e) => handleMouseUpComplete(e)}>
                                        <CheckCircleOutlineIcon />
                                    </IconButton>
                                    :
                                    <IconButton className={classes.unCompleteButton} size="small" className={"no-outline"} color="primary" style={{ color: "#25e8c8" }} onMouseDown={(e) => handleMouseDown(e, index)} onMouseUp={(e) => handleMouseUpDeComplete(e)}>
                                        <CheckCircleIcon />
                                    </IconButton>
                                }
                                {console.log(taskList[index], "", taskList)}
                                {taskList[index].status === "new" ?
                                    <input type="text" style={{ fontSize: "14px", width: "200px" }} className={"no-outline"} onChange={(e) => handleTextInput(e, index)} value={taskList[index].name}></input>
                                    :
                                    <input type="text" style={{ fontSize: "14px", width: "200px", color: "grey" }} className={"no-outline"} onChange={(e) => handleTextInput(e, index)} value={taskList[index].name}></input>
                                }
                                <IconButton size="small" style={{ color: "white" }} className={"no-outline"} >
                                    {<MenuIcon />}
                                </IconButton>
                                <span className={"MuiTouchRipple-root" + " " + "rainbow" + " " + "party"}></span>
                            </ListItem>
                            </div>
                            </ButtonBase>
                        </>)
                })}
            </List>
        </div>
    </div>
</div>)}