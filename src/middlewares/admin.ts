import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorCode } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";

export const adminMiddleware = async (request: FastifyRequest, reply: FastifyReply, done: Function) => {
    const user = request.user;
    
    if (user.role != "ADMIN") {
        throw new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED);
    }

    done();
};
