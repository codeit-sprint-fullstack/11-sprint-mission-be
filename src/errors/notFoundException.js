import { HttpException } from "./httpException";

export class notFoundException extends HttpException{
    constructor(description = 'NOT_FOUND'){
        super(description,404);
    }
}