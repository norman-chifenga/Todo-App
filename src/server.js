const express = require("express");
const app = express();
require('dotenv').config();
const path = require("path");
const routerList = require(path.resolve(__dirname, "./routes/routeList"));
const routeTask =  require(path.resolve(__dirname,"./routes/routeTasks"))
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const url = process.env.DATABASE_URL
const mongoose = require("mongoose");
const cors = require("cors")

//connect to the database
mongoose
    .connect(url, { useNewUrlParser: true })
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log(err));

app.use(cors())
app.use(bodyParser.json());
app.use("/list", routerList);
app.use("/tasks", routeTask)

app.use("/", (req, res, next) => {
    res.send("connected");
    next();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
