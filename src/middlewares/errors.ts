import { httpException } from "../exceptions/root";
import { FastifyRequest, FastifyReply } from "fastify";

export const errorMiddleware = (error: httpException, request:FastifyRequest, reply:FastifyReply) => {
    reply.status(error.statusCode).send({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors
    });
}