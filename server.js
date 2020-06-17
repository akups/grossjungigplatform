require("dotenv").config();

require("./db"); // will run the code in `./db/index.js` (which is the database connection logic)
require("./passport");

const express = require("express");
const fileUpload = require("express-fileupload");
const logger = require("morgan");
const app = express();
const cors = require("cors");

// const corsOptions = {
//   origin: "https://grossjungigplatform.herokuapp.com",
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
// app.options("*", cors());

// app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(fileUpload());
app.use(express.static("frontend/build")); // 2. this was added as part of deployment process in order to allow people to view from any server

app.use(express.urlencoded({ extended: true })); // sets the `body` object in the `request` with the values from an HTML POST form

app.use(express.json()); // sets the `body` object in the `request` with the data coming from a request with a `body` (request we'll issue with axios, fetch...)

app.use(logger("dev")); // this middleware will log every response that is issued (with the status code) in the console
require("./session")(app);

const routes = require("./routes"); // this is our controller and will manage all the routes so we don't have to register any new route handler here
app.use(routes);

app.use((req, res) => {
  res.sendFile(__dirname + "/frontend/build/index.html"); // 1. this will be added as part of deployment process in order to allow people to view from any server
});

app.listen(process.env.PORT, () => {
  console.log(`Express server listening to: ${process.env.PORT}`);
});
