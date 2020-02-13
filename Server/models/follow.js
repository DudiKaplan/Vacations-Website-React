const Joi = require("joi");

class Follow {
    constructor(ID, vacationID, userID) {
        this.ID = ID;
        this.vacationID = vacationID;
        this.userID = userID;
    }

    static validate(follow) {
 
        const validationSchema = {
            ID: Joi.number().min(0),
            vacationID: Joi.number().required().min(0),
            userID: Joi.number().required().min(0)
        };

        const error = Joi.validate(follow, validationSchema, { abortEarly: false }).error;

        if(error) {
            return error.details.map(err => err.message);
        } 
        return null;
    }
}

module.exports = Follow;