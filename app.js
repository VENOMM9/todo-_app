const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRouter");
const taskRoute = require("./routes/taskRouter");
const jwt = require("jsonwebtoken");
const path = require("path");

const auth = require("./globalmmiddlewear/auth");

require("dotenv").config();
const { connectionToMongodb } = require("./db/connect");
const userModel = require("./models/users");
const taskModel = require("./models/tasks");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5150;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connectionToMongodb();

app.use("/", userRoute);
app.use("/tasks", taskRoute);
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "/public")));

// app.post("/signup", createUser)
// app.post("/login", login)

app.get("/", (req, res) => {
  res.render("home", { navs: ["Login", "Signup"] });
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/login");
});

app.get("/tasks", (req, res) => {
  res.render("tasks", { navs: ["Dashboard", "Create Task", "Logout"] });
});

app.get("/dashboard", auth.authenticateUser, async (req, res) => {
  try {
    // Retrieve the user's tasks based on user_id
    const user_id = req.user_id;
    const user = req.user;

    const tasks = await taskModel.find({ user_id: user_id });

    res.status(200).render("dashboard", {
      navs: ["Create-Task", "Logout"],
      user_id,
      user,
      tasks,
      date: new Date(),
    });
  } catch (err) {
    return res.json(err);
  }
});

// app.get('/users/dashboard.css', (req, res) => {
//     res.type('text/css'); // Set the content type to CSS
//     res.sendFile(path.join(__dirname, 'public/dashboard.css'));
// });

app.get("/update/:_id", async (req, res) => {
  try {
    // Retrieve the task  by ID
    const taskId = req.params._id;
    const task = await taskModel.findById(taskId);

    if (!task) {
       res.redirect("/invalidInfo");
    }

    // Render the updatetask.ejs template with the task data
    res.render("updatetask", { task });
  } catch (error) {
    // console.error(error);
    res.redirect("/invalidInfo");
  }
});

app.get("/create-task", (req, res) => {
  res.render("create-task", { navs: ["Signup", "Logout"] });
});

app.get("/existingUser", (req, res) => {
  res.render("existingUser", { navs: ["Login", "Signup"] });
});

app.get("/invalidInfo", (req, res) => {
  res.render("invalidInfo", { navs: ["Login", "Signup"] });
});

app.get("/userNotFound", (req, res) => {
  res.render("userNotFound", { navs: ["Login", "Signup"] });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
