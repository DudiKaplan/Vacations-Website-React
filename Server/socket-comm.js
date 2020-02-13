const express = require("express");
const io = require("socket.io");

const expressServer = express();
const expressListener = expressServer.listen(3002, () => console.log("Socket is on (port 3002)"));
const socketServer = io(expressListener);

// Listen to client connections: 
socketServer.sockets.on("connection", socket => {

    console.log("Client Connected. Total Clinets: " + socketServer.engine.clientsCount);

    // Client has been disconnected: 
    socket.on("disconnect", () => {
        console.log("Client Disconnected. Total Clinets: " + socketServer.engine.clientsCount);
    });
});
 
function emitVacationAdded(vacation) {
    socketServer.sockets.emit("vacation-added", vacation);
    console.log("vacation-added: ",vacation);
};

function emitVacationUpdated(vacation){
    socketServer.sockets.emit("vacation-updated",vacation);
    console.log("vacation-updated: ",vacation);
};

function emitVacationDeleted(vacationID){
    socketServer.sockets.emit("vacation-deleted",vacationID);
    console.log("vacation-deleted: ",vacationID);
};

function emitFollowAdded(follow){
    socketServer.sockets.emit("follow-added",follow);
    console.log("follow-added: ", follow);
};

function emitFollowDeleted(follow){
    socketServer.sockets.emit("follow-deleted",follow);
    console.log("follow-deleted: ", follow);
};

module.exports = {
    emitVacationAdded,
    emitVacationUpdated,
    emitVacationDeleted,
    emitFollowAdded,
    emitFollowDeleted
};
