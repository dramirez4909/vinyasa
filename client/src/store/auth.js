import Cookies from 'js-cookie'

const SET_USER = "auth/SET_USER"
const REMOVE_USER = "auth/LOG_OUT"

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const signUp = (username,email, password, confirmPassword) => async dispatch => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const user ={}
    user.username = username
    user.email = email
    user.password = password
    user.confirmPassword = confirmPassword
    const reqBody = JSON.stringify(user)
    console.log(username, email, password, confirmPassword)
    const response = await fetch(`/api/users/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: reqBody
    });
    response.data = await response.json();
    console.log(response.data)
    if (response.ok) { dispatch(setUser(response.data.user)) }
    return response
}

export const login = (username,password) => async dispatch => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const response = await fetch(`/api/session`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({username,password})
    });
    response.data = await response.json();
    if (response.ok) {dispatch(setUser(response.data.user))}
    return response
}

export const removeUser = () => {
    return {
        type: REMOVE_USER,
        emptyUser: {}
    }
}

export const logout = () => async dispatch => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const response = await fetch(`/api/session`,{
        method: "delete",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        }
    })
    response.data = await response.json();
    if (response.ok) { dispatch(removeUser()) }
    return response
}

export default function auth(state={},action){
    let newState = Object.assign({},state)
    switch (action.type) {
        case SET_USER: 
            return action.user
        case REMOVE_USER:
            newState = {}
            return newState;
        default:
            return state
    }
} 