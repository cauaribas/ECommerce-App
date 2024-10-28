import { httpException } from "./root";

export class NotFoundException extends httpException {
    constructor(message: string, errorCode: number, errors?: any) {
        super(message, errorCode, 404, errors);
    }
}