const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { User, Task, TeamMember, Team } = require("../../db/models");
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/user/:id', asyncHandler(async(req,res)=>{
    const curUserIsIn = await TeamMember.findAll({ where: { userId: Number(req.params.id) }})
    const userIsIn = []
    curUserIsIn.forEach(team=>{
        userIsIn.push(team.dataValues.teamId)
    })
    const teams = await Team.findAll({where: {id: {[Op.in]:userIsIn}}})
    
    //dont get users on teams of curUser here set up a differen endpoint and do it there.
    res.json(teams)
}))

router.get('/:id', asyncHandler(async (req, res) => {
    console.log("YALLLL WE MADE IT!")
    const userIdsInTeam = await TeamMember.findAll({ where: { teamId: Number(req.params.id) } })
    const TeamMembers = []
    userIdsInTeam.forEach(userMember => {
        TeamMembers.push(userMember.dataValues.userId)
    })
    console.log("THIS ONE!!!!!!!!!!",TeamMembers)
    const users = await User.findAll({ where: { id: { [Op.in]: TeamMembers } } })
    console.log(users)
    //dont get users on teams of curUser here set up a differen endpoint and do it there.
    res.json(users)
}))


// let usersInUserTeams = {}
// let usersIdsInUserTeams = []
// const userMembers = await TeamMember.findAll({ where: { teamId: { [Op.in]: userIsIn } } })
// let array = () => userMembers.map(async (membership, index) => {

//     const user = await User.findByPk(membership.dataValues.userId)

//     usersInUserTeams[index] = user

//     return { [membership.teamId]: user.dataValues }
// })
module.exports = router