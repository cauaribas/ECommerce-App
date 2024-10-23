import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../lib/prisma";
import { hashSync, compareSync } from "bcrypt";
import { RegisterServiceRequest } from "../../service/users/register-service";
import { LoginServiceRequest } from "../../service/users/login-service";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../secrets";
import { BadRequestsException } from "../../exceptions/bad-resquests";
import { ErrorCode } from "../../exceptions/root";
import { SignUpSchema } from "../../schema/users";
import { LoginSchema } from "../../schema/users";

export async function signup(request: FastifyRequest<{ Body: RegisterServiceRequest }>, reply: FastifyReply) {
    
    const { email, password, name } = SignUpSchema.parse(request.body);

    let user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if(user) {
        throw new BadRequestsException("User already exists", ErrorCode.USER_ALREADY_EXISTS); // fix: this never happens since the catch block gets executed when a user already exists
    }

    user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    });

    reply.send(user);
}

export async function login(request: FastifyRequest<{ Body: LoginServiceRequest }>, reply: FastifyReply) {
    const { email, password } = LoginSchema.parse(request.body);

    let user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if(!user) {
        throw new BadRequestsException("User not found", ErrorCode.USER_NOT_FOUND);
    }

    if(!compareSync(password, user.password)) {
        throw new BadRequestsException("Incorrect password", ErrorCode.INCORRECT_PASSWORD); 
    }

    const token = jwt.sign({ 
        userId: user.id 
    }, JWT_SECRET);

    reply.send({user, token});
}

export async function me(request: FastifyRequest, reply: FastifyReply) {
    reply.send(request.user);
}