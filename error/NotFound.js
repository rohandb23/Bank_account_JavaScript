const BaseError = require("./BaseError")
class NotFound extends BaseError{
    constructor(specificMessage){
        super("NotFoundError", "element not found", 404)
        this.specificMessage = specificMessage
    }
}

module.exports = NotFound