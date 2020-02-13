const Joi = require("joi");

class User {
    constructor(userID, firstName, lastName, username, password) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }

    static validate(user) {
 
        const validationSchema = {
            userID: Joi.number().min(0),
            firstName: Joi.string().required().min(2).regex(/^[A-Z].*$/),
            lastName: Joi.string().required().min(2).regex(/^[A-Z].*$/),
            username: Joi.string().required().min(4),
            password: Joi.string().required().min(4)
        };

        const error = Joi.validate(user, validationSchema, { abortEarly: false }).error;

        if(error) {
            return error.details.map(err => err.message);
        } 
        return null;
    }
}

module.exports = User;