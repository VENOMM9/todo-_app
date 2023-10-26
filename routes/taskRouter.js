const express = require("express");
const controller = require("../controllers/controller")
const middlewear = require("../middlewear/middlewear")
const cookieParser = require("cookie-parser")
const auth = require("../globalmmiddlewear/auth")
const taskModel = require("../models/tasks");


const taskRouter = express.Router();
taskRouter.use(cookieParser())




taskRouter.post("/create", middlewear.validateTask, async (req, res) => {
    try {
        const { name } = req.body
        const user_id = req.params.user_id
        const tasks = await taskModel.find({ user_id: user_id})
        console.log(tasks)

        const response = await controller.createTask({ name, user_id })
        if (response.code == 201) {
            res.status(200).redirect('/dashboard');
        }

        else {
            res.redirect('/invalidInfo')
    
        }
    } catch (error) {
        console.log(error)
    }
})

taskRouter.post('/update/:_id', async (req, res) => {
    try {
        // Extract the task  ID from the request parameters
        const taskId = req.params._id;

        // Retrieve the existing task  from the database
        const existingTaskPost = await taskModel.findById(taskId);

        if (!existingTaskPost ) {
            return res.status(404).json({ message: 'task not found' });
        }

        // Update the fields of the existing task
        // You can update state, or other fields
        
        existingTaskPost.state = req.body.state;
       


        // Save the updated task post
        const updatedTaskPost = await existingTaskPost.save();

        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

taskRouter.post('/:_id/delete', async (req, res) => {
    try {
        // Extract the blog post ID from the request parameters
        const taskId = req.params._id;

        // Delete the blog post from the database
        const deletedtaskPost = await taskModel.findByIdAndDelete(taskId);

        if (!deletedtaskPost) {
            return res.status(404).json({ message: 'task not found' });
        }
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});





module.exports = taskRouter
