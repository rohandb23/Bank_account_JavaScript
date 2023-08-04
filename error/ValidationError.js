const BaseError = require("./BaseError")

class ValidationError extends BaseError{
    constructor(specificMessage){
        super("validationError", "validation error", 403)
        this.specificMessage = specificMessage
    }
}

module.exports = ValidationError