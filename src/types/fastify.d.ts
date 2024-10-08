import { User } from "@prisma/client";
import { FastifyRequest } from "fastify";

declare module "fastify" {
    export interface FastifyRequest {
        user: User;
    }
}