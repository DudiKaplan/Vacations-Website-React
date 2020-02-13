const dal = require("../dal/dal");

async function isUsernameExist(username) {
    let sql = `SELECT Count(*) as count FROM Users WHERE username='${username.username}'`;
    let result = (await dal.execute(sql))[0];
    if(result.count < 0){
        sql = `SELECT Count(*) as count FROM Admin WHERE username='${username.username}'`;
        result = (await dal.execute(sql))[0];
    };
    return result.count > 0;
}

async function addUserAsync(user) {
    const sql = `INSERT INTO Users VALUES(null, 
                        '${user.firstName}' , 
                        '${user.lastName}' , 
                        '${user.username}' ,
                        '${user.password}')`;             
    const info = await dal.execute(sql);
    user.userID = info.insertId;
    return user;
};

async function login(credentials) {
    let sql = `SELECT Users.* FROM Users
        WHERE username='${credentials.username}' 
        AND password='${credentials.password}'`;
    let users = await dal.execute(sql);
    
    //for case sensitive
    if(users[0] !== undefined && users[0].username === credentials.username && 
        users[0].password === credentials.password){
            users[0].userType = "user";
            delete users[0].password;
            return users[0];
    }else{
        sql = `SELECT Admin.* FROM Admin
               WHERE username ='${credentials.username}' 
               AND password ='${credentials.password}'`
        users = await dal.execute(sql);
        
        //for case sensitive 
        if(users[0] !== undefined && users[0].username === credentials.username && 
            users[0].password === credentials.password){
                users[0].userType = "admin";
                delete users[0].password;
                return users[0];
            }else{
                return undefined;
        }
    } 
}

module.exports = {
    isUsernameExist,
    addUserAsync,
    login,
};