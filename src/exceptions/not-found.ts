import { httpException } from "./root";

export class NotFoundException extends httpException {
    constructor(message: string, errors: any, errorCode: number) {
        super(message, errorCode, 404, errors);
    }
}