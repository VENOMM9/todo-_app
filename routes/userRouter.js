const express = require("express");
const controller = require("../controllers/controller");
const middlewear = require("../middlewear/middlewear");
const cookieParser = require("cookie-parser");
const taskModel = require("../models/tasks");

const userRouter = express.Router();
userRouter.use(cookieParser());

userRouter.get("/signup", (req, res) => {
  res.render("signup", { navs: ["login"] });
});

userRouter.post("/signup", middlewear.validateCreateUser, controller.createUser);

userRouter.get("/login", (req, res) => {
  res.render("login", { navs: ["signup"] });
});

userRouter.post("/login", controller.login);

module.exports = userRouter;
