const express = require("express");
const cors = require("cors");
const vacationsController = require("./controllers/vacations-controller");
const usersController = require("./controllers/users-controller");
const followersController = require("./controllers/followers-controller");


const server = express();
server.use(express.static(__dirname));

server.use(express.json());
server.use(cors());

server.use("/api/vacations", vacationsController);
server.use("/api/users" , usersController);
server.use("/api/followers" , followersController);

server.listen(3001, () => console.log("Server Listening... (port 3001)"));