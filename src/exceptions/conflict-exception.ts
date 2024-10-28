import { ErrorCode, httpException } from "./root";

export class ConflictException extends httpException {
    constructor(message: string, errorCode: ErrorCode, errors?: any) {
        super(message, errorCode, 409, errors);
    }
}