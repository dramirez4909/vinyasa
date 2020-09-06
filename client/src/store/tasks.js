import Cookies from 'js-cookie'

const CREATE_TASK = 'tasks/CREATE_TASK'
const UPDATE_TASK = 'tasks/UPDATE_TASK'
const LOAD_USER_ASSETS = 'tasks/LOAD_USER_ASSESTS'

export const createTask=(newTask)=>{
    return {
        type: CREATE_TASK,
        newTask
    };
}

export const loadCurrentUserTasks = (tasks,userId) => {
    return {
        type: LOAD_USER_ASSETS,
        tasks,
        userId
    }
}

export const loadUserTasks = (userId) => async dispatch => {
    const res = await fetch(`/api/tasks/user/${userId}`);
    if (res.ok) {
        const userTaskList = await res.json();
        dispatch(loadCurrentUserTasks(userTaskList,userId))
    }
}

export const createNewTask = (newTask) => async dispatch => {
    const jsonTask = JSON.stringify(newTask)
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const response = await fetch(`/api/tasks/create`, {
    method: "post",
    headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
        },
    body: jsonTask
    })
    const task = await response.json();
    console.log("this is the new task: ",task)
    dispatch(createTask(task))
}

export const updateTask = (update) => {
    return {
        type: UPDATE_TASK,
        update
    }
}

export const updateExistingTask = (id,updates) => async dispatch => {
    const jsonTask = JSON.stringify(updates)
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const response = await fetch(`/api/tasks/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(updates)
    })
    const data = await response.json()
    dispatch(updateTask(data))
}

export default function userTasks(state={},action){
    let newState = Object.assign({},state)
    const newTasks = Object.assign({}, state.newTasks)
    const completedTasks = Object.assign({}, state.completedTasks)
    const authoredTasks = Object.assign({}, state.authoredTasks)
    const unassignedTasks = Object.assign({},state.unassignedTasks)
    switch (action.type) {
        case CREATE_TASK:
            newState.newTasks = newTasks;
            newState.completedTasks = completedTasks;
            newState.authoredTasks = authoredTasks;
            newState.unassignedTasks = unassignedTasks;
            if (action.newTask.assigneeId === action.newTask.authorId){
                newState.newTasks[action.newTask.id] = action.newTask
            } else if (!action.newTask.assigneeId) {
                newState.unassignedTasks[action.newTask.id] = action.newTask
            } else {
                newState.authoredTasks[action.newTask.id] = action.newTask
            }
            return newState
        case UPDATE_TASK:
            newState.newTasks = newTasks;
            newState.completedTasks = completedTasks;
            newState.authoredTasks = authoredTasks;
            newState.unassignedTasks = unassignedTasks;
            if (action.update.status === "new"){
                if (completedTasks[action.update.id]) {
                    delete newState.completedTasks[action.update.id]
                }
                newState.newTasks[action.update.id] = action.update
            }
            if (action.update.status === "complete") {
                if (newTasks[action.update.id]) {
                    delete newState.newTasks[action.update.id]
                }
                newState.completedTasks[action.update.id] = action.update
            }
            return newState
        case LOAD_USER_ASSETS:
            newState.newTasks = {}
            newState.completedTasks = {}
            newState.authoredTasks = {}
            newState.unassignedTasks = {}
            action.tasks.forEach(task=>{
                if (task.assigneeId === action.userId && task.status === "new") {
                    newState.newTasks[task.id]=task
                } else if (!task.assigneeId) {
                    newState.unassignedTasks[task.id]=task
                } else if (task.status === "complete" && task.assigneeId === action.userId) {
                    newState.completedTasks[task.id] = task
                } else if (task.assigneeId !== action.userId && task.assigneeId){
                    newState.authoredTasks[task.id] = task
                }
            })
            return newState
        default:
            return state
    }
}