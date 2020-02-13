const express = require("express");
const usersLogic = require("../bll/users-logic");
const User = require("../models/user");

const router = express.Router();

// POST http://localhost:3001/api/users/exist-user
router.post("/exist-user", async(request, response) =>{
        const username = request.body;
        const isExist = await usersLogic.isUsernameExist(username)
        if(isExist){
            response.json({isExist:"username-already-taken-from-server"});
        }else{
            response.json({isExist:"username-not-taken-from-server"});
        }
});

// POST http://localhost:3001/api/users/registration
router.post("/registration", async(request, response) =>{
    try {
        const user = request.body;
        const errorDetails = User.validate(user);
        if(errorDetails) {
            response.status(400).json(errorDetails);
        return;
        }   
        const addedUser = await usersLogic.addUserAsync(user);
        response.status(201).json(addedUser);
    }
    catch(err) {
        response.status(500).json(err.message);
    }
});

// POST http://localhost:3001/api/users/login
router.post("/login", async (request, response) => {
    const credentials = request.body;
    const user = await usersLogic.login(credentials);
    if (user) {
        response.json(user);
    }
    else {
        response.json({ error: "Incorrect username or password" });
    }
});

module.exports = router;



