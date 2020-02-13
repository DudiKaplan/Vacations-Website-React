const express = require("express");
const followersLogic = require("../bll/followers-logic");
const Follow = require("../models/follow");
const socketComm = require("../socket-comm");

const router = express.Router();

// POST http://localhost:3001/api/followers/add-follow
router.post("/add-follow", async(request, response) =>{
    try {
        const follow = request.body;
        const errorDetails = Follow.validate(follow);
        if(errorDetails) {
            response.status(400).json(errorDetails);
        return;
        }   
        const addedFollow = await followersLogic.addFollowAsync(follow);
        socketComm.emitFollowAdded(addedFollow);
        response.status(201).json(addedFollow);
    }
    catch(err) {
        response.status(500).json(err.message);
    }
});

// POST http://localhost:3001/api/followers/delete-follow
router.post("/delete-follow", async(request, response) =>{
    try {
        const follow = request.body;
        const errorDetails = Follow.validate(follow);
        if(errorDetails) {
            response.status(400).json(errorDetails);
        return;
        }   
        await followersLogic.unFollowAsync(follow);
        socketComm.emitFollowDeleted(follow);
        response.status(201).json(follow);
    }
    catch(err) {
        response.status(500).json(err.message);
    }
});

// GET http://localhost:3001/api/followers/:id
router.get("/:id", async (request, response) => {

    const vacationID = +request.params.id;
    const vacationFollowers = await followersLogic.getVacationFollowersAsync(vacationID);
    if(vacationFollowers > 0){
        response.json({vacationID: vacationID,followers:vacationFollowers});
    }else{
        response.json({vacationID: vacationID,followers:0});
    }
});

module.exports = router;