const express = require("express");
const controller = require("../controllers/controller")
const middlewear = require("../middlewear/middlewear")
const cookieParser = require("cookie-parser")
const auth = require("../globalmmiddlewear/auth")

const taskRouter = express.Router();
taskRouter.use(cookieParser())


taskRouter.use(auth.authenticateUser)

taskRouter.post("/create", middlewear.validateTask, async (req, res) => {
    try {
        const { name } = req.body
        const user_id = req.user_id

        const response = await controller.createTask({ name, user_id })
        if (response.code == 201) {
            res.redirect('/dashboard')
        }

        else {
            res.redirect('/invalidInfo')
    
        }
    } catch (error) {
        console.log(error)
    }
})

taskRouter.post("/:_id",  controller.updateOneTask)


taskRouter.post("/:_id", controller.deleteOneTask)




module.exports = taskRouter
