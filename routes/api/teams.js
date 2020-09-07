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
    let usersInUserTeams = {}
    let usersIdsInUserTeams = []
    const userMembers = await TeamMember.findAll({ where: { teamId: { [Op.in]: userIsIn } } })
    let array = ()=> userMembers.map(async (membership, index)=>{

        const user = await User.findByPk(membership.dataValues.userId)

        usersInUserTeams[index] = user

        return {[membership.teamId]: user.dataValues }
    })
    //dont get users on teams of curUser here set up a differen endpoint and do it there.
    res.json(teams)
}))

module.exports = router