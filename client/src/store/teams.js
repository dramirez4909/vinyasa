import Cookies from 'js-cookie'

const SET_USER_TEAMS = 'teams/SET_USER_TEAMS'

export const setUserTeams = (teams) => {
    return {
        type: SET_USER_TEAMS,
        teams
    }
}

export const loadUserTeams = (userId) => async dispatch => {
    const response = await fetch(`/api/teams/user/${userId}`)
    const teams = await response.json();
    console.log(teams)
    if (response.ok) {
        dispatch(setUserTeams(teams))
    }
}

export default function userTeams(state={},action){
    const newState = Object.assign({},state)
    newState.teamsUserIsIn = {}
    newState.teamsInUserOrg = {}
    switch (action.type){
        case SET_USER_TEAMS:
            action.teams.forEach(team=>{
                newState.teamsUserIsIn[team.id] = team
            })
            // action.inUserOrg.forEach(team => {
            //     newState.teamsUserIsIn[team.id] = team
            // })
            return newState;
        default: 
            return state;
    }
}