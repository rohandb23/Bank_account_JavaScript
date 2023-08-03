const BaseError = require("./BaseError")
class Unauthorized extends BaseError{
    constructor(specificMessage){
        super("UnauthorisedError", "Unauthorised Access", 401)
        this.specificMessage = specificMessage
    }
}

module.exports = Unauthorized

