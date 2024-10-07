import { httpException } from "./root";

export class InternalException extends httpException {
    constructor(message: string, errors: any, errorCode: number) {
        super(message, errorCode, 500, errors);
    }
}