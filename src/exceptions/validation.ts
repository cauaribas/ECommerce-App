import { httpException } from "./root";

export class UnprocessableEntity extends httpException{
    constructor(error: any, message: string, errorCode: number) {
        super(message, errorCode, 422, error);
    }
}