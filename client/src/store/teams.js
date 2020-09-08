import Cookies from 'js-cookie'

const SET_USER_TEAMS = 'teams/SET_USER_TEAMS'
const SET_USERS_IN_USER_TEAM = 'teams/SET_USERS_IN_USER_TEAM'

export const setUsersInUserTeam = (teamId,users) => {
    return {
        type: SET_USERS_IN_USER_TEAM,
        users,
        teamId
    }
}

export const setUserTeams = (teams) => {
    return {
        type: SET_USER_TEAMS,
        teams
    }
}

export const loadUserTeams = (userId) => async dispatch => {
    const response = await fetch(`/api/teams/user/${userId}`)
    const teams = await response.json();
    debugger
    teams.forEach((team) => {
        console.log("helloooo")
        dispatch(loadUsersInUserTeam(team.id))
    })
    console.log(teams)
    if (response.ok) {
        console.log("BAT!")
        dispatch(setUserTeams(teams))
    }
}

export const loadUsersInUserTeam = (teamId) => async dispatch => {
    const response = await fetch(`/api/teams/${teamId}`)
    const users = await response.json();
    console.log("UUUUUSSSAA???",users)
    if (response.ok) {
        dispatch(setUsersInUserTeam(teamId,users))
    }
}

export default function userTeams(state={},action){
    const newState = Object.assign({},state)
    const teamsUserIsIn = Object.assign({},state.teamsUserIsIn)
    const usersInUserTeams = Object.assign({},state.usersInUserTeams)
    switch (action.type){
        case SET_USER_TEAMS:
            newState.teamsUserIsIn = teamsUserIsIn
            action.teams.forEach(team=>{
                newState.teamsUserIsIn[team.id] = team
            })
            return newState;
        case SET_USERS_IN_USER_TEAM: 
            newState.usersInUserTeams = usersInUserTeams
            newState.usersInUserTeams[action.teamId] = {}
            action.users.forEach(user=>{
                newState.usersInUserTeams[action.teamId][user.id] = user
            })
            return newState
        default: 
            return state;
    }
}