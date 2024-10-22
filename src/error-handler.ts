import { FastifyReply, FastifyRequest } from "fastify"
import { ErrorCode, httpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { ZodError } from "zod";
import { BadRequestsException } from "./exceptions/bad-resquests";

export const errorHandler = (method: Function) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await method(request, reply);
        } catch (error: any) {
            let exception: httpException;
            if (error instanceof httpException) {
                exception = error;
            } else {
                if(error instanceof ZodError){
                    exception = new BadRequestsException("Unprocessable entity", ErrorCode.UNPROCESSABLE_ENTITY, error);
                } else {
                    exception = new InternalException("Something went wrong!", error, ErrorCode.INTERNAL_EXCEPTION);
                }
            }
            reply.status(exception.statusCode).send({
                message: exception.message,
                errorCode: exception.errorCode,
                errors: exception.errors
            });
        }
    }
}