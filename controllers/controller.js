const userModel = require("../models/users");
const taskModel = require("../models/tasks");
const jwt = require("jsonwebtoken");

require("dotenv").config();




const createUser = async ({ name, password, email, sex, country }) => {
  // const createUserProfile = {name, password, email}

  const existingUser = await userModel.findOne({
    email: email,
  });

  console.log(existingUser);
  if (existingUser) {
    return {
      message: "user created already",
      code: 409,
    };
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
  console.log(token);

  console.log(user);

  return {
    message: "user created successfully",
    code: 200,
    token,
  };
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
    const taskId = req.params._id;
    console.log(taskId);
    const oneTask = await taskModel.findOneAndDelete(taskId);
    if (!taskId) {
      return res.status(404).json({ msg: `No task with id: ${taskId}` });
    }

    res.status(200).send(oneTask);
    console.log("task successfully deleted");
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
const updateOneTask = async (req, res) => {
  try {
    const taskId = req.params._id;
    const updatedItem = req.body;
    console.log(updatedItem);

    const updatedTask = await taskModel.findByIdAndUpdate(taskId, updatedItem, {
      new: true,
      runValidators: true,
      overwrite: true,
    });

    if (!updatedTask) {
      return { message: `No task with id: ${taskId}` };
    }

    res.redirect("/dashboard");
    console.log("task successfully updated");
  } catch (error) {
    // console.log(error)
    res.status(400);
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
      return {
        message: "This user does not exist",
        code: 404,
      };
    }

    const validPassword = await user.isValidPassword(password);
    console.log(email);

    if (!validPassword) {
      return {
        message: "wrong email or password",
        code: 422,
      };
    }

    const token = await jwt.sign(
      { user: user},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

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
