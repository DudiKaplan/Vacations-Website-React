const dal = require("../dal/dal");

async function getAllVacationsAsync(){
    const sql = `Select Vacations.*
                 FROM Vacations`
    const AllVacations = await dal.execute(sql);
    return AllVacations;
};

async function addVacationAsync(vacation) {
    const sql = `INSERT INTO Vacations VALUES(null, 
                        '${vacation.description}' , 
                        '${vacation.destination}' , 
                        '${vacation.imageName}' ,
                        '${vacation.startDate}' ,
                        '${vacation.endDate}',
                         ${vacation.price})`;             
    const info = await dal.execute(sql);
    vacation.vacationID = info.insertId;
    return vacation;
};

async function updateVacationAsync(vacation){
    const sql = `update Vacations set 
                    Description = '${vacation.description}',
                    Destination = '${vacation.destination}',
                    ImageName = '${vacation.imageName}',
                    StartDate = '${vacation.startDate}',
                    EndDate = '${vacation.endDate}',
                    Price = ${vacation.price}
                    WHERE VacationID = ${vacation.vacationID}`;
    
    await dal.execute(sql);
    return vacation;
};

async function deleteVacationAsync(vacationID){
    //for unlook
    let sql = `delete from followers WHERE VacationID = ${vacationID}`
    let deleteVacation = await dal.execute(sql);
    //delete
    sql = `delete from Vacations WHERE VacationID = ${vacationID}`;
    deleteVacation = await dal.execute(sql);
    return deleteVacation;
};

async function vacationsPerUserfollowAsync(userID){
    const sql = `Select Vacations.*,userID 
                FROM Vacations LEFT JOIN followers
                ON vacations.vacationID = followers.vacationID`
    const vacationsJoinUser = await dal.execute(sql);
    let vacationsID = [];
    let vacationsPerUserAsc = [];
    for (let item of vacationsJoinUser) {
        if(item.userID === userID){
            vacationsPerUserAsc.push(item);
            vacationsID.push(item.vacationID);
        }
    }
    for (let item of vacationsJoinUser) {
        if(vacationsID.includes(item.vacationID)){
            continue;
        }else{
            item.userID = null;
            vacationsPerUserAsc.push(item);
            vacationsID.push(item.vacationID);
        }
    }
    return vacationsPerUserAsc;
}
module.exports = {
    getAllVacationsAsync,
    addVacationAsync,
    updateVacationAsync,
    deleteVacationAsync,
    vacationsPerUserfollowAsync
};