const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const vacationsLogic = require("../bll/vacations-logic");
const Vacation = require("../models/vacation");
const socketComm = require("../socket-comm");
const router = express.Router();
const upload = multer({ dest:__dirname.replace("\\controllers","") + "\\assets\\images" }).single("vacationImage");


// GET http://localhost:3001/api/vacations
router.get("/", async (request, response) => {
    try {
        const vacations = await vacationsLogic.getAllVacationsAsync();
        response.json(vacations);
    }
    catch(err) {
        response.status(500).json(err.message);
    }
});

// GET http://localhost:3001/api/vacations/per-user/:id
router.get("/per-user/:id", async (request, response) => {
    try {
        const userID = +request.params.id;
        const vacationsPerUser = await vacationsLogic.vacationsPerUserfollowAsync(userID);
        response.json(vacationsPerUser);
    }
    catch(err) {
        response.status(500).json(err.message);
    }
});

// POST http://localhost:3001/api/vacations
router.post("/",upload, async (request, response) => {
    try {
        const vacation = JSON.parse(request.body.json);
        vacation.imageName = request.file.filename + path.extname(request.file.originalname);
        const errorDetails = Vacation.validate(vacation);
        if(errorDetails) {
            response.status(400).json(errorDetails);
        return;
        }
        const currentFile = request.file.destination + "\\" + request.file.filename;
        const newFile = currentFile + path.extname(request.file.originalname);
        fs.rename(currentFile, newFile, err => {
            if (err) {
                response.status(500).json(err);
                return;
            };
        });       
        const addedVacation = await vacationsLogic.addVacationAsync(vacation);
        socketComm.emitVacationAdded(addedVacation);
        response.status(201).json(addedVacation);
    }
    catch(err) {
        response.status(500).json(err.message);
    }
});

// PUT http://localhost:3001/api/vacations/7
router.put("/:id", upload, async (request, response) => {
    try {
        const id = +request.params.id;
        const vacation = JSON.parse(request.body.json);
        vacation.vacationID = id;
        if(request.file){
            const oldFile = request.file.destination + "\\" + vacation.imageName;
            fs.unlink(oldFile, (err) => {
                if(err){
                    response.status(500).json(err);
                    return;
                };
            });
            vacation.imageName = request.file.filename + path.extname(request.file.originalname);
            const currentFile = request.file.destination + "\\" + request.file.filename;
            const newFile = currentFile + path.extname(request.file.originalname);
            fs.rename(currentFile, newFile, err => {
                if (err) {
                    response.status(500).json(err);
                    return;
                };
            });
        }
        const errorDetails = Vacation.validate(vacation);
        if(errorDetails) {
            response.status(400).json(errorDetails);
        return;
        }
      
        const updatedVacation = await vacationsLogic.updateVacationAsync(vacation);
        socketComm.emitVacationUpdated(updatedVacation);
        response.json(updatedVacation);
    }
    catch(err) {
        response.status(500).json(err.message);
    }
});

// DELETE http://localhost:3001/api/vacations/:id
router.delete("/:id", async(request, response) => {
    try{
        const vacationID = +request.params.id;
        await vacationsLogic.deleteVacationAsync(vacationID);
        socketComm.emitVacationDeleted(vacationID);
        response.sendStatus(204);
    }
    catch(err){
        response.status(500);
    }
});


module.exports = router;