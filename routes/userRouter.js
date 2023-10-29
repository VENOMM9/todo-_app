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

userRouter.post("/login",  controller.login
);

module.exports = userRouter
