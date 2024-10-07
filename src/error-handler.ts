import { FastifyReply, FastifyRequest } from "fastify"
import { ErrorCode, httpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";

export const errorHandler = (method: Function) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await method(request, reply);
        } catch (error: any) {
            let exception: httpException;
            if (error instanceof httpException) {
                exception = error;
            } else {
                exception = new InternalException("Something went wrong!", error, ErrorCode.INTERNAL_EXCEPTION);
            }
            reply.status(exception.statusCode).send({
                message: exception.message,
                errorCode: exception.errorCode,
                errors: exception.errors
            });
        }
    }
}