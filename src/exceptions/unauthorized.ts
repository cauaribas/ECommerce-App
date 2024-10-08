import { httpException } from "./root";

export class UnauthorizedException extends httpException {
    constructor(message: string, errorCode: number, errors?: any) {
        super(message, errorCode, 401, errors);
    }
}