export class HttpException extends Error{
    statuscode;
    constructor(description,statusCode){
        super(description);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }

}