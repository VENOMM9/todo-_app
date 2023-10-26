const express = require("express");
const controller = require("../controllers/controller")
const middlewear = require("../middlewear/middlewear")
const cookieParser = require("cookie-parser");
const taskModel = require("../models/tasks");

const userRouter = express.Router();
userRouter.use(cookieParser())


userRouter.get("/signup", (req, res) => {

    res.render('signup',{navs:[ 'login']})
});
userRouter.post("/signup", middlewear.validateCreateUser, async (req, res) => {
    try {
        const { name, email, password, sex, country } = req.body
        const response = await controller.createUser({ name, email, password, sex, country })
        if (response.code == 200) {
            res.redirect('/login')
        }
        else if (response.code == 409) {
            res.redirect('/existingUser')
        }
        else { res.redirect('/signup') }
    } catch (error){
        console.log(error)
    }
})


userRouter.get("/login", (req, res) => {

    res.render('login',{navs:[ 'signup']})
});

userRouter.post("/login", middlewear.validateLogin, async (req, res) => {

    try {
        const { email, password } = req.body
        const response = await controller.login({ email, password })
        const tasks = await taskModel.find({ user_id: req.params.user_id })
        if (response.code == 201) {
            const user = response.user
            res.cookie("jwt", response.token, { httpOnly: true }, { maxAge: 60 * 60 * 1000 })
            res.render("dashboard",  { navs: ['create-task', 'logout'], user: req.user_id, tasks, user, date: new Date() })
        }
        else if (response.code == 404) {
            res.redirect("/userNotFound")
        }
        else { res.redirect("/invalidInfo") }
    } catch (error) {
        console.log(error)
        
    }
})


module.exports = userRouter
