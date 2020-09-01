import Cookies from 'js-cookie'

const SET_USER = "auth/SET_USER"

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const login = (username,password) => async dispatch => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const response = await fetch(`/api/session`,{
        method: "put",
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

window.login = login;

export default function auth(state={},action){
    switch (action.type) {
        case SET_USER: 
            return action.user
        default:
            return state
    }
} 