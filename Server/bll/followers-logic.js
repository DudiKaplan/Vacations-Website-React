const dal = require("../dal/dal");

async function addFollowAsync(follow) {
    const sql = `INSERT INTO Followers VALUES(null, 
                        ${follow.vacationID} , ${follow.userID})`;             
    const info = await dal.execute(sql);
    follow.ID = info.insertId;
    return follow;
};

async function unFollowAsync(follow){
    const sql = `delete from Followers WHERE
                         vacationID = ${follow.vacationID} AND userID = ${follow.userID}`
    await dal.execute(sql);
};

async function getVacationFollowersAsync(vacationID){
    const sql = `SELECT Count(*) as count FROM Followers WHERE vacationID = ${vacationID}`
    const result = (await dal.execute(sql))[0];
    return result.count;
};

module.exports = {
    addFollowAsync,
    unFollowAsync,
    getVacationFollowersAsync
};