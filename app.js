const express = require("express");
require("dotenv").config();
//routers
const officeHoursRouter = require("./routers/officeHours");
const taskTypeRouter = require("./routers/taskTypeRouter");
const clientsRouter = require("./routers/clientRouter");
const staffRouter = require("./routers/staffRouter");
const rolesRouter = require("./routers/rolesRouter");
const taskRouter = require("./routers/taskRouter");
const meetingRouter = require("./routers/meetingRouter");

// express app
const app = express();

// cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// static and middlewares
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/clients", clientsRouter);
app.use("/taskTypes", taskTypeRouter);
app.use("/staff", staffRouter);
app.use("/roles", rolesRouter);
app.use("/tasks", taskRouter);
app.use("/meetings", meetingRouter);
app.use("/officeHours", officeHoursRouter);

// app.use("/utilities", utilitiesRouter);
// app.use("/customers", customerRouter);
// app.use("/tasks", taskRouter);

app.listen(3333, () => {
  console.log(`Server is listening on port: ${3333}.`);
});
