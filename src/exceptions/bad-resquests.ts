import { ErrorCode, httpException } from "./root";

export class BadRequestsException extends httpException{
    constructor(message:string, errorCode:ErrorCode) {
        super(message, errorCode, 400, null);
    };
}