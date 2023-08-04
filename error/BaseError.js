class BaseError extends Error{
    constructor(name, message, httpsStatusCode, specificMessage){
        super(message)
        this.name = name
        this.httpsStatusCode = httpsStatusCode
        this.specificMessage = specificMessage
    }
}

module.exports = BaseError