const userModel = require("../models/users");
const taskModel = require("../models/tasks");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const createUser = async (req, res) => {
  // const createUserProfile = {name, password, email}
  const { name, email, password, sex, country } = req.body;

  try {
    const existingUser = await userModel.findOne({
      email: email,
    });

    if (existingUser) {
      res.redirect("/existingUser");
    }

    const user = await userModel.create({
      name: name,
      email: email,
      password: password,
      sex: sex,
      country: country,
    });

    const JWT_SECRET = process.env.JWT_SECRET;
    const token = await jwt.sign(
      { email: user.email, _id: user._id },
      JWT_SECRET
    );

    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { name } = req.body;
    const user_id = req.user_id;

    const existingTask = await taskModel.findOne({
      name: name,
      user_id: user_id,
    });

    if (existingTask) {
      return {
        message: "task created already",
        status: 208,
      };
    }

    const task = await taskModel.create({
      name: name,

      user_id: user_id,
    });

    res.status(200).redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

const getAllTask = async (req, res) => {
  try {
    const allTasks = await taskModel.find({});
    res.status(200).send(allTasks);
    console.log("All tasks successfully gotten");
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

const getOneTask = async (req, res) => {
  try {
    const taskId = req.params._id;
    console.log(taskId);
    const oneTask = await taskModel.findById(taskId);

    res.status(200).send(oneTask);
    console.log("task successfully gotten");
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

const deleteOneTask = async (req, res) => {
  try {
    // Extract the blog post ID from the request parameters
    const taskId = req.params._id;

    // Delete the blog post from the database
    const deletedtaskPost = await taskModel.findByIdAndDelete(taskId);

    if (!deletedtaskPost) {
      return res.status(404).json({ message: "task not found" });
    }
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateOneTask = async (req, res) => {
  try {
    // Extract the task  ID from the request parameters
    const taskId = req.params._id;

    // Retrieve the existing task  from the database
    const existingTaskPost = await taskModel.findById(taskId);

    if (!existingTaskPost) {
      return res.status(404).json({ message: "task not found" });
    }

    // Update the fields of the existing task
    // You can update state, or other fields

    existingTaskPost.state = req.body.state;

    // Save the updated task post
    const updatedTaskPost = await existingTaskPost.save();

    res.redirect("/dashboard");
  } catch (error) {
    res.redirect("/invalidInfo")
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({
      email: email,
    });
    // console.log(user)
    if (!user) {
      res.redirect("/signup");
    }

    const validPassword = await user.isValidPassword(password);
    console.log(email);

    if (!validPassword) {
      res.redirect("/userNotFound");
    }

    const token = await jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true }, { maxAge: 60 * 60 * 1000 });
    res.status(200).redirect("/create-task");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  login,
  getAllTask,
  getOneTask,
  createTask,
  deleteOneTask,
  updateOneTask,
};
