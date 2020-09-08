const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { User, Task } = require("../../db/models");
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get("/user/:userId", asyncHandler(async (req,res)=>{
    const userTasks = await Task.findAll({ where: { [Op.or]: [{assigneeId: req.params.userId},{authorId: req.params.userId}]}})
    res.send(userTasks)
}));

router.get("/:id", asyncHandler(async (req, res) => {
    const task = await Task.findByPk(Number(req.params.id))
    res.send(task)
}));

router.post("/create",asyncHandler(async(req,res)=>{
    //get required info
    let {name,description,assigneeId,authorId,status,dueDate,priority,projectId} = req.body
    if (!assigneeId) assigneeId = req.user
    const task = await Task.create({
        name,description,assigneeId,authorId,status,priority,dueDate,projectId
    })
    res.json(task)
}));

router.patch("/:id",asyncHandler(async(req,res)=>{
    const taskToUpdate = await Task.findByPk(Number(req.params.id))
    const updatedResponse = await taskToUpdate.update(req.body)
    const updatedTask = await Task.findByPk(Number(req.params.id)) 
    res.json(updatedTask)
}))

module.exports = router;