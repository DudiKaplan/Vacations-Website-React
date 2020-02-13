const mysql = require("mysql");

// Connection = קו תקשורת למסד הנתונים
const connection = mysql.createConnection({
    host: "localhost", // Computer
    user: "root", // Username
    password: "", // Password
    database: "tagging_vacations" // Database name
});

// Connect to the database: 
connection.connect(err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("We're connected to MySQL - tagging_vacations");
});

// One function for executing select / insert / update / delete: 
function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    execute
};