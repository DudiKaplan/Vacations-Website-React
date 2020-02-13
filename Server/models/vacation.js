const Joi = require("joi");

class Vacation {
    
    constructor(vacationID, description, destination, imageName, startDate, endDate, price) {
        this.vacationID = vacationID;
        this.description = description;
        this.destination = destination;
        this.imageName = imageName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
    }

    static validate(vacation) {
 
        const validationSchema = {
            vacationID: Joi.number().min(0),
            description: Joi.string().required().min(3).regex(/^[A-Z].*$/),
            destination: Joi.string().required().min(3).regex(/^[A-Z].*$/),
            imageName: Joi.string().min(3),
            startDate: Joi.date().required(),
            endDate: Joi.date().min(vacation.startDate).required(),
            price: Joi.number().min(0)
        };

        const error = Joi.validate(vacation, validationSchema, { abortEarly: false }).error;

        if(error) {
            return error.details.map(err => err.message);
        } 
        return null;
    }
}

module.exports = Vacation;