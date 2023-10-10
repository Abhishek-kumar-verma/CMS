 class AuthError extends Error{
    constructor( message){
        super(message);
        this.message = message || "" ;
        this.name = 'Auth Error';

    }
}

 class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = "Not Found Error" ;
        this.message = message || "";
    }
}

 class ValidationError extends Error{
    constructor( message ){
        super(message);
        this.name = "Validation Error"
        this.message = message || ""
    }
}

module.exports = {
    AuthError,
    NotFoundError,
    ValidationError,
}
