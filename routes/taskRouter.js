const express = require("express");
const controller = require("../controllers/controller");
const middlewear = require("../middlewear/middlewear");
const cookieParser = require("cookie-parser");
const auth = require("../globalmmiddlewear/auth");
const taskModel = require("../models/tasks");
const userModel = require("../models/users");

const taskRouter = express.Router();
taskRouter.use(cookieParser());

taskRouter.post("/create", auth.authenticateUser, controller.createTask);

taskRouter.post("/update/:_id", controller.updateOneTask);


taskRouter.post("/:_id/delete", controller.deleteOneTask);

module.exports = taskRouter;
